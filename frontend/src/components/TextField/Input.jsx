import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Checkbox, Button } from "@mui/material";
export function TextInput({ label, onChange, name, type, fullWidth ,defaultValue , disabled}) {
//   const onChange = (e) => {
   
//   };

  return (
    // <div className="container-fluid">
    //   <div className="row m-4">
    //     <div className="col-12 col-sm-6 col-md-3 my-4">
          <div>
          <TextField
            id="outlined-number"
            onChange={onChange}
            disabled = {disabled}
            // value={selectedProduct?.quantity}
            label={label}
            name={name}
            type={type}
            fullWidth={fullWidth}
            defaultValue={defaultValue}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              inputMode: "numeric",
              pattern: "[d]{0,999}",
              maxlength: 3,
            }}
          />
          </div>
    //     </div>
    //   </div>
    // </div>
  );
}
