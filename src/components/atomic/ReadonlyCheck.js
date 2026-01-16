import { Checkbox, FormControlLabel } from "@mui/material";

export default function ReadonlyCheck({  label, defaultChecked }) {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    defaultChecked={defaultChecked}
                    disabled={true}
                />
            }
            label={label}
        />
    )
}