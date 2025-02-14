import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import LogoutIcon from '@mui/icons-material/Logout';
export default function Navbar() {
  let user = JSON.parse(localStorage.getItem("loginData"));
  const [loginBtn, setLoginBtn] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("UseEffect");
  }, [loginBtn]);
  const logOut = () => {
    localStorage.clear();
    user = JSON.parse(localStorage.getItem("loginData"));
    navigate("/login");
    setLoginBtn(false);
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
                  <LogoutIcon 
                  onClick={() => logOut()}
                  className="text-white"
                  />
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
            <Link className="nav-link" to="/hisabForm">
              Hisab Form
            </Link>
            <Link className="nav-link" to="/inWard">
              Inward
            </Link>
            <Link className="nav-link" to="/contactus">
              OutWard
            </Link>
            <Link className="nav-link" to="/outWard">
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
                  <p className="m-0 text-white loginNameEllipse"><b> {user?.name.toUpperCase()} !!!</b></p>
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
