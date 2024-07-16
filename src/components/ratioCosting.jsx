import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
export function RatioCostings() {
  const [tableRows, setTableRows] = useState([{}]);
  //   let tableRows = [{} ,{}];

  const addRow = () => {
    setTableRows([...tableRows, {}]);
  };
  //   useEffect(()=>{

  //   },[tableRows])
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th className="text-dark" scope="col">Width</th>
          <th className="text-dark" className="text-dark"  scope="col">Metre</th>
          <th className="text-dark" scope="col">Metre</th>
        </tr>
      </thead>
      <tbody>
        {tableRows?.map((row) => {
          return AddingRow();
        })}
      </tbody>
      <Button onClick={() => addRow()}>Add</Button>
      <TextField
        id="outlined-number"
        //   onChange={(e) => setGsm(e.target.value)}
        //   value={gsm ? gsm : 0}
        label="Total"
        name="total"
        type="text"
        //   disabled={isGSMKnown}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          inputMode: "numeric",
          pattern: "[d]{0,999}",
          maxlength: 3,
        }}
      />
    </table>
  );
}
const AddingRow = () => {
  return (
    <tr>
      <td className="tableCellBorder">
        <TextField
          id="outlined-number"
          //   onChange={(e) => setGsm(e.target.value)}
          //   value={gsm ? gsm : 0}
          label="Width"
          name="width"
          type="text"
          //   disabled={isGSMKnown}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[d]{0,999}",
            maxlength: 3,
          }}
        />
      </td>
      <td className="tableCellBorder">
        <TextField
          id="outlined-number"
          //   onChange={(e) => setGsm(e.target.value)}
          //   value={gsm ? gsm : 0}
          label="Metre"
          name="metre"
          type="text"
          //   disabled={isGSMKnown}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[d]{0,999}",
            maxlength: 3,
          }}
        />
      </td>
      <td className="tableCellBorder">
        <TextField
          id="outlined-number"
          //   onChange={(e) => setGsm(e.target.value)}
          //   value={gsm ? gsm : 0}
          label="Ratio"
          name="ratio"
          type="text"
          //   disabled={isGSMKnown}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[d]{0,999}",
            maxlength: 3,
          }}
        />
      </td>
    </tr>
  );
};
