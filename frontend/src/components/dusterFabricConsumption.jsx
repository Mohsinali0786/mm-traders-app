import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Checkbox, Button } from "@mui/material";
export function DusterFabricCalculator() {
  const [costingParams, setCostingParams] = useState({});
  const [finalResult, setFinalResult] = useState({
    fabricConsumption: 0,
    pricePerDozen: 0,
    wastage: 0,
    totalPrice: 0,
  });
  const [costOfDuster, setCostOfDuster] = useState(0);
  const onChange = (e) => {
    setCostingParams({
      ...costingParams,
      [e.target.name]: Number(e.target.value),
    });
    if (e.target.name == "stitchingCharges" && Number(e.target.value) > 0) {
      setCostOfDuster(finalResult?.totalPrice + Number(e.target.value));
    }
  };
  const calculation = (e) => {
    console.log("aaa");
    console.log("costingParams?.SizeLength", costingParams?.SizeLength);
    console.log("costingParams?.width", costingParams?.width);
    let noOfPiece = 0;
    let result = 0;
    if (costingParams?.width % costingParams?.SizeWidth == 0) {
      noOfPiece = costingParams?.width / costingParams?.SizeWidth;
      result = Number(
        (((costingParams?.SizeLength + 1) * 12) / noOfPiece / 39.37).toFixed(3)
      );

      console.log("noOfPiece", noOfPiece);
    } else {
      noOfPiece = costingParams?.width / costingParams?.SizeLength;
      let noOfPieceWidth = costingParams?.width / costingParams?.SizeWidth;
      if (noOfPiece > noOfPieceWidth) {
        noOfPiece = noOfPieceWidth;
        noOfPiece = Math.floor(noOfPiece);
        result = Number(
          (((costingParams?.SizeLength + 1) * 12) / noOfPiece / 39.37).toFixed(
            3
          )
        );
      } else {
        noOfPiece = Math.floor(noOfPiece);
        result = Number(
          (((costingParams?.SizeWidth + 1) * 12) / noOfPiece / 39.37).toFixed(3)
        );
      }
    }
    let pricePerDozenLocal = Number((result * costingParams?.price).toFixed(3));
    let wastageLocal = Number(
      (result * costingParams?.price * 0.05).toFixed(3)
    );
    let totalPriceLocal = wastageLocal + pricePerDozenLocal;
    setFinalResult({
      ...finalResult,
      fabricConsumption: result,
      pricePerDozen: pricePerDozenLocal,
      wastage: wastageLocal,
      totalPrice: totalPriceLocal,
    });
    setCostOfDuster(totalPriceLocal + costingParams?.stitchingCharges);
  };
  return (
    <div className="container-fluid">
      <div className="row m-4">
        <div className="col-12 col-sm-6 col-md-3 my-4">
          <div className="d-flex">
            <TextField
              id="outlined-number"
              onChange={onChange}
              // value={selectedProduct?.quantity}
              label="Size (Length  (inch))"
              name="SizeLength"
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[d]{0,999}",
                maxlength: 3,
              }}
            />
            {/* <Checkbox onChange={() =>{}} /> */}
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 my-4">
          <div className="d-flex">
            <TextField
              id="outlined-number"
              onChange={onChange}
              label="Size (Width  (inch)"
              name="SizeWidth"
              type="text"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[d]{0,999}",
                maxlength: 3,
              }}
            />
            {/* <Checkbox onChange={() => {}} /> */}
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 my-4">
          <TextField
            id="outlined-number"
            onChange={onChange}
            //   value={selectedProduct?.quantity}
            label="Width"
            name="width"
            fullWidth
            type="text"
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
        <div className="col-12 col-sm-6 col-md-3 my-4">
          <TextField
            id="outlined-number"
            onChange={onChange}
            //   value={selectedProduct?.quantity}
            label="Price/Metre"
            name="price"
            fullWidth
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              inputMode: "numeric",
              pattern: "[d]{0,999}",
              maxlength: 4,
            }}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3 my-4">
          <TextField
            id="outlined-number"
            onChange={onChange}
            //   value={selectedProduct?.quantity}
            label="Stitching Charges"
            name="stitchingCharges"
            fullWidth
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              inputMode: "numeric",
              pattern: "[d]{0,999}",
              maxlength: 4,
            }}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3 my-4">
          <Button
            variant="contained"
            color="success"
            onClick={() => calculation()}
          >
            Calculate
          </Button>
        </div>

        <div className="text-end">
          Fabric Consumption for 12 Pcs : {finalResult?.fabricConsumption} Metre
        </div>
        <div className="text-end">
          Fabric Consumption Price for 12 Pcs : {finalResult?.pricePerDozen} Rs
        </div>
        <div className="text-end">Wastage (5%) : {finalResult?.wastage} Rs</div>
        <div className="text-end">Total : {finalResult?.totalPrice} Rs</div>
        <div className="text-end" style={{borderTop:'1px solid red'}}>
          Total Cost of Duster per dozen: {costOfDuster} Rs
        </div>
        <div className="text-end" style={{borderTop:'1px solid red'}}>
          Cost of Duster per Piece: {costOfDuster/12} Rs
        </div>
      </div>
    </div>
  );
}
