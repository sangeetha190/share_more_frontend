import React from "react";
import "../../../../assets/css/loginandregister.css";
// import "../assets/css/app.css";
const DonorRegister = () => {
  return (
    <div>
      <div className="loginbox_container">
        <div className="container-fluid">
          <div className="row no-gutter">
            {/* <!-- The image half --> */}
            <div className="col-md-4 d-none d-md-flex login_image p-0">
              <img src="../images/donars.jpg" alt="test" width="100%" />
            </div>

            {/* <!-- The content half --> */}
            <div className="col-md-8  bg-light login_form_box">
              <div className="login  py-5">
                {/* <!-- Demo content--> */}
                <div className="container">
                  <div className="row">
                    <div className=" mx-auto px-6">
                      <h3 className="display-4">Welcome Bank</h3>
                      <p className="text-muted mb-4">
                        Create a login split page using Bootstrap 4.
                      </p>
                      <form>
                        <div className="mb-3">
                          <label
                            for="exampleInputEmail1"
                            className="form-label"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                          />
                          <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                          </div>
                        </div>
                        <div className="mb-3">
                          <label
                            for="exampleInputPassword1"
                            className="form-label"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                          />
                        </div>
                        <div className="mb-3 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                          />
                          <label
                            className="form-check-label"
                            for="exampleCheck1"
                          >
                            Check me out
                          </label>
                        </div>
                        <button className="btn">
                          <span>Get started</span>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorRegister;
