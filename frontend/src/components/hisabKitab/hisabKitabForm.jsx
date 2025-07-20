import { TextField } from "@mui/material";
import "./hisabKitabForm.css";
import axios from "axios";
import { usePDF } from "react-to-pdf";
import DataTable from "../dataVisualization/dataVisualization";
import { useState, useEffect } from "react";
import {
  getDataFromLS,
  setDataInLS,
} from "../../commonFunctions/getAndSetDataFromLocalStrorage";
import BasicSelect from "../select";
export default function HisabKitabForm() {
  const [currDate, setCurrDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [formData, setFormData] = useState();
  const [selectType, setSelectType] = useState("");
  const [selectUnit, setUnit] = useState("");
  console.log(currDate);
  const [data, setData] = useState([]);
  const [loginData, setLoginData] = useState();
  console.log(data, "data hisab");
  useEffect(() => {
    let LSData = getDataFromLS("loginData");
    LSData = JSON.parse(LSData);
    setLoginData(LSData);
    axios
      .get(`https://mm-traders-backend-app.vercel.app/api/getHisab/${LSData?._id}`)
      .then((res) => {
        console.log(res, "resssss");
        setData(res?.data?.data);
      })
      .catch((err) => {});
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      ...formData,
      date: currDate,
      partyIds: loginData?.partyId,
      type: selectType,
      unitType:selectUnit
    }
    // loginData?.partyId.push(loginData?.partyId)
    // setDataInLS("loginData",loginData)
    console.log("loginData", loginData);
    axios
      .post(`https://mm-traders-backend-app.vercel.app/api/addHisab/${loginData?._id}`, data)
      .then((res) => {
        console.log(res, "resssss");
      })
      .catch((err) => {});
  };
  console.log(data, "data in in");
  return (
    <div className="hisabKitabForm-Container">
      <div className="row">
        <div className="col-sm-12 col-md-3">
          <TextField
            required
            id="outlined-required"
            label="Party Name"
            name="partyName"
            className="my-2 mx-0"
            onChange={(e) => {
              setFormData({ ...formData, partyName: e.target.value });
            }}
            fullWidth
          />
        </div>
        <div className="col-sm-12 col-md-3">
          <TextField
            required
            id="outlined-required"
            label="Quality"
            name="quality"
            className="my-2 mx-0"
            onChange={(e) => {
              setFormData({ ...formData, quality: e.target.value });
            }}
            fullWidth
          />
        </div>
        <div className="col-sm-12 col-md-3 dateField">
          <label for="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            // min={currDate}
            // max={currDate}
            onChange={(e)=>setCurrDate(e.target.value)}
            value={currDate}
          />
        </div>
        <div className="col-sm-12 col-md-3">
          <TextField
            required
            id="outlined-required"
            label="Total Metre"
            name="totalMetre"
            className="my-2 mx-0"
            onChange={(e) => {
              setFormData({
                ...formData,
                totalMetre: e.target.value,
                totalPrice: e.target.value * formData?.pricePerMetre,
              });
            }}
            fullWidth
            // className="my-2 mx-0 w-100 w-md-25"
          />
        </div>
        <div className="col-sm-12 col-md-3">
          <TextField
            required
            id="outlined-required"
            label="Price/Metre"
            name="pricePerMetre"
            className="my-2 mx-0"
            onChange={(e) => {
              setFormData({
                ...formData,
                pricePerMetre: e.target.value,
                totalPrice: e.target.value * formData?.totalMetre,
              });
            }}
            fullWidth
            // className="my-2 mx-0 w-100 w-md-25"
          />
        </div>
        <div className="col-sm-12 col-md-3">
          <TextField
            required
            id="outlined-required"
            label="Total Received Payment"
            name="paymentRecvd"
            className="my-2 mx-0"
            onChange={(e) => {
              setFormData({ ...formData, paymentRcvd: e.target.value });
            }}
            fullWidth
            // className="my-2 mx-0 w-100 w-md-25"
          />
        </div>
        <div className="col-sm-12 col-md-1">
          <BasicSelect
            label="Unit"
            options={["Kg", "Metre","Yard"]}
            values={["Kg", "Metre","Yard"]}
            state={selectUnit}
            setState={setUnit}
            defaultVal="Kg"
            fullWidth={true}
          />
        </div>
        <div className="col-sm-12 col-md-2">
          <BasicSelect
            label="Type"
            options={["PURCHASE"]}
            values={["PURCHASE"]}
            disabled = {true}
            state={selectType}
            setState={setSelectType}
            defaultVal="PURCHASE"
            fullWidth={true}

          />
        </div>
        <div className="col-sm-12 col-md-3">
          <button onClick={(e) => onSubmit(e)}>Submit</button>
        </div>
      </div>
      {data && data.length > 0 ? <DataTable data={data} /> : null}
    </div>
  );
}
