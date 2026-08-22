import React, { useEffect } from "react";
// import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { useState } from "react";
import { ProductTypes } from "../enums/enums";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import CircularIndeterminate from "../components/spinner";
// import { deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SimpleAlert from "../components/alertBox";
// import {
//   getStorage,
//   ref,
//   uploadBytes,
//   list,
//   listAll,
//   getDownloadURL,
// } from "firebase/storage";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  FilledInput,
  Input,
  Button,
} from "@mui/material";
import { v4 } from "uuid";
function PartyForms() {
  const Navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [hideSize, setHideSize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [partyData, setPartyData] = useState({
    partyName: "",
    address: "",
    mobileNo: "",
  });
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const onChange = (e) => {
    if (e.target.name === "mobileNo") {
      const value = e.target.value.replace(/\D/g, ""); // only digits
      console.log("e.target.name", e.target.name);
      setPartyData({ ...partyData, [e.target.name]: e.target.value });
    } else {
      setPartyData({ ...partyData, [e.target.name]: e.target.value });
    }
  };
  const addParty = async () => {
    // const backend_URL = "http://localhost:5000/api/addParty";
    const backend_URL = "https://mm-traders-backend-app.vercel.app/api/addParty";
    console.log("partyData", partyData);
    setLoading(true);
    try {
      const response = await fetch(`${backend_URL}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          partyName: partyData.partyName,
          address: partyData.address,
          mobileNo: partyData.mobileNo,
          userId: JSON.parse(localStorage.getItem("loginData"))?._id,
        }),
      });
      const json = await response.json();
      if (!json.success && json.errors && Array.isArray(json.errors)) {
        let message = "";
        json.errors.map((err) => {
          console.log("=======", err);
          message = message + "\n" + err?.msg;
        });
      }
    } catch (error) {
      console.error("Error adding party:", error);
    } finally {
      setLoading(false);
    }
    setPartyData({partyName: "", address: "", mobileNo: ""});
  };
  // useEffect(() => {}, [partyData]);
  return (
    <>
      <div className="m-4">
        <h5>Add Party</h5>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <TextField
                required
                id="outlined-required"
                label="Party Name"
                name="partyName"
                value={partyData.partyName}
                className="my-2 mx-0"
                onChange={onChange}
                fullWidth
              />
            </div>
            <div className="col-sm-12 col-md-6">
              <TextField
                id="outlined-number"
                className="my-2 mx-0"
                fullWidth
                onChange={onChange}
                value={partyData.mobileNo}
                label="Mobile No"
                name="mobileNo"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  maxLength: 11, // e.g. Pakistani mobile number length
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
            </div>

            <div className="col-12 p-1">
              <TextField
                id="outlined-multiline-static"
                label="Address"
                name="address"
                multiline
                rows={4}
                value={partyData.address}
                onChange={onChange}
                fullWidth
              />
            </div>
          </div>
        </Box>
        <div className="d-flex justify-content-end align-items-center">
          <Button
            variant="contained"
            color="success"
            onClick={addParty}
            disabled={partyData.partyName === ""}
          >
            Add Pary
          </Button>
        </div>
      </div>
      {isAlert != "" ? (
        <div className="alertBox">
          <SimpleAlert message={alertMessage} />
        </div>
      ) : null}
    </>
  );
}

export default PartyForms;
