import { Save } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";

export default function SaveResetNext({ submitOnClick, onReset }) {
    return (
    <>
        <Grid item xs={12} />
        <Grid item xs={8}>
            <Button type='submit' disableElevation variant='contained' startIcon={<Save />} xs={1} sx={{ whiteSpace: 'nowrap' }} fullWidth onClick={submitOnClick}>
                Save & Next
            </Button>
        </Grid>
        <Grid item xs={6}>
            {/* <Button disableElevation variant='outlined' xs={1} sx={{ whiteSpace: 'nowrap' }} fullWidth
                onClick={onReset}
            >Reset</Button> */}
        </Grid>
        <Grid item xs={12} />
    </>
    )
}