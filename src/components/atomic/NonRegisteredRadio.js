import { TextField, Grid, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material'
import { useState } from 'react'

const textFieldStyle = {
    marginBottom: '15px',
    marginTop: '5px'
}


export default function NonRegisteredRadio({ options, fieldSize, label, row, value, setValue, setFormValue, required, disabled }) {

    const handleOptionChange = (event) => {
        setValue(event.target.value);
        setFormValue(label, event.target.value)
    };

    return (
        <Grid item xs={fieldSize ?? 8} style={textFieldStyle}>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                aria-label={label}
                row={row ?? false}
                label={label}
                value={value}
                onChange={handleOptionChange}
                required={required}
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        disabled={option.disabled || disabled}
                        control={<Radio required={required}/>}
                    />
                ))}
            </RadioGroup>
        </Grid>
    )
}
