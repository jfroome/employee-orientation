import { TextField, Grid, InputAdornment } from '@mui/material'

const textFieldStyle = {
  marginBottom: '15px',
  marginTop: '5px'
}

export default function InputText ({disabled, type, fieldSize, label, register, required, name, hidden, adornment}) {
  return (
    <Grid item md={fieldSize} style={textFieldStyle}>
      <TextField
        hidden={hidden ?? false}
        {...register(name ?? label, {})}
        placeholder={label}
        name={name ?? label}
        label={label}
        type={type ?? 'text'} // default to text, allow overrides 
        fullWidth
        InputLabelProps={{ shrink: {} }}
        required={required ?? true}
        disabled={disabled}
        elevation={5}
        InputProps={{
          startAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
        }}
      />
    </Grid>
  )
}
