import { Grid, Typography } from '@mui/material'

export default function ReadonlyData({ title, value, fieldSize, row }) {
    return (
        <Grid item xs={fieldSize ?? 12}>
            <Typography variant='body1' ><strong>{title}</strong></Typography>
            <Typography variant='body1' >{value}</Typography>
        </Grid>
    )
}
