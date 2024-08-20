import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:kartik.mudgal22@st.niituniversity.in">
        <Button>If you're facing some issues then feel free contact us.</Button>
      </a>

      
      <p className="contact">
        Contact Us at: numunch@st.niituniversity.in
      </p>
      <p className="mob">
        Mobile Number: (+91) 6392331256
      </p>
     
    </div>
    
    
    
  );
};

export default Contact;
