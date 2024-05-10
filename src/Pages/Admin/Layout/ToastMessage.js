import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ToastMessage = ({ type, message }) => {
  const showToast = () => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      default:
        toast(message);
    }
  };

  return (
    <div>
      <ToastContainer />
      {showToast()}
    </div>
  );
};

export default ToastMessage;
