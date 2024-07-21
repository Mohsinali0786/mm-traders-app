import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Button } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import CircularProgressWithLabel from "./spinner"
const userRole = [
  { id: 1, roleName: "admin" },
  { id: 2, roleName: "user" },
];

const rows = [];

export default function DataTable() {
  const [role, setRole] = React.useState("");
  const [isRowFind, setIsRowFind] = React.useState(false);
  const handleChange = (event , id) => {
    setRole(event);
    let selectedRow = rows.find((x)=>x._id == id)
    if(selectedRow) {
      setIsRowFind(true)
      selectedRow['role'] =event
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
              onChange={(e)=>handleChange(e.target.value ,params?.row?._id)}
              variant="standard"
            >
              {userRole?.map((val, i) => {
                return (
                  <MenuItem value={val?.roleName}>{val?.roleName}</MenuItem>
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
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="outlined"
              onClick={() => updateUser(params?.row?._id)}
            >
              Update
            </Button>
          </>
        );
      },
    },
  ];
  const [rows, setRows] = useState([]);
  React.useEffect(()=>{setIsRowFind(false)},[isRowFind])
  
  const [usersRoleCount, setUsersRoleCount] = useState({});
  const updateUser = async (rowId) => {
    console.log(rowId, "selectedRowId");
    console.log(role, "Role Updated");
    const response = await fetch(`https://mm-trader-app.vercel.app/api/updateRole/${rowId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body:JSON.stringify({"role":role}),
    });
  };
  React.useEffect(() => {
    getData();
    console.log("Get Data");
  }, []);
  const getData = async (e) => {
    const response = await fetch("https://mm-trader-app.vercel.app/api/getUser", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    let res = await response.json();
    if(res && res.success){
      console.log("Get Data from api", res);
      setRows(res?.data);
      calUsers(res?.data);
    }
  };

  const calUsers = (data) => {
    if (!data) return;
    let admin = data?.filter((x) => x?.role == "admin")?.length;
    let user = data?.filter((x) => x?.role == "user")?.length;
    console.log("adminUser", admin);
    console.log("User", user);
    localStorage.setItem(
      "totalUsers",
      JSON.stringify({ admin: admin, user: user })
    );
  };

  return (
    <div style={{ height: 380, width: "100%" }} className= {rows && rows.length > 0 ? "" : "dataHeight"} >
      {
        rows && rows.length > 0 ? 
      <DataGrid
      sx={{
        // disable cell selection style
        '.MuiDataGrid-cell:focus': {
          outline: 'none'
        },
        // pointer cursor on ALL rows
        '& .MuiDataGrid-row:hover': {
          cursor: 'pointer'
        }
      }}
        rows={rows}
        columns={columns}
        initialState={rows && rows.length > 10 ? {
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }: ""}
        pageSizeOptions={[10 , 20 , 25]}
        // checkboxSelection
        getRowId={(row) => row._id}
        disableSelectionOnClick={true}
        isRowSelectable={() => false}
        // onRowClick={(rows)=>{updateUserRole(rows?._id)}}
      />
      :
      <CircularProgressWithLabel/>
      }
    </div>
  );
}
