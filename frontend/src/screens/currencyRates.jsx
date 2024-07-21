import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import { useEffect, useState } from "react";
import BasicSelect from "../components/select";
import axios from "axios";
export function CurrencyRates() {
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [allOptions, setAllOptions] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState();
  const [selectedTo, setSelectedTo] = useState();

  
  const getAllCurraencyUpdates = async () => {
    await axios
      .get(`https://mm-trader-app.vercel.app/api/getCurrencies`)
      .then((response) => {
        console.log("Dtaa", Object.keys(response?.data?.data));
        console.log("Dtaa", Object.values(response?.data?.data));
        setAllCurrencies(Object.values(response?.data?.data));
        setAllOptions(Object.keys(response?.data?.data));
        // setAllCurrencies(response?.data?.data);
      })
      .catch((Err) => {
        console.log(Err, "Err");
      });
  };
  useEffect(() => {
    getAllCurraencyUpdates();
  }, []);
  return (
    <div>
      <BasicSelect 
        options={allOptions} 
        values={allCurrencies} 
        SelectedFrom = {{key:selectedFrom ,setKey:setSelectedFrom}}
    />
      <BasicSelect 
        options={allOptions} 
        values={allCurrencies} 
        SelectedTo = {{key:selectedTo ,setKey:setSelectedTo}}
        />
    </div>
  );
}
