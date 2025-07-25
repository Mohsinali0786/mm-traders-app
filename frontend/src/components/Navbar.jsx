import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import LogoutIcon from "@mui/icons-material/Logout";
import { getDataFromLS } from "../commonFunctions/getAndSetDataFromLocalStrorage";
export default function Navbar() {
  let user = JSON.parse(localStorage.getItem("loginData"));
  const [loginBtn, setLoginBtn] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // if (!user) setLoginBtn(false);
    // getDataFromLS("loginData")
    if (!user) navigate("/login");
  }, [loginBtn]);
  const logOut = () => {
    // console.log("logOut", JSON.parse(localStorage.getItem("loginData")));

    localStorage.clear();
    user = JSON.parse(localStorage.getItem("loginData"));
    setLoginBtn(false);
    // navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          MM Traders
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="d-md-none d-flex w-100 justify-content-end">
          <div className="d-flex align-items-center d-lg-none ">
            {user ? (
              <div className="d-flex align-items-center">
                <div className="m-2">
                  <p className="m-0 text-white">
                    <i>Welcome</i>
                    <b> {user?.name.toUpperCase()} !!! </b>
                  </p>
                </div>
                <div>
                  <LogoutIcon onClick={() => logOut()} className="text-white" />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav align-items-center">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            {!user ? (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            ) : null}
            {!user ? (
              <Link className="nav-link" to="/signup">
                SignUp
              </Link>
            ) : null}
            {user && user.role && user.role == "admin" ? (
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            ) : null}
            {user && user.role && user.role == "admin" ? (
              <Link className="nav-link" to="/p-form">
                Add Product
              </Link>
            ) : null}
            <Link className="nav-link" to="/costings">
              Costings
            </Link>
            {user ? (
              <Link className="nav-link" to="/hisabForm">
                Hisab Form
              </Link>
            ) : null}
            {user ? (
              <Link
                className="nav-link"
                to={{ pathname: "/inWard", search: "?myParam=inWard" }}
              >
                Inward
              </Link>
            ) : null}
            {user ? (
              <Link
                className="nav-link"
                to={{ pathname: "/outWard", search: "?myParam=outWard" }}
              >
                OutWard
              </Link>
            ) : null}
            <Link className="nav-link" to="/about">
              About Us
            </Link>
            <Link className="nav-link" to="/contactus">
              Contact Us
            </Link>

            {/* <HashLink className="nav-link" to="/#contactus"  smooth>Contact Us</HashLink> */}
          </div>
          <div className="d-md-flex align-items-center d-none">
            {user ? (
              <div className="d-flex align-items-center">
                <div className="m-2">
                  <p className="m-0 text-white">
                    <i>Welcome</i>
                  </p>
                  <p className="m-0 text-white loginNameEllipse">
                    <b> {user?.name.toUpperCase()} !!!</b>
                  </p>
                </div>
                <div>
                  <LogoutIcon
                    onClick={() => logOut()}
                    className="text-white pointer"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
