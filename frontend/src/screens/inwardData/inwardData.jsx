import React, { useEffect, useState } from "react";
// import PartyDetailModal from "../modal/modal";
import TableUnstyled from "../../components/tableWithPagination/table";
import { getDataFromLS } from "../../commonFunctions/getAndSetDataFromLocalStrorage";
import { useSearchParams } from "react-router-dom";
import NoRecordFound from "../../components/noRecordPage/noRecord";
import axios from "axios";
import "./inwardData.css";
export default function InwardData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const headers = [
    "Rec Id",
    "Date",
    "Party Name",
    "Quality",
    "Quantity",
    "Unit",
    "Total",
    "Remaining Balance",
    "Action",
  ];

  const constRow = [
    {
      id:"abcxyz123",
      date:"20/06/2025",
      partyName:"Test 1", 
      quality:"Flannel", 
      totalMetre:2500, 
      totalPrice:250000,
      remainingBal:0
    },
    {
      id:"xyzqwe4e45",
      date:"20/06/2025",
      partyName:"Test 2", 
      quality:"Cotton", 
      totalMetre:500, 
      totalPrice:150000,
      remainingBal:0
    },
  ]
  const BackendURL ="https://mm-traders-backend-app.vercel.app"
  // const BackendURL ="http://localhost:5000"

  const myParam = searchParams.get('myParam');
  console.log('myParam',myParam)
  useEffect(() => {
    let LSData = getDataFromLS("loginData");
    LSData = JSON.parse(LSData);
    console.log("LSDAta",LSData)
    getInward(LSData)
  },[myParam]);
  const getInward = (LSData) => {
    setLoading(true)
    axios
      .get(`${BackendURL}/api/getInwardEntry/${LSData?._id}`,
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
    setLoading(false)
  
    };
  
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // setLoading(false)
  };

  
  console.log('rowssssss',rows)
  return (
    <div className="">
      {loading ? (
        <div className="inWardDataMinDiv">
          <i className="fa fa-refresh fa-spin"></i>
        </div>
      ) : (rows && rows.length > 0) || (constRow && constRow.length > 0) ? (
        <>
          <TableUnstyled tableHeaders={headers} rows={rows} myParam={myParam} />
        </>
      ) : (
        <NoRecordFound />
      )}
    </div>
  );
}
