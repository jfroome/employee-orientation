import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText } from "@mui/material";

export default function ControlledCheck({ register, name, label, defaultChecked, required, disabled }) {
//     <Checkbox
//     {...register(DrugCheck, {
//       required: true
//     })}
//     required={true}
//     defaultChecked={getValues(DrugCheck)}
//   />
    return (
        <FormControlLabel
            control={
                <Checkbox
                    {...register(name, {
                        required: required
                    })}
                    defaultChecked={defaultChecked}
                    required={required ?? true}
                    disabled={disabled}
                />
            }
            label={label}
        />
    )
}