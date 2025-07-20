import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  label,
  options,
  values,
  state,
  setState,
  method,
  defaultVal,
  fullWidth,
  disabled
}) {
  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <Box>
      <FormControl           sx={{width:"100%"}}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state != "" ? state : defaultVal}
          label="Age"
          onChange={handleChange}
          defaultValue={defaultVal}
          autoWidth
          disabled={disabled}

        >
          {options?.map((opt, i) => {
            return (
              <MenuItem key={i} value={opt}>
                {opt}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
