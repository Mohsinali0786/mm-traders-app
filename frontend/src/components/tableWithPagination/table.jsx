import * as React from "react";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { Link } from "react-router-dom";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

export default function TableUnstyled({ tableHeaders, rows, myParam }) {
  const BackendURL = "https://mm-traders-backend-app.vercel.app"
  // const BackendURL = "http://localhost:5000"
  console.log(rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const updateInwardOutward = (recId, mainId) => {
    console.log("mainID", mainId);
    console.log("recId", recId);

    axios
      .post(`${BackendURL}/api/updateinwardoutward`, {
        mainId: mainId,
        recId: recId,
      })
      .then((res) => {
        console.log(res, "resssss");
      })
      .catch((err) => {});
  };
  const deleteRecord = (recId, mainId) => {
    console.log("mainID", mainId);
    console.log("recId", recId);

    axios
      .post(`${BackendURL}/api/deleteoutward`, {
        mainId: mainId,
        recId: recId,
      })
      .then((res) => {
        console.log(res, "resssss");
      })
      .catch((err) => {});
  };
  console.log("parsm", myParam);
  return (
    <Root sx={{ maxWidth: "100%" }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            {tableHeaders?.map((header) => {
              if (myParam == "outWard") {
                if (header == "Total" || header == "Remaining Balance") {
                  return null;
                }
              }
              return <th>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          )?.map((row) => (
            <tr key={row.id}>
              <td style={{ width: 160 }} align="right">
                {row.id}
              </td>
              <td style={{ width: 160 }} align="right">
                {myParam == "outWard" ? (
                  <>
                    <span>{row.date} Inward </span>
                    <br />
                    <span>{row.outwardDate} Outward</span>
                  </>
                ) : (
                  <h6>{row.date}</h6>
                )}
              </td>
              <td>{row.partyName}</td>
              <td style={{ width: 160 }} align="right">
                {row.quality}
              </td>
              <td style={{ width: 160 }} align="right">
                {row.totalMetre}
              </td>
              {myParam != "outWard" ? (
                <td style={{ width: 160 }} align="right">
                  {row.totalPrice}
                </td>
              ) : null}
              {myParam != "outWard" ? (
                <td style={{ width: 160 }} align="right">
                  {row.remainingBal}
                </td>
              ) : null}
              <td>
                {myParam == "outWard" ? (
                  <CloseIcon onClick={() => deleteRecord(row.id, row.mainId)} />
                ) : (
                  <button
                    onClick={() => {
                      updateInwardOutward(row.id, row.mainId);
                    }}
                  >
                    Cleared
                  </button>
                )}
              </td>
              {/* <td style={{ width: 160 }} align="right">
                <Link to="/paymentDetail" state={row}>
                  View Details
                </Link>
              </td> */}
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} aria-hidden />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              // rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              rowsPerPageOptions={[25]}
              colSpan={3}
              count={rows?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  "aria-label": "rows per page",
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
}
const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Root = styled("div")(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  }
  `
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
