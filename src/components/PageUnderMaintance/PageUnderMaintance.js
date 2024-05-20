import React from "react";

const PageUnderMaintance = () => {
  return (
    <div className="d-flex justify-content-center">
      <img
        src={`${process.env.PUBLIC_URL}/images/page_under.png`}
        alt="page under maintenance"
        className="w-50"
      />
    </div>
  );
};

export default PageUnderMaintance;
