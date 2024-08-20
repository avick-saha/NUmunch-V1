import React from "react";
import "./aboutSection.css";
import 'font-awesome/css/font-awesome.min.css';
import divyansh from "../About/img/divyansh.jpeg";
import krish from "../About/img/krish.jpg";
import kartik from "../About/img/kartik.jpeg";
import ranil from "../About/img/ranil.jpeg";
import ankit from "../About/img/ankit.jpeg";
import samar from "../About/img/samar.jpeg";
import avick from "../About/img/avick.jpeg";
import muskaan from "../About/img/muskaan.jpeg";

const About = () => {
    
  return (
    <div className="veg">
      <div className="center">
        <div className="team">
          <div className="title">Our Team</div>
          <div className="profiles">
            {/* Profile Cards */}
            
            <div className="profile">
                
                <img src={avick} alt="" id="picture" />
                <div className="details">
                  Avick Saha
                  <span>Lead & Backend Developer</span>
                </div>
              </div>


              <div className="profile">
                
                <img src={divyansh} alt="" id="picture" />
                <div className="details">
                  Divyansh Mishra
                  <span>Co-Lead & Frontend Developer</span>
                </div>
              </div>

              <div className="profile">
               
                <img src={samar} alt="" id="picture" />
                <div className="details">
                  Samar Sparsh
                  <span>Ui/Ux Designer</span>
                </div>
              </div>

              <div className="profile">
                
                <img src={kartik} alt="" id="picture" />
                <div className="details">
                 Kartik Mudgal
                  <span>Ui/Ux Designer</span>
                </div>
              </div>

              <div className="profile">
                
                <img src={ankit} alt="" id="picture" />
                <div className="details">
                  Ankit Yadav
                  <span>Tester</span>
                </div>
              </div>

              <div className="profile">
                
                <img src={krish} alt="" id="picture" />
                <div className="details">
                  Krish Patel
                  <span>Tester</span>
                </div>
              </div>
              
              <div className="profile">
                
              
                <img src={ranil} alt="" id="picture" />
                <div className="details">
                  Ranil Bazira
                  <span>Database Manager</span>
                </div>
              </div>

              <div className="profile">
               
                <img src={muskaan} alt="" id="picture" />
                <div className="details">
                  Muskaan Thakur
                  <span>Database Manager</span>
                </div>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

