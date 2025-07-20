import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { TextField } from "@mui/material";
import BasicSelect from "../../select";
import { useState } from "react";
import { getDataFromLS } from "../../../commonFunctions/getAndSetDataFromLocalStrorage";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function SellItemModalDialog({
  itemId,
  mainId,
  quality,
  totalMetre,
  unitType,
  inwardDate
}) {
  const [open, setOpen] = React.useState(false);
  const [loginData, setLoginData] = useState();
  const [formData, setFormData] = useState();
  React.useEffect(() => {
    let LSData = getDataFromLS("loginData");
    LSData = JSON.parse(LSData);
    console.log(LSData)
    setLoginData(LSData);
  }, []);
  const handleClickOpen = () => {
    setFormData({
      totalMetre:totalMetre
    })
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(totalMetre,'totalMetre')
    let data = {
      ...formData,
      itemId:itemId,
      quality:quality,
      totalMetre:formData?.totalMetre,
      date: currDate,
      inwardDate:inwardDate,
      partyIds: loginData?.partyId,
      type: "SELL",
      unitType: unitType,
    };
    console.log("loginData", loginData);
    axios
      .post(`http://localhost:5000/api/addHisab/${loginData?._id}`, data)
      .then((res) => {
        console.log(res, "resssss");
        updateQuantity()
      })
      .catch((err) => {});

    handleClose();
  };
  const updateQuantity = () =>{
    let body={
      mainId,
      itemId,
      totalMetre:formData?.totalMetre
    }
            console.log(body, "body");

       axios
      .post(`http://localhost:5000/api/updatequantity`, body)
      .then((res) => {
        console.log(res, "resssss");
      })
      .catch((err) => {});
  }
  const [currDate, setCurrDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  return (
    <React.Fragment>
      {
      totalMetre > 0 ?
      <Button variant="outlined" onClick={handleClickOpen}>
        Sell Item
      </Button>
      :
            <Button variant="text"  disabled onClick={handleClickOpen}>
        Out Of Stock
      </Button>
      
      }
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Selling Item
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="hisabKitabForm-Container">
            <div className="row">
              <p>
                Total {unitType} : {totalMetre}
              </p>
              <div className="col-sm-12 col-md-6">
                <TextField
                  required
                  id="outlined-required"
                  label="ItemId"
                  name="itemId"
                  value={itemId}
                  className="my-2 mx-0"
                  disabled
                  //  onChange={(e) => {
                  //    setFormData({ ...formData, partyName: e.target.value });
                  //  }}
                  fullWidth
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <TextField
                  required
                  id="outlined-required"
                  label="Seller Name"
                  name="partyName"
                  className="my-2 mx-0"
                   onChange={(e) => {
                     setFormData({ ...formData, partyName: e.target.value });
                   }}
                  fullWidth
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <TextField
                  required
                  id="outlined-required"
                  label="Quality"
                  name="quality"
                  className="my-2 mx-0"
                  value={quality}
                  disabled
                   onChange={(e) => {
                     setFormData({ ...formData, quality: e.target.value });
                   }}
                  fullWidth
                />
              </div>

              <div className="col-sm-12 col-md-6">
                <TextField
                  required
                  id="outlined-required"
                  label={`Total ${unitType}`}
                  name="totalMetre"
                  className="my-2 mx-0"
                  value={formData?.totalMetre}
                   onChange={(e) => {
                     setFormData({
                       ...formData,
                       totalMetre: e.target.value > totalMetre ? totalMetre : e.target.value,
                       totalPrice: e.target.value * formData?.pricePerMetre,
                     });
                   }}
                  fullWidth
                  // className="my-2 mx-0 w-100 w-md-25"
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <TextField
                  required
                  id="outlined-required"
                  label={`Price/${unitType}`}
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
              <div className="col-sm-12 col-md-6">
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

              <div className="col-sm-12 col-md-6">
                <label for="birthday">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  // min={currDate}
                  // max={currDate}
                  onChange={(e) => setCurrDate(e.target.value)}
                  value={currDate}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={(e) => onSubmit(e)}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
