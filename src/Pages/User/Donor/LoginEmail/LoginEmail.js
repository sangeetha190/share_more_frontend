import React from "react";
import "../../../../assets/css/loginandregister.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../../axios";
import { handleLogin } from "../../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const LoginEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const donor_response = await axios.post(`/donor/login`, {
        email: values.email,
        password: values.password,
      });

      console.log(donor_response.data.token);

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
        <div className="loginbox_container">
          <div className="container-fluid">
            <div className="row no-gutter">
              {/* <!-- The image half --> */}
              <div className="col-md-5 d-none d-md-flex login_image p-0 pt-5 mt-3">
                <img src="../images/donars.jpg" alt="test" width="100%" />
              </div>

              {/* <!-- The content half --> */}
              <div className="col-md-7  bg-light login_form_box">
                <div className="login  py-5">
                  {/* <!-- Demo content--> */}
                  <div className="container">
                    <div className="row">
                      <div className=" mx-auto px-4">
                        <h3 className="display-7">Welcome Back!</h3>
                        {/* <p className="text-muted mb-4">
                        Create a login split page using Bootstrap 4.
                      </p> */}
                        <Formik
                          initialValues={{
                            email: "",
                            password: "",
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
                                    <label
                                      htmlFor="email"
                                      className="form-label"
                                    >
                                      Email address
                                    </label>
                                    <Field
                                      type="email"
                                      name="email"
                                      className={`form-control ${
                                        touched.email && errors.email
                                          ? "is-invalid"
                                          : touched.email
                                          ? "is-valid"
                                          : ""
                                      }`}
                                    />
                                    <ErrorMessage
                                      name="email"
                                      component="div"
                                      className="text-danger"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="password"
                                      className="form-label"
                                    >
                                      Password
                                    </label>
                                    <Field
                                      type="password"
                                      name="password"
                                      className={`form-control ${
                                        touched.password && errors.password
                                          ? "is-invalid"
                                          : touched.password
                                          ? "is-valid"
                                          : ""
                                      }`}
                                    />
                                    <ErrorMessage
                                      name="password"
                                      component="div"
                                      className="text-danger"
                                    />
                                    <div id="emailHelp" className="form-text">
                                      Password must be at least 8 characters and
                                      contain at least one number and one
                                      symbol.
                                    </div>
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
        </div>
      </div>
    </div>
  );
};

export default LoginEmail;
