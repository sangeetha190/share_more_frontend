import React from "react";
import "./Loader.css";
import Lottie from "lottie-react";
import animationData from "./loader.json";
const Loader = () => {
  return (
    <>
      <div className="loader_section_container">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: 200, height: 200 }}
        />
      </div>
    </>
  );
};

export default Loader;
