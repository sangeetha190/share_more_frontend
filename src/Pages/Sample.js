import React from "react";
import "../assets/css/test.css";
import "../assets/css/app.css";
import Lottie from "lottie-react";
import animationData from "../components/Loader/loader.json";
import { Link } from "react-router-dom";
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
      <img src="./images/logo1.png" alt="logo" width="170px" />
      <div>
        {/* <Lottie animationData={animationData} /> */}
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: 200, height: 200 }}
        />
      </div>

      {/* ===================================================== */}
      {/* ======================================== */}
      <div className="homepage_banner">
        <div className="box homepage_banner_content">
          <div className="homepage_banner__header">
            <Link to="/mainpage" className="logo">
              <img src="./images/logo4.png" alt="logo" />
            </Link>
          </div>
          <div className="homepage_banner__contentBox">
            <h2>Donate Blood Today!</h2>
            <p>Be Hero and save a Life! Every Drop Will Help!</p>

            <Link to="/login" className="btn">
              Get Help Together
            </Link>
          </div>
        </div>
        {/* <!-- ============================================================================ --> */}

        {/* <!-- Image starts Here --> */}
        <div className="box images">
          {/* <div className="homepage_banner__header_images">
              <ul>
                {user ? (
                  <>
                    <li>
                      Welcome <span>{user?.name}</span>
                    </li>
                    <li>
                      <Link onClick={login}>Logout</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to={!user && "/login"}>Login</Link>
                    </li>
                    <li>
                      <Link to={!user && "/register"} className="signup_btn">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div> */}

          <div className="imagecontainerBox">
            <img src="./banner2.png" alt="mainpage_img" />
          </div>
        </div>
        {/* <!-- Image Ends  Here --> */}
        {/* <!-- ============================================================================ --> */}
      </div>
    </>
  );
};

export default Sample;
