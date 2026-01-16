/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { CircularProgress, Grid } from "@mui/material";

export default function LoadingIndicator() {
    return(
    <Grid container
        alignContent={'center'}
        alignItems={'center'}>
        <Grid item>
            <CircularProgress color={'primary'} />
        </Grid>
    </Grid>
    )
}