import React from "react";
import notFoundImg from "../assets/images/banner_image/not_found.png";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
      {/* <img src={notFoundImg} alt="404_page" /> */}
      <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
        <img src={notFoundImg} alt="page under maintenance" className="w-50" />
        <Link to="/" className="fs-5 btn btn-primary">Back to home</Link>
      </div>
    </div>
  );
};

export default NotFound;
