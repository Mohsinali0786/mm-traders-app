import React, { useEffect, useState } from "react";
import contactus from "../assets/contactus.jpg";
import PushPinIcon from "@mui/icons-material/PushPin";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getDataFromLS } from "../commonFunctions/getAndSetDataFromLocalStrorage";
import SimpleAlert from "../components/alertBox";
import { ToastContainer, toast } from "react-toastify";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  useEffect(() => {
    const loginData = JSON.parse(getDataFromLS("loginData"));
    setFormData({
      ...formData,
      name: loginData.name,
      email: loginData.email,
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const backend_URL="https://mm-traders-backend-app.vercel.app/api/contactForm"
    // const backend_URL = "http://localhost:5000/api/contactForm";

    const response = await fetch(`${backend_URL}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: formData?.name,
        email: formData?.email,
        phone: formData?.phone,
        message: formData?.message,
        loginEmail: formData?.loginEmail,
      }),
    });
    const json = await response.json();
    if (json.success) {
      toast(json.meesage);
    }
  };
  return (
    // <div className="bg-image d-lg-block d-none">
    <div className="bg-image d-block">

      <h1 className="text-white">Contact Us</h1>
      <div className="">
        <div className="d-flex justify-content-between">
          <div className="contactForm">
            <form onSubmit={onSubmit}>
              <div className="d-flex gap-4 ">
                <div className="width33">
                  <label for="exampleInputEmail1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="name"
                    value={formData?.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="ml-4 width33">
                  <label for="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="email"
                    value={formData?.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="ml-4 width33">
                  <label for="exampleInputEmail1" className="form-label">
                    Phone
                  </label>
                  <PhoneInput
                    country={"us"}
                    value={formData?.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e })}
                  />
                  {/* <label for="exampleInputEmail1" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="email"
                    onChange={(e)=>setFormData({...formData,phone:e.target.value})}

                  /> */}
                </div>
              </div>
              <div className="mt-3 mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Message
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  rows={5}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>
              <div className="submitContactForm d-flex justify-content-end">
                <button>
                  <p>Send</p> <SendIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="d-flex justify-content-evenly">
          <div className="d-flex flex-column align-items-center mb-4">
            <div className="iconCircle bg-success mb-1">
              <PushPinIcon />
            </div>
            <div className="contactInfo">
              <p>Rasheedabad Site Area, Karachi.</p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center mb-4">
            <div className="iconCircle bg-success mb-1">
              <CallIcon />
            </div>
            <div className="contactInfo">
              <p>(+92) 3212097195 </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="iconCircle bg-success mb-1">
              <EmailIcon />
            </div>
            <div className="contactInfo">
              <span>mohsinali481997@gmail.com.</span>
              <br />
              <span>faranimp@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
