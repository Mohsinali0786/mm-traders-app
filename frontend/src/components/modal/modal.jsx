import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import "./modal.css";
import axios from "axios";
import { getDataFromLS } from "../../commonFunctions/getAndSetDataFromLocalStrorage";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PartyDetailModal({ data }) {
  const [open, setOpen] = React.useState(false);
  const [paymentUpdated, isPaymentUpdated] = React.useState(false);
  const [payment, setPayment] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  console.log(data, "modal");
  const onSubmit = (e, id) => {
    e.preventDefault();
    let LSData = getDataFromLS("loginData");
    LSData = JSON.parse(LSData);
    console.log(id, "iddddddddd");
    console.log("userId", LSData?._id);
    console.log("recordId", data?._id);

    let body = {
      userId: LSData?._id,
      recordId: data?._id,
      hisabId: id,
      paymentRcvd: payment,
    };
    axios
      .post(`http://localhost:5000/api/updatehisab/${LSData?._id}`, body)
      .then((res) => {
        console.log(res, "resssss");
      })
      .catch((err) => {});
  };
  const getTotalBalance = (data) => {
    console.log(data);
    let total = 0;
    data.forEach((x) => {
      if (x?.remainingBal > 0) {
        total = total + x?.remainingBal;
      }
    });
    return total;
  };
  // const ExportPdfHandler = () => {
  //   // var paymentTermsDate = document.getElementById("paymentTermsDate");
  //   // var paymentTermsPayment = document.getElementById("paymentTermsPayment");
  //   // console.log(paymentTermsDate.innerText, "paymentTermsDate");
  //   // console.log(paymentTermsPayment.innerText, "paymentTermsPayment");
  //   // doc.splitTextToSize(paymentTermsDate.innerText, "P");
  //   setDataa(true);
  //   doc.autoTable({
  //     html: "#dataaTable",
  //     // startY: 60,
  //     styles: {
  //       fontSize: 10,
  //       cellWidth: "wrap",
  //     },
  //     columnStyles: {
  //       3: { columnWidth: "auto" },
  //     },
  //   });
  //   doc.save("data.pdf");
  // };
  const doc = new jsPDF();
  const getTotalPaymentRcvd = (data) => {
    let sum = 0;
    data?.paymentRcvd?.forEach((x) => {
      // console.log(x)
      sum += +x?.paymentRcvd;
    });
    return sum;
  };
  return (
    <div>
      <Button onClick={handleOpen}>View Details</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth={true}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            PartyName:<b>{data.partyName}</b>
          </Typography>
          <div className="hisabKitabTable">
            <table
              cellPadding={10}
              style={{ marginTop: "20px" }}
              id="dataaTable"
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid #ddd",
                    background: "orange",
                  }}
                >
                  <th>Bill No</th>
                  <th>Date</th>
                  <th>Metre</th>
                  <th>Amount</th>
                  <th>Received Amount</th>
                  <th>Balance Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data?.hisabKitab &&
                  data?.hisabKitab?.map((data, index) => {
                    console.log("xData", data.paymentRcvd);
                    return (
                      <tr>
                        <td>{data?.id}</td>
                        <td>{data?.date}</td>
                        <td>{data?.totalMetre}</td>
                        <td>{data?.totalPrice}</td>
                        <td>
                          <div className="textCenter">
                            {!data.isUpdated ? (
                              <>
                              <div className={data?.remainingBal > 0 ? "d-flex justifyBetween" : null}>
                                <p>{getTotalPaymentRcvd(data)}</p>
                                  {data?.remainingBal > 0 ? (
                                    <p>
                                      <EditIcon
                                        onClick={() => {
                                          isPaymentUpdated(true);
                                          data.isUpdated = true;
                                        }}
                                      />
                                    </p>
                                  ) : null}
                              </div>
                                <button
                                  onClick={() => {
                                    navigate("/paymentDetail", {
                                      state: data,
                                    });
                                  }}
                                >
                                  View
                                </button>
                              </>
                            ) : (
                              <>
                                <input
                                  onChange={(e) => setPayment(e.target.value)}
                                />
                                <button
                                  onClick={(e) => {
                                    onSubmit(e, data?.id);
                                    isPaymentUpdated(false);
                                    data.isUpdated = false;
                                  }}
                                >
                                  Update
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                        <td>
                          {data?.remainingBal > 0 ? data?.remainingBal : 0}
                        </td>

                        <td>
                          <div
                            className={
                              data?.remainingBal > 0
                                ? "statusChip bg-danger"
                                : "statusChip bg-success"
                            }
                          >
                            {data.remainingBal <= 0 ? "Cleared" : "Pending"}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <h5 className="totalBal">
              Total {getTotalBalance(data?.hisabKitab)}
            </h5>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
