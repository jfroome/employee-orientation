import { Grid } from '@mui/material'

export default function AudioPlayer({ src }) {
    return (
        <Grid item xs={12}>
            <audio src={src} controls autoPlay style={{width:'100%'}}/>
        </Grid>
    )
}
