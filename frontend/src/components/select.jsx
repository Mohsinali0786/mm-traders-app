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
  disabled,
}) {
  const isObjectOptions = options.length > 0 && typeof options[0] === "object";
  const handleChange = (event) => {
    if (isObjectOptions) {
      const selected = options.find(
        (item) => item.value === event.target.value,
      );

      setState(selected); // {label, value}
    } else {
      setState(event.target.value); // string
    }
  };
  console.log("state", state);

  return (
    <Box>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={
            isObjectOptions
              ? (state?.value ?? defaultVal ?? "")
              : (state ?? defaultVal ?? "")
          }
          label="Age"
          onChange={handleChange}
          defaultValue={defaultVal}
          autoWidth
          disabled={disabled}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {options?.map((opt, i) => {
            return (
              <MenuItem
                key={isObjectOptions ? opt.value : i}
                value={isObjectOptions ? opt.value : opt}
              >
                {isObjectOptions ? opt.label : opt}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
