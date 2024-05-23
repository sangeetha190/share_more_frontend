import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser, handleLogin } from "../../../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/app.css";

const Login = () => {
  const user_stauts = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const user_response = await axios.post(`/admin/login`, {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", user_response.data.token);
      dispatch(handleLogin(user_response.data.token));

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (error.response.data.msg === "User Not Registered") {
          // Display the specific error message in the UI
          setErrors({ email: "User not registered" });
        } else {
          setErrors({ password: "Invalid password" });
        }
      } else {
        setErrors({ password: "An error occurred. Please try again later." });
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className="container">
        <button className="btn btn-primary px-5 position-absoulte right-0">
          <Link to={"/"} className="text-white">
            {" "}
            Back to Homepage
          </Link>
        </button>
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
                    <b>Welcome Back</b>
                  </h4>
                  <p className="text-muted">
                    Enter your registered email ID and password
                  </p>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting, touched, errors }) => (
                      <Form>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email address
                          </label>
                          <Field
                            type="email"
                            name="email"
                            className={`form-control ${
                              touched.email && !errors.email ? "is-valid" : ""
                            } ${
                              touched.email && errors.email ? "is-invalid" : ""
                            }`}
                            id="email"
                            placeholder="name@example.com"
                          />
                          <ErrorMessage
                            name="email"
                            component="p"
                            className="text-danger"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <Field
                            type="password"
                            name="password"
                            className={`form-control ${
                              touched.password && !errors.password
                                ? "is-valid"
                                : ""
                            } ${
                              touched.password && errors.password
                                ? "is-invalid"
                                : ""
                            }`}
                            id="password"
                            placeholder="Password"
                          />
                          <ErrorMessage
                            name="password"
                            component="p"
                            className="text-danger"
                          />
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            className="btn btn-primary px-5"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Logging in..." : "Login"}
                          </button>
                          <div>
                            <Link
                              to={!user_stauts && "/register"}
                              className="signup_btn_text"
                            >
                              Create an account
                            </Link>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
