import React, { useEffect, useState } from "react";
// import PartyDetailModal from "../modal/modal";
import { Link } from "react-router-dom";
import "./dataVisualization.css";
export default function DataTable({ data }) {
  console.log(data, "data");
  return (
    <div className="mainTableContent">
      <table cellPadding={10}>
        <tr>
          <th>Name</th>
        </tr>
        {data &&
          data.map((data, index) => {
            return (
              <tr>
                <td>{data?.partyName}</td>
                <td>
                  {/* <PartyDetailModal data={data} /> */}
                  <Link to="/paymentDetail" state={data}>
                    View Details
                  </Link>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}
