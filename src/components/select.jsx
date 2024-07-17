import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ label, options, values }) {
  const [age, setAge] = React.useState("");
  const [currVal, setCurrVal] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  React.useEffect(()=>{
    const findRes= values?.find((x)=>x?.code == age)
    setCurrVal(findRes)
  },[age])
  console.log("Options", options);
  return (
    <Box>
      <FormControl>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          {options?.map((opt , i) => {
            return <MenuItem key = {i} value={opt}>{opt}</MenuItem>
         
          })}
        </Select>
        {currVal?.value}
      </FormControl>
    </Box>
  );
}
