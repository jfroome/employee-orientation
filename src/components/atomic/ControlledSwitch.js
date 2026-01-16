import { Switch } from "@mui/material";
import { Controller } from "react-hook-form";

export default function ControlledSwitch({ control, onChange, defaultChecked }) {
    return (
    <Controller
        name="switch"
        control={control}
        render={(onChange, defaultChecked) => (
            <Switch
                onChange={(e) => onChange}
                defaultChecked={defaultChecked}
            />
        )}
    />
    )
}