import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { getDataFromLS } from "../../commonFunctions/getAndSetDataFromLocalStrorage";
import { useLocation } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import "./paymentTable.css";
import { useNavigate } from "react-router-dom";
export default function PaymentDetails() {
  const [dataa, setDataa] = useState(false);
  const [totalPaymentRcvd, setTotalPaymentRcvd] = useState(0);
  const [paymentUpdated, isPaymentUpdated] = React.useState(false);
  const [payment, setPayment] = React.useState();
  const location = useLocation();
  const rec = location.state;
  const doc = new jsPDF();
  const navigate = useNavigate();
  let setRemTotal = 0
  const onSubmit = (e, id, recordId) => {
    e.preventDefault();
    let LSData = getDataFromLS("loginData");
    LSData = JSON.parse(LSData);
    console.log(id, "iddddddddd");
    // console.log("userId", LSData?._id);
    console.log("recordId", recordId);

    let body = {
      userId: LSData?._id,
      recordId: recordId,
      hisabId: id,
      paymentRcvd: payment,
    };
    axios
      .post(`https://mm-traders-backend-app.vercel.app/api/updatehisab/${LSData?._id}`, body)
      .then((res) => {
        console.log(res, "resssss");
      })
      .catch((err) => {});
  };
  const getTotalPaymentRcvd = (paymentRcvd) => {
    console.log(paymentRcvd, "paymentRcvd==>");
    let sum = 0;
    paymentRcvd?.forEach((x) => {
      // console.log(x)
      sum += +x?.paymentRcvd;
    });
    return sum;
  };
  const getTotalRemainingBalance = (hisabKitab) => {
    console.log(hisabKitab, "hisabKitab==>");
    let sum = 0;
    hisabKitab?.forEach((x) => {
      // console.log(x)
            if(!x?.paymentIsCleared && x.type == "SELL"){
              sum += +x?.remainingBal;
            }
            else if(!x?.paymentIsCleared && x.type == "PURCHASE"){
              sum -= +x?.remainingBal;
            }
    });
    setRemTotal = `Total B/L ${sum}`
    return sum;
  };
  const ExportPdfHandler = () => {
    setDataa(true);
    doc.autoTable({
      html: "#data-table",
      // startY: 0,
      // startX: 0,
      margin: { horizontal: 10 },
      styles: {
        fontSize: 9,
        cellWidth: "wrap",
        valign: "middle",
        halign: "center",
        // padding: 0,
      },
      columnStyles: {
        3: { columnWidth: "auto" },
      },
    });
    let finalY = doc.lastAutoTable.finalY; // The y position on the page
    console.log(finalY,'finalYfinalYfinalY')
    doc.text(150, finalY+15,setRemTotal )    
    doc.save("data.pdf");
  };
  console.log("payment", rec);
  return (
    <div className="dataTable">
      <div className="exportBtn">
        <Button
          variant="contained"
          onClick={() => {
            ExportPdfHandler();
          }}
        >
          Download Pdf
          <DownloadIcon />
        </Button>
      </div>
      <div className="tableDiv">
        <table id="data-table">
          <thead>
            <tr className="tabHeaders">
              <th>Bill Id</th>
              <th>Party Name</th>
              <th>C/D</th>
              <th>Total Amount</th>
              <th>Add Payment</th>
              <th>Date</th>
              <th>Payment Received</th>
              <th>Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {rec?.hisabKitab?.map((data) => {
              return (
                <>
                  <tr>
                    <td className="" rowSpan={data?.paymentRcvd?.length}>
                      {data?.id}
                      {/* <p> Bill Id: <b>{data?.id}</b></p>
                <p> PartyName: <b>{data?.partyName}</b></p>
                <p> TotalPrice: <b>{data?.totalPrice}</b></p> */}
                    </td>
                    <td
                      className="partyName"
                      rowSpan={data?.paymentRcvd?.length}
                    >
                      {data?.partyName}
                    </td>
                    <td rowSpan={data?.paymentRcvd?.length}>
                      {data?.type == "SELL" && !data.paymentIsCleared ? "CR" : data?.type != "SELL" && !data.paymentIsCleared ?  "DB" : "--"}
                    </td>
                    <td
                      className="totalAmount"
                      rowSpan={data?.paymentRcvd?.length}
                    >
                      {data?.totalPrice}
                    </td>
                    <td rowSpan={data?.paymentRcvd?.length} style={{backgroundColor:'black' ,color:'white'}}>
                      {/* <div className="textCenter"> */}
                      {!data.isUpdated ? (
                        <>
                          <div
                            className={
                              data?.remainingBal > 0 ? "textCenter" : null
                            }
                          >
                            {data?.remainingBal  ? (
                                  data.paymentIsCleared ? 
                                  <b>Cleared</b>
                                  :
                                  <EditIcon
                                    onClick={() => {
                                      isPaymentUpdated(true);
                                      data.isUpdated = true;
                                    }}
                                  />
                            ) : <b style={{color:'red'}}>Cleared</b>}
                          </div>
                        </>
                      ) : (
                        <>
                          <input onChange={(e) => setPayment(e.target.value)} />
                          <button
                            onClick={(e) => {
                              onSubmit(e, data?.id, rec?._id);
                              isPaymentUpdated(false);
                              data.isUpdated = false;
                            }}
                          >
                            Update
                          </button>
                        </>
                      )}
                      {/* </div> */}
                    </td>
                  </tr>
                  {data &&
                    data?.paymentRcvd &&
                    data?.paymentRcvd?.length > 0 &&
                    data?.paymentRcvd?.map((x) => {
                      if (x.paymentRcvd > 0) {
                        return (
                          <tr className="dataRow">
                            <td>{x?.date?.split("T")[0]}</td>
                            <td>{x?.paymentRcvd}</td>
                            <td className="remainingBal">
                              {x?.remainingPayment}
                            </td>
                          </tr>
                        );
                      }
                    })}
                  <tr className="billTotal">
                    <td colSpan={6}>Total</td>
                    <td>{getTotalPaymentRcvd(data?.paymentRcvd)}</td>
                    <td>{data.paymentIsCleared ? 0 : data?.remainingBal}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
          {/* <tbody>
          {
            dataaaa().map((x)=>{
              return <tr><td>{x}</td></tr>
              })
              }
              </tbody> */}
        </table>
        {/* <h4>{data?.remainingBal}</h4> */}
      </div>
        <div>
          <p className="textEnd">
            <span>
              {
                getTotalRemainingBalance(rec?.hisabKitab) < 0  ?<b style={{color:"red"}}>Debit (Mujhe Dene Hei)</b> : <b style={{color:"green"}}>Credit (Mujhe Lene Hei)</b> 
              }
            </span>
            <p>
            Total Remaining Balance {
            getTotalRemainingBalance(rec?.hisabKitab)}
            </p>
          </p>
        </div>
    </div>
  );
}
