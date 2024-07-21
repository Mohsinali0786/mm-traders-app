import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logos/MM Traders_transparent.png";
function SignUp() {
  const navigate = useNavigate();
  const [credential, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://mm-trader-app.vercel.app/api/createUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: credential.name,
        email: credential.email,
        password: credential.password,
        location: credential.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json.success, "success");
    if (!json.success) return alert(json.message ? json.message : "Enter valid credentials", json.errors);
    navigate('/login')
  };
  const onChange = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className="container ">
      <div className="d-flex justify-content-around">
        <a class="navbar-brand" href="#">
          <img src={logo} height="150" alt="MDB Logo" loading="lazy" />
        </a>
      </div>
      <div className="">
        <h3 className="d-flex justify-content-center">Register yourself</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              name="name"
              value={credential.name}
            />
          </div>
          <div className="mb-2">
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
          <div className="mb-2">
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
          <div className="mb-2">
            <label className="form-label">Address</label>
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              name="geolocation"
              value={credential.geolocation}
            />
          </div>
          {/* <div className="mb-2 form-check">
          <input
            onChange={onChange}
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div> */}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn m-3  btn-success">
              Register
            </button>
            <Link className="m-3 btn btn-success" to="/login">
              Already a User
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
