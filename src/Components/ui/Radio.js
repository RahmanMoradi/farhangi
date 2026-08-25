"use client";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";

export default function RadioComp({ label, info, defualtValue, onChange }) {
  const [selectedValue, setSelectedValue] = useState(defualtValue);

  const handleChange = (value) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <FormControl>
      {label && (
        <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
      )}
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
      >
        {info.map((e) => (
          <FormControlLabel
            key={e.id}
            value={e.value}
            checked={selectedValue === e.value}
            onChange={() => handleChange(e.value)}
            className="!m-0"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#C62828",
                  },
                }}
              />
            }
            label={e.body}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
