import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import { useEffect, useState } from "react";
import BasicSelect from "../components/select";
import axios from "axios";
import CircularIndeterminate from '../components/spinner'
export function CurrencyRates() {
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [currVal, setCurrVal] = useState("");
  const [selectedVal, setSelectedVal] = useState();
  const [loading, setloading] = useState(true);
  const [defaultVal, setDefaultValue] = useState({});
  const getAllCurraencyUpdates = async () => {
    await axios
      .get(`https://mm-traders-backend-app.vercel.app/api/getCurrencies`)
      // get(`http://localhost:5000/api/getCurrencies`)
      // .get(`https://mm-trader-app.vercel.app/api/getCurrencies`)

      .then((response) => {
        setAllCurrencies(Object.values(response?.data?.data));
        setAllOptions(Object.keys(response?.data?.data));
        const findRes = Object.values(response?.data?.data)?.find(
          (x) => x?.code == "PKR"
        );
        setDefaultValue({ code: findRes?.code, value: findRes?.value });
      })
      .catch((Err) => {
        console.log(Err, "Err");
      });
    setloading(false);
  };
  useEffect(() => {
    getAllCurraencyUpdates();
  }, []);
  useEffect(() => {
    const findRes = allCurrencies?.find((x) => x?.code === currVal);
    setSelectedVal(findRes?.value);
  }, [currVal]);
  const onSelect = () => {};
  console.log("==>", defaultVal);
  return (
    <div className="mt-2">
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <div className="d-flex gap-2 align-items-center justify-content-between ">
          <BasicSelect
            options={allOptions}
            values={allCurrencies}
            method={onSelect}
            state={currVal}
            setState={setCurrVal}
            defaultVal={"PKR"}
          />
          {/* <LineAnimation val={chartVal}/> */}
          <div>
            <span>{selectedVal ? selectedVal : defaultVal?.value}</span>
          </div>
        </div>
      )}
    </div>
  );
}
