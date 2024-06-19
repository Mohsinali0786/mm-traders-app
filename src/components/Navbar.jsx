import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
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
    navigate('/login')
    setLoginBtn(false);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" href="#">
          MM Garments
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
          </div>
          <div className="d-flex align-items-center">
            {user ? (
              <div className="d-flex align-items-center">
              <div>
                <Button
                  variant="text"
                  className="text-white bg-dark border border-dark"
                  onClick={() => logOut()}
                >
                  Logout
                </Button>
                </div>
                <div className="m-2">
                  <p className="m-0">
                    <i>Welcome</i>
                    <b> {user?.name.toUpperCase()} !!! </b>
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
