import { useRouter } from "next/router";
import { useRef, useState } from 'react'
import { Grid, Box, TextField, Button, CircularProgress, Typography, } from '@mui/material'
import Image from 'next/image'
import { signIn } from "next-auth/react";
import { Api_Finalize, HasFinalized, Page_Form } from "../constants";
import axios from "axios";

export default function Login() {
    const router = useRouter();
    const emailInput = useRef();
    const passwordInput = useRef();
    const [isLoading, setLoading] = useState(false)
    const [err, setErr] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = emailInput.current.value;
        const password = passwordInput.current.value;
        signIn('credentials', { 'password': password, 'email': email, redirect: false })
            .then(async ({ ok }) => {
                if (ok) {
                    await axios.post(Api_Finalize, { [HasFinalized]: false });
                    return router.push(Page_Form);
                } else {
                    setErr(true);
                    setLoading(false);
                }
            })
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} flexDirection={'column'} gridAutoFlow='column' alignItems={'center'} alignContent={'center'} alignSelf={'center'} >
                <Grid item xs={12}>
                    <Image
                        src='/images/jfLogo.svg'
                        alt='JF Logo'
                        width={150}
                        height={150}
                    />
                </Grid>
                {isLoading ?
                    (<Grid item xs={12}>
                        <CircularProgress color='primary' />
                    </Grid>) :
                    <>
                        <Grid item xs={12}>
                            <Typography variant='caption' color={'error'}>{err ? 'Invalid credentials, please try again.' : ''}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label='Email' type="text" inputRef={emailInput} disabled={isLoading} onChange={() => setErr(false)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label='Password' type="password" inputRef={passwordInput} disabled={isLoading} onChange={() => setErr(false)} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant='contained'>Login</Button>
                        </Grid>
                    </>
                }
            </Grid>
        </form>
    );
}