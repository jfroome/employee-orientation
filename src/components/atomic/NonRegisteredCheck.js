import { Checkbox, FormControlLabel, Grid } from "@mui/material";

export default function NonRegisteredCheck({ label, value, setValue, fieldSize }) {
    const handleChange = (e) => {
        setValue(e.target.checked)
    }
    return (
        <Grid item xs={fieldSize ?? 8}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value}
                        onChange={handleChange}
                    />
                }
                label={label}
            />
        </Grid>
    )
}