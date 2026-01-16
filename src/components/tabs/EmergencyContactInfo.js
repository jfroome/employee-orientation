import { Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputText from "@/components/atomic/InputText";
import React from 'react';
import axios from 'axios';
import LoadingIndicator from "@/components/atomic/LoadingIndicator";
import SaveResetNext from "@/components/atomic/SaveResetNext";
import { Api_EmergencyContact, EmergencyAddress, EmergencyCellPhone, EmergencyCityStateZip, EmergencyContactName, EmergencyContactRelationship, EmergencyHomePhone } from "../../constants";

export default function EmergencyContactInfo({ nextTab }) {

    const [loading, setLoading] = React.useState(true);

    const { register, handleSubmit, setValue, getValues, control, reset } = useForm({
        defaultValues: async () => {
            const defaultValues = await axios(Api_EmergencyContact);
            setLoading(false);
            return defaultValues.data.data;
        }
    });


    const onSubmit = async data => {
        await axios.post(Api_EmergencyContact, data).then(() => {
            nextTab();
        })
    }

    const onReset = () => { reset(); }
    return (
        <>
            {loading ?
                <LoadingIndicator />
                :
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>Emergency Contact Information</Typography>
                        </Grid>
                        <InputText fieldSize='8' label='Name' name={EmergencyContactName} register={register} />
                        <InputText fieldSize='8' label='Relationship' name={EmergencyContactRelationship} register={register} />
                        <InputText fieldSize='8' label='Home Phone Number' name={EmergencyHomePhone} register={register} />
                        <InputText fieldSize='8' label='Cell Phone Number' name={EmergencyCellPhone} register={register} />
                        <InputText fieldSize='8' label='Physical Address' name={EmergencyAddress} register={register} />
                        <InputText fieldSize='8' label='City, State, Zip' name={EmergencyCityStateZip} register={register} />
                        <SaveResetNext onReset={onReset} />
                    </Grid>
                </form>
            }
        </>
    )
}