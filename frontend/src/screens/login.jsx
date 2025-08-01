import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logos/MM Traders_transparent.png";
import SimpleAlert from "../components/alertBox";

function Login() {
  const alertBoxStyle={
        position:'absolute',
        right:'30px',
        top:'100px'
      }
    
  const navigate = useNavigate();
  const [credential, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading ,setLoading] = useState(false)
   const [showMessageTimer, setShowMessageTimer] = useState({
      status: false,
      // message: "Enter correct email" +  "\n" + "Incorrect Password",
      message:""
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    // cosnt backend_URL="http://localhost:5000/api/loginUser"
    const backend_URL="https://mm-traders-backend-app.vercel.app/api/loginUser"

    const response = await fetch(`${backend_URL}`, {
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
      setLoading(false)
          setShowMessageTimer({ status: true, message: message });

      return setTimeout(() => {
      setShowMessageTimer({ status: false });
    }, 3000); 
      // return alert(message);
    }
    if (!json.success && json.errors) {
          setShowMessageTimer({ status: true, message: json.errors });
    setLoading(false)
        return setTimeout(() => {
      setShowMessageTimer({ status: false });
    }, 3000);
      // return alert(json.errors);
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
        <a className="navbar-brand" href="#">
          <img src={logo} height="150" alt="MDB Logo" loading="lazy" />
        </a>
      </div>
      {showMessageTimer?.status ? (
              //   <Alert variant="outlined" severity="success" sx={{position:'absolute', right:'10px'}}>
              //     This is an outlined success Alert.
              //   </Alert>
              <SimpleAlert
                message={showMessageTimer?.message}
                style={alertBoxStyle}
                status="error"
              />
            ) : null}
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
                  loading ?  <i className="fa fa-refresh fa-spin"></i> : null
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
