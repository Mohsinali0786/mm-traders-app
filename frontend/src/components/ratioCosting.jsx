import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
// let rowData=[{id:0 , width:0 , metre : 0 , totalMeter:0 , ratio : 0}]

let globalObj = {};
export function RatioCostings() {
  let [tableRows, setTableRows] = useState([
    { width: 0, metre: 0, totalMeter: 0, ratio: 0 },
  ]);
  const [index, setIndex] = useState(0);
  const [totalRatio, setTotalRatio] = useState(0);
  const addRow = () => {
    globalObj = { totalMeter: globalObj?.totalMeter };
    setTableRows([
      ...tableRows,
      {
        id: index,
        width: globalObj?.width,
        metre: globalObj?.metre,
        totalMeter: globalObj?.totalMeter,
      },
    ]);
    setIndex(index + 1);
    tableRows.forEach((x) => {
      x["totalMetre"] = globalObj?.totalMeter;
    });
  };
  const totalRatioCalculate = () => {
    let total = 0;
    tableRows.forEach((x) => {
      total += x?.ratio;
    });
    setTotalRatio(total);
  };
  useEffect(() => {}, tableRows);
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-dark" scope="col">
              Width
            </th>
            <th className="text-dark" scope="col">
              Metre
            </th>
            <th className="text-dark" scope="col">
              Total Metre
            </th>
          </tr>
        </thead>
        <tbody>
          {tableRows?.map((row, index) => {
            return AddingRow(row, index);
          })}
        </tbody>
        <Button
          className="mt-4"
          variant="outlined"
          color="success"
          onClick={() => addRow()}
        >
          Add Row
        </Button>
      </table>
      <div className="d-flex justify-content-end flex-column align-items-end m-4">
        <Button
          variant="outlined"
          color="success"
          onClick={totalRatioCalculate}
        >
          Calculate
        </Button>
        <span>{totalRatio}</span>
      </div>
    </>
  );
}
const AddingRow = (rowData, index) => {
  console.log("rowDaaaaaaaaaaa", rowData);
  // const calculateRatio = (selectedRowData) => {
  //   console.log(selectedRowData ,'selectedRowData')
  //   rowData[index] = selectedRowData
  // };

  const setParams = (e, paramsType) => {
    if (paramsType == "width") {
      // setMyParams({...myParams,width:e.target.value})
      globalObj = {
        ...globalObj,
        width: e.target.value,
      };
    } else if (paramsType == "meter") {
      globalObj = {
        ...globalObj,
        metre: e.target.value,
      };
    } else if (paramsType == "totalMeter") {
      globalObj = {
        ...globalObj,
        totalMeter: e.target.value,
      };
    }
    if (globalObj?.metre && globalObj?.totalMeter) {
      // if(!rowData.hasOwnProperty('width') && !rowData.hasOwnProperty('metre') && !rowData.hasOwnProperty('totalMeter')) return
      rowData["width"] = globalObj?.width;
      rowData["metre"] = globalObj?.metre;
      rowData["totalMeter"] = globalObj?.totalMeter;
      // setMyParams({...myParams,ratio:rowData['meter'] / rowData['totalMeter']})
      rowData["ratio"] =
        (rowData["metre"] / rowData["totalMeter"]) * rowData?.width;
    }
  };
  return (
    <tr>
      <td className="tableCellBorder">
        <TextField
          id="outlined-number"
          onChange={(e) => setParams(e, "width", rowData)}
          // value={rowData?.width > 0 ? rowData?.width : width}
          value={rowData?.width > 0 ? rowData?.width : globalObj?.width}
          label="Width"
          name="width"
          type="text"
          defaultValue={rowData?.width}
          //   disabled={isGSMKnown}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[d]{0,999}",
            // maxlength: 3,
          }}
        />
      </td>
      <td className="tableCellBorder">
        <TextField
          id="outlined-number"
          onChange={(e) => setParams(e, "meter", rowData)}
          // value={rowData?.metre > 0 ? rowData?.metre : metre}
          value={rowData?.metre > 0 ? rowData?.metre : globalObj?.metre}
          label="Metre"
          name="metre"
          type="text"
          defaultValue={rowData?.meter}
          //   disabled={isGSMKnown}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[d]{0,999}",
            // maxlength: 3,
          }}
        />
      </td>
      <td className="tableCellBorder">
        <TextField
          id="outlined-number"
          onChange={(e) => setParams(e, "totalMeter", rowData)}
          // value={rowData?.totalMeter > 0 ? rowData?.totalMeter : total}
          value={
            rowData?.totalMeter > 0
              ? rowData?.totalMeter
              : globalObj?.totalMeter
          }
          label="Total Meter"
          name="totalMeter"
          type="text"
          disabled={index != 0}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[d]{0,999}",
            // maxlength: 3,
          }}
        />
      </td>
      <td className="tableCellBorder">
        <TextField
          id="outlined-number"
          // onChange={(e) => calculateRatio(rowData)}
          value={rowData?.ratio}
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
            // maxlength: 3,
          }}
        />
      </td>
    </tr>
  );
};
