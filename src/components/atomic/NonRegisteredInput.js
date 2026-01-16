import { TextField, Grid } from '@mui/material'

const textFieldStyle = {
  marginBottom: '15px',
  marginTop: '5px'
}

export default function  NonRegisteredInput({id, disabled, type, fieldSize, label, required}) {
  return (
    <Grid item xs={fieldSize ?? 8} style={textFieldStyle}>
      <TextField
        id={id}
        placeholder={label}
        name={label}
        label={label}
        type={type ?? 'text'} // default to text, allow overrides 
        fullWidth
        InputLabelProps={{ shrink: {} }}
        required={required ?? true}
        disabled={disabled ?? false}
        elevation={5}
      />
    </Grid>
  )
}
