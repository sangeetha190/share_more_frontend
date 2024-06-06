import React from "react";
import campImg from "../../assets/images/banner_image/blood.jpg";
// import campImg from "../../assets";
const PageUnderMaintance = () => {
  return (
    <>
      {/* <div className="d-flex justify-content-center">
        <img
          src={`${process.env.PUBLIC_URL}/images/page_under.png`}
          alt="page under maintenance"
          className="w-50"
        />
      </div> */}
      <div className="mt-5 pt-5 container">
        <div className="" style={{ height: "auto" }}>
          <img src={campImg} alt="ttest" className="w-50" />
        </div>
        <div className="" style={{ height: "auto" }}>
          <img src={campImg} alt="ttest" className="w-50" />
        </div>
      </div>
    </>
  );
};

export default PageUnderMaintance;
