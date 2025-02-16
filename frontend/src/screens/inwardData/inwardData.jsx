import React, { useEffect, useState } from "react";
// import PartyDetailModal from "../modal/modal";
import TableUnstyled from "../../components/tableWithPagination/table";
export default function InwardData() {

  const headers=[
    "S.no",
    "Name",
    "Quality",
    "Quantity",
    "Total"
  ]
  const rows = [
    createData("Cupcake", 305, 3.7),
    createData("Donut", 452, 25.0),
    createData("Eclair", 262, 16.0),
    createData("Frozen yoghurt", 159, 6.0),
    createData("Gingerbread", 356, 16.0),
    createData("Honeycomb", 408, 3.2),
    createData("Ice cream sandwich", 237, 9.0),
    createData("Jelly Bean", 375, 0.0),
    createData("KitKat", 518, 26.0),
    createData("Lollipop", 392, 0.2),
    createData("Marshmallow", 318, 0),
    createData("Nougat", 360, 19.0),
    createData("Oreo", 437, 18.0),
  ]
  function createData(name, calories, fat) {
    return { name, calories, fat };
  }
  return (
    <div >
      <TableUnstyled tableHeaders={headers} rows={rows}/>
    </div>
  );
}
