import { Divider, Grid, Typography } from '@mui/material'

export default function FormDivider ({ title }) {
  return (
    <Grid item xs={12}>
      <Typography variant='h5'>{title}</Typography>
      <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />
    </Grid>
  )
}
