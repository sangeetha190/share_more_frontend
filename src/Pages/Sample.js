import React from "react";
import "../assets/css/test.css";
import "../assets/css/app.css";
const Sample = () => {

  return (
    <>
      <div className="wrapper">
        <div className="authentication-forgot d-flex align-items-center justify-content-center">
          <div className="card forgot-box">
            <div className="card-body">
              <div className="p-3">
                <div className="text-center">
                  <img
                    src="assets/images/icons/forgot-2.png"
                    width="100"
                    alt=""
                  />
                </div>
                <h4 className="mt-5 font-weight-bold">Forgot Password?</h4>
                <p className="text-muted">
                  Enter your registered email ID to reset the password
                </p>
                <div className="my-4">
                  <label className="form-label">Email id</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="example@user.com"
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="button" className="btn btn-primary">
                    Send
                  </button>
                  <a
                    href="authentication-signin.html"
                    className="btn btn-light"
                  >
                    <i className="bx bx-arrow-back me-1"></i>Back to Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sample;
