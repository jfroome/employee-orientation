import { Grid, Typography } from "@mui/material";

export default function TabTitle({title, variant}) {
    return (
        <Grid item xs={12}>
            <Typography variant={variant ?? 'h3'}>{title}</Typography>
        </Grid>
    )
}