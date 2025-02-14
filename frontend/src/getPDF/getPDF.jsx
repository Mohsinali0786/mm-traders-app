import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";

export default function GetPDF() {
  const columns = [
    // { id: "_", label: "Image", minWidth: 170 },
    { id: "_id", label: "Id", minWidth: 170 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 150 },
    {
      id: "role",
      label: "Role",
      minWidth: 100,
      editable: false,
    },
  ];
  return (
    <div>
      <button onClick={() => window.open("getPDF")}>View</button>

      {/* <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <>
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <>
                            {console.log("edit", row, row.editable)}

                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ maxWidth: "100px" }}
                            >

                              
                                <div className="">
                                  {column.label == "Id" ? (
                                    <Avatar
                                      alt="Remy Sharp"
                                    >
                                      {row.name.slice(0, 2).toUpperCase()}
                                    </Avatar>
                                  ) : null}
                                  <span>{value}</span>

                                </div>
                              )}
                            </TableCell>
                          </>
                        );
                      })}
     
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {data && data?.length > 5 ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : null}
      </Paper> */}
    </div>
  );
}
