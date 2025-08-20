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
import SimpleAlert from "../alertBox";
export default function HisabKitabForm() {
  const [currDate, setCurrDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [formData, setFormData] = useState();
  const [selectType, setSelectType] = useState("PURCHASE");
  const [selectUnit, setUnit] = useState("");
  console.log(currDate);
  const [data, setData] = useState([]);
  const [loginData, setLoginData] = useState();
    const [isAlert, setIsAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
  console.log(data, "data hisab");
  useEffect(() => {
    let LSData = getDataFromLS("loginData");
    LSData = JSON.parse(LSData);
    setLoginData(LSData);
    axios
      .get(`${BackendURL}getHisab/${LSData?._id}`)
      .then((res) => {
        console.log(res, "resssss");
        setData(res?.data?.data);
      })
      .catch((err) => {});
      setFormData({partyName:"",quality:"",pricePerMetre:0,totalMetre:0,paymentRcvd:0})
      setTimeout(()=>setIsAlert(false),2000)
  }, [isAlert]);
  const BackendURL = "https://mm-traders-backend-app.vercel.app/api/"
// const BackendURL = "http://localhost:5000/api/"
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
    .post(`${BackendURL}addHisab/${loginData?._id}`, data)
    .then((res) => {
      console.log(res?.data?.message, "res?.data?.message");
      setAlertMessage(res?.data?.message)
      setIsAlert(true)
      })
      .catch((err) => {
        setAlertMessage("Some Error occured try again")
      setIsAlert(true)

      });

  };
  console.log(data, "data in in");
  
  return (
    <div className="hisabKitabForm-Container">
      {
        isAlert ? 
        <SimpleAlert message={alertMessage}/>
        :
        null
      }
      <div className="row">
        <div className="col-sm-12 col-md-3">
          <TextField
            required
            id="outlined-required"
            label="Party Name"
            name="partyName"
            value={formData?.partyName}
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
            value={formData?.quality}
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
            value={formData?.totalMetre}
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
            value={formData?.pricePerMetre}
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
            value={formData?.paymentRcvd}
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
            options={[selectType]}
            values={[selectType]}
            disabled = {true}
            fullWidth={true}
            defaultVal={selectType}
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
