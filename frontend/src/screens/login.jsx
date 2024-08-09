import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logos/MM Traders_transparent.png";

function Login() {
  const navigate = useNavigate();
  const [credential, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading ,setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    // http://localhost:5000/api/loginUser  
    const response = await fetch("https://mm-trader-app.vercel.app/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success && json.errors && Array.isArray(json.errors)) {
      let message = "";
      json.errors.map((err) => {
        console.log("=======", err);
        message = message + "\n" + err?.msg;
      });
      return alert(message);
    }
    if (!json.success && json.errors) {
      return alert(json.errors);
    }
    navigate("/");
    localStorage.setItem("authToken", json.authToken);
    localStorage.setItem("loginData", JSON.stringify(json.userLogin));
    setLoading(false)
  };
  const onChange = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-around">
        <a class="navbar-brand" href="#">
          <img src={logo} height="150" alt="MDB Logo" loading="lazy" />
        </a>
      </div>
      <div>
        <h3 className="d-flex justify-content-center">LogIn</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={credential.email}
            />
            {/* <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div> */}
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={onChange}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credential.password}
            />
          </div>
          <div className="row gap-2">
            <div className="col-sm-12 col-md-3">
              <button
                type="submit"
                className="btn btn-success w-100 login-btn buttonload"
                disabled={loading}
              >
                Login
                {
                  loading ?  <i class="fa fa-refresh fa-spin"></i> : null
                }
              </button>
            </div>
            <div className="col-sm-12 col-md-3">
              <Link className="btn btn-success login-btn w-100" to="/signup">
                I am a new User?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
