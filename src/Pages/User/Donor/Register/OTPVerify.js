import React from "react";
import "../../../../assets/css/loginandregister.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../../axios";
import { handleLogin } from "../../../../slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const OTPVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get email from URL parameters
  const validationSchema = Yup.object().shape({
    otp: Yup.string().required("OTP is required"),
  });
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const donor_response = await axios.post(`/donor/verify_otp`, {
        email,
        otp: values.otp,
      });

      console.log(donor_response, "otp datsssss");

      localStorage.setItem("token", donor_response.data.token);
      dispatch(handleLogin(donor_response.data.token));

      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (error.response.data.msg === "User Not Registered") {
          // Display the specific error message in the UI
          setErrors({ email: "User not registered" });
        } else {
          setErrors({ password: "Invalid password" });
        }
      } else {
        setErrors({ password: "check check" });
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <div>
        <div className="wrapper">
          <div className="authentication-forgot d-flex align-items-center justify-content-center">
            <div className="card forgot-box">
              <div className="card-body">
                <div className="px-3">
                  <div className="text-center">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/024/300/164/original/check-mark-security-icon-3d-lock-icon-png.png"
                      width="100"
                      alt="lock"
                    />
                  </div>
                  <h4 className="mt-1 font-weight-bold">
                    <b>Verify OTP</b>
                  </h4>
                  <Formik
                    initialValues={{
                      otp: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({
                      isSubmitting,
                      isValid,
                      touched,
                      errors,
                      resetForm,
                    }) => (
                      <Form>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                Enter the OTP
                              </label>
                              <Field
                                type="text"
                                name="otp"
                                className={`form-control ${
                                  touched.otp && errors.otp
                                    ? "is-invalid"
                                    : touched.otp
                                    ? "is-valid"
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                name="otp"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary mt-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                        {/* Clear button */}
                        <button
                          type="button"
                          className="btn btn-secondary mt-2 me-2 mx-2"
                          onClick={() => {
                            resetForm();
                          }}
                        >
                          Clear
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
