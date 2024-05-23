import React from "react";

const Notify = ({ message, imgUrl }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={imgUrl}
        alt="Custom"
        style={{ width: "55px", marginRight: "10px" }}
      />
      {message}
    </div>
  );
};

export default Notify;
