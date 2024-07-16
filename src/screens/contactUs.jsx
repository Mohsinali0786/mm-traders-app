import React, { useEffect } from "react";
import contactus from "../assets/contactus.jpg";
import PushPinIcon from "@mui/icons-material/PushPin";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
function ContactUs() {
  return (
    <div className="m-4">
      <div className="bg-image">
        <h1 className="text-white">Contact Us</h1>
      </div>
      <div className="d-flex justify-content-around mt-2">
        <div className="d-flex flex-column align-items-center">
          <div className="iconCircle bg-success mb-1">
            <PushPinIcon />
          </div>
          <div>
            <p>Rasheedabad Site Area, Karachi.</p>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className="iconCircle bg-success mb-1">
            <CallIcon />
          </div>
          <div>
            <p>(+92) 3212097195 </p>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className="iconCircle bg-success mb-1">
            <EmailIcon />
          </div>
          <div>
            <span>mohsinali481997@gmail.com.</span><br/>
            <span>faranimp@gmail.com</span>
          </div>
        </div>
      </div>
      {/* <img src={contactus}/> */}
    </div>
  );
}

export default ContactUs;
