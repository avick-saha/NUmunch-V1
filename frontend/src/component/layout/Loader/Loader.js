import React from "react";
import loaderGIF from "../../../images/loader.gif";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loading">
       <img src={loaderGIF} alt="loader" />
    </div>
  );
};

export default Loader;
