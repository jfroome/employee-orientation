import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function ControlledRadioGroup({ options, name, control, defaultValue, title, row, required, label, disabled }) {

  return (
    <>
      <FormLabel>{title}</FormLabel>
      <Controller
        disabled={disabled}
        render={({ field }) => (
          <RadioGroup
            aria-label={title}
            {...field}
            row={row ?? false}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                disabled={option.disabled ?? false}
                control={<Radio required={required} />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        )}
        name={name}
        control={control}
      />
    </>
  );
}

