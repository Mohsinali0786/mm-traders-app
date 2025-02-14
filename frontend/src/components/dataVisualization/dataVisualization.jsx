import React, { useEffect, useState } from "react";
import PartyDetailModal from "../modal/modal";
import { Link } from "react-router-dom";
export default function DataTable({ data }) {
  console.log(data, "data");
  return (
    <table cellPadding={30}>
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
                <Link to="/paymentDetail" state={ data }>Link</Link>
              </td>
            </tr>
          );
        })}
    </table>
  );
}
