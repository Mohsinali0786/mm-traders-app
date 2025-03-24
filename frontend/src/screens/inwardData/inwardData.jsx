import React, { useEffect, useState } from "react";
// import PartyDetailModal from "../modal/modal";
import TableUnstyled from "../../components/tableWithPagination/table";
import { getDataFromLS } from "../../commonFunctions/getAndSetDataFromLocalStrorage";
import { useSearchParams } from 'react-router-dom';
import NoRecordFound from "../../components/noRecordPage/noRecord";
import axios from "axios";
export default function InwardData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows,setRows] = useState([])
  const headers = ["Rec Id" ,"Date", "Party Name", "Quality", "Quantity", "Total","Remaining Balance"];
  const myParam = searchParams.get('myParam');
  console.log('myParam',myParam)
  useEffect(() => {
    let LSData = getDataFromLS("loginData");
    LSData = JSON.parse(LSData);
    getInward(LSData)
  },[myParam]);
  const getInward = (LSData) => {
    axios
      .get(`http://localhost:5000/api/getInwardEntry/${LSData?._id}`,
        {
          params: {
              queryParams: myParam,
          } }
      )
      .then((res) => {
        console.log(res, "resssss");
        setRows(res?.data?.result);
      })
      .catch((err) => {});
  };
  console.log('rowssssss',rows)
  return (
    <div>
      {
        rows && rows.length > 0 ?
        <TableUnstyled tableHeaders={headers} rows={rows} />
        :
        <NoRecordFound/>
      }
    </div>
  );
}
