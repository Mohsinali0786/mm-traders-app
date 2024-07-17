import { useEffect, useState } from "react";
import BasicSelect from "../components/select";
import { RatioCostings } from "../components/ratioCosting";
import { CurrencyRates } from "./currencyRates";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Chip,
} from "@mui/material";
export default function Costing() {
  const [gsmCalParams, setGsmCalParams] = useState({});
  const [gsm, setGsm] = useState(0);
  const [metreFabric, setMetreFabric] = useState(0);
  const [isGSMKnown, setIsGSMKnown] = useState(true);

  const [showFabricGSM, setShowFabricGSM] = useState(true);
  const [showFabricRatio, setShowFabricRatio] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [showLabel, setShowLabel] = useState("Fabric GSM Calculator");

  const onChange = (e) => {
    setGsmCalParams({
      ...gsmCalParams,
      [e.target.name]: Number(e.target.value),
    });
  };
  const gsmCalculation = (e) => {
    // return ((gsmCalculation?.reed/ gsmCalculation?.reedYarn)+ (gsmCalculation?.reeds))
    let gsmCal =
      +(
        gsmCalParams?.reed / gsmCalParams?.reedYarn +
        gsmCalParams?.pick / gsmCalParams?.pickYarn
      ) * 25;
    setGsm(Number(gsmCal.toFixed(4)));
  };
  const fabricPerKg = () => {
    let perKgFabric = 1000 / ((gsm / 39.37) * gsmCalParams?.width);
    setMetreFabric(Number(perKgFabric.toFixed(4)));
  };
  const onCheck = () => {
    setIsGSMKnown(!isGSMKnown);
    setGsm(0);
    setMetreFabric(0);
  };

  const showCaluclationTabs = (label) => {
    setShowLabel(label);
    switch (label) {
      case "Fabric GSM Calculator":
        setShowFabricGSM(true);
        setShowFabricRatio(false);
        setShowCurrencies(false);
        break;
      case "Fabric Ratio":
        setShowFabricGSM(false);
        setShowFabricRatio(true);
        setShowCurrencies(false);
        break;
      case "Currencies":
        setShowFabricGSM(false);
        setShowFabricRatio(false);
        setShowCurrencies(true);
        break;
    }
  };
  useEffect(() => {
    if (isGSMKnown) gsmCalculation();
    fabricPerKg();
  }, [gsmCalParams, gsm]);
  return (
    <div>
      <Stack className="m-4" direction="row" spacing={1}>
        <Chip
          label="Fabric GSM Calculator"
          color="success"
          clickable={true}
          onClick={(e) => showCaluclationTabs("Fabric GSM Calculator")}
        />
        <Chip
          label="Fabric Ratio"
          color="success"
          value="FabricRatio"
          clickable={true}
          onClick={(e) => showCaluclationTabs("Fabric Ratio")}
        />
        <Chip
          label="Currencies"
          color="success"
          value="currencies"
          clickable={true}
          onClick={(e) => showCaluclationTabs("Currencies")}
        />
        <Chip label="success" color="success" />
        <Chip label="success" color="success" />
        <Chip label="success" color="success" />
      </Stack>
      <fieldset>
        <legend>{showLabel}</legend>
        {showFabricGSM ? (
          <div className="container-fluid">
            <div className="row m-4">
              {isGSMKnown ? (
                <div className="col-12 col-sm-6 col-md-3 my-4">
                  <TextField
                    id="outlined-number"
                    onChange={onChange}
                    // value={selectedProduct?.quantity}
                    label="Reed Yarn"
                    name="reedYarn"
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
              ) : null}
              {isGSMKnown ? (
                <div className="col-12 col-sm-6 col-md-3 my-4">
                  <TextField
                    id="outlined-number"
                    onChange={onChange}
                    //   value={selectedProduct?.quantity}
                    label="Pick Yarn"
                    name="pickYarn"
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
              ) : null}
              {isGSMKnown ? (
                <div className="col-12 col-sm-6 col-md-3 my-4">
                  <TextField
                    id="outlined-number"
                    onChange={onChange}
                    //   value={selectedProduct?.quantity}
                    label="Reed"
                    name="reed"
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
              ) : null}
              {isGSMKnown ? (
                <div className="col-12 col-sm-6 col-md-3 my-4">
                  <TextField
                    id="outlined-number"
                    onChange={onChange}
                    //   value={selectedProduct?.quantity}
                    label="Pick"
                    name="pick"
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
              ) : null}
              <div className="col-12 col-sm-6 col-md-3 my-4">
                <TextField
                  id="outlined-number"
                  onChange={(e) => setGsm(e.target.value)}
                  value={gsm ? gsm : 0}
                  label="GSM"
                  name="gsm"
                  type="text"
                  disabled={isGSMKnown}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[d]{0,999}",
                    maxlength: 3,
                  }}
                />
                <FormControlLabel
                  label="If you know GSM check this"
                  control={<Checkbox onChange={() => onCheck()} />}
                ></FormControlLabel>
              </div>
              <div className="col-12 col-sm-6 col-md-3 my-4">
                <TextField
                  id="outlined-number"
                  onChange={onChange}
                  //   value={selectedProduct?.quantity}
                  label="Width"
                  name="width"
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
              <div className="text-end">
                Metre Fabric : {metreFabric ? metreFabric : 0} in 1 Kg
              </div>
            </div>
          </div>
        ) : showFabricRatio ? (
          <>
            <RatioCostings />
          </>
        ) : null}
        {showCurrencies ? <CurrencyRates /> : null}
      </fieldset>
    </div>
  );
}
const addRow = () => {
  return <tr></tr>;
};
