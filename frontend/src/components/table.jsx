import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Button } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SimpleAlert from "./alertBox";
import CircularProgressWithLabel from "./spinner";
import { GetAllUsers } from "../commonFunctions/getAllUsers";
const userRole = [
  { id: 1, roleName: "admin" },
  { id: 2, roleName: "user" },
];

const status = [
  { id: 1, status: "Delivered" },
  { id: 2, status: "Pending" },
  { id: 3, status: "Out For Delivery" },

];
const rows = [];

export default function DataTable({ data }) {
  console.log(data);
  const [role, setRole] = React.useState("");
  const [isRowFind, setIsRowFind] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [delMessage, setDelMessage] = React.useState('');
  const handleChange = (event, id) => {
    setRole(event);
    let selectedRow = rows.find((x) => x._id == id);
    if (selectedRow) {
      setIsRowFind(true);
      selectedRow["role"] = event;
    }
    // updateUserRole(id)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "name",
      headerName: "User Name",
      width: 150,
      editable: true,
    },

    {
      field: "role",
      headerName: "Role",
      // editable: true,
      // width: 450,
      renderCell: (params) => {
        return (
          <>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={params?.row?.role}
              label="Age"
              onChange={(e) => handleChange(e.target.value, params?.row?._id)}
              variant="standard"
            >
              {userRole?.map((val, i) => {
                return (
                  <MenuItem key={i} value={val?.roleName}>{val?.roleName}</MenuItem>
                );
              })}
            </Select>
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,

      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="outlined"
              onClick={() => updateUser(params?.row?._id)}
            >
              Update
            </Button>
            <Button>
              <ClearIcon onClick={() => deleteUser(params?.row?._id)} />
            </Button>
          </div>
        );
      },
    },
  ];
  const [rows, setRows] = useState([]);
  React.useEffect(() => {
    setIsRowFind(false);
  }, [isRowFind]);

  const [usersRoleCount, setUsersRoleCount] = useState({});
  const updateUser = async (rowId) => {
    console.log(rowId, "selectedRowId");
    console.log(role, "Role Updated");
    const response = await fetch(
      ` http://localhost:5000/api/updateRole/${rowId}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ role: role }),
      }
    );
  };
  const deleteUser = async (rowId) => {
    console.log(rowId, "selectedRowId");
    console.log(role, "Role Updated");
    const response = await fetch(
      ` http://localhost:5000/api/deleteUser/${rowId}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json.success) { 
      let res =await GetAllUsers()
      setRows(res.data)
    //  setRows(data.filter((x)=>x?._id != rowId))
      setIsDeleted(true);
    }
    setDelMessage(json.message)
    console.log(json);
      setIsDeleted(false)
  };

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  return (
    <div
      style={{ height: 380, width: "100%" }}
      className={rows && rows.length > 0 ? "" : "dataHeight"}
    >
      {rows && rows.length > 0 ? (
        <DataGrid
          sx={{
            // disable cell selection style

            ".MuiDataGrid-cell:focus": {
              outline: "none",
            },
            // pointer cursor on ALL rows
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
          }}
          rows={rows}
          columns={columns}
          initialState={
            rows && rows.length > 10
              ? {
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }
              : ""
          }
          pageSizeOptions={[10, 20, 25]}
          // checkboxSelection
          getRowId={(row) => row._id}
          disableSelectionOnClick={true}
          isRowSelectable={() => false}
          // onRowClick={(rows)=>{updateUserRole(rows?._id)}}
        />
      ) : (
        <CircularProgressWithLabel />
      )}
      {isDeleted ? (
        <div className="alertBoxDel">
          <SimpleAlert message={delMessage} />
        </div>
      ) : null}
    </div>
  );
}
