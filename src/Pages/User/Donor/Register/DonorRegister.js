import React, { useEffect, useState } from "react";
import "../../../../assets/css/loginandregister.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../../axios";
import { handleLogin } from "../../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const DonorRegister = () => {
  // const user_stauts = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
        "Password must contain at least one number and one symbol"
      ),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact number must be exactly 10 digits")
      .required("Contact number is required"),
    age: Yup.number().min(18, "Should be above 18").required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    bloodType: Yup.string().required("Blood type is required"),
    state: Yup.string().required("State is required"),
    district: Yup.string().required("District is required"),
    marriedStatus: Yup.string().required("Married status is required"),
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  // const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    // Dummy data for states
    const dummyStates = [
      { id: 1, name: "State 1" },
      { id: 2, name: "State 2" },
      // Add more states as needed
    ];

    // Dummy data for districts
    const dummyDistricts = [
      { id: 1, name: "District 1", state: "State 1" },
      { id: 2, name: "District 2", state: "State 1" },
      { id: 3, name: "District 3", state: "State 2" },
      // Add more districts as needed
    ];

    // Set states and districts using dummy data
    setStates(dummyStates);
    setDistricts(dummyDistricts);
  }, []);
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const donor_response = await axios.post(`/donor/signup`, {
        name: values.name,
        email: values.email,
        password: values.password,
        contactNumber: values.contactNumber,
        age: values.age,
        gender: values.gender,
        state: values.state,
        district: values.district,
        bloodType: values.bloodType,
      });

      console.log(donor_response.data.token);

      localStorage.setItem("token", donor_response.data.token);
      dispatch(handleLogin(donor_response.data.token));

      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.message === "Email already exists") {
          setErrors({ email: "Email already exists" });
        }
      } else if (error.response && error.response.status === 401) {
        if (error.response.data.msg === "User Not Registered") {
          setErrors({ email: "User not registered" });
        } else {
          setErrors({ password: "Invalid password" });
        }
      } else {
        setErrors({ password: "An error occurred. Please try again later." });
      }
    }
  };

  return (
    <div>
      <div className="loginbox_container">
        <div className="container-fluid">
          <div className="row no-gutter">
            {/* <!-- The image half --> */}
            <div className="col-md-4 d-none d-md-flex login_image p-0 pt-5 mt-3">
              <img src="../images/donars.jpg" alt="test" width="100%" />
            </div>

            {/* <!-- The content half --> */}
            <div className="col-md-8  bg-light login_form_box">
              <div className="login  py-5">
                {/* <!-- Demo content--> */}
                <div className="container">
                  <div className="row">
                    <div className=" mx-auto px-4">
                      <h3 className="display-7">Donor Registration</h3>
                      {/* <p className="text-muted mb-4">
                        Create a login split page using Bootstrap 4.
                      </p> */}
                      <Formik
                        initialValues={{
                          name: "",
                          email: "",
                          password: "",
                          contactNumber: "",
                          age: "",
                          gender: "",
                          bloodType: "",
                          state: "",
                          district: "",
                          marriedStatus: "",
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
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="name" className="form-label">
                                    Name
                                  </label>
                                  <Field
                                    type="text"
                                    name="name"
                                    className={`form-control ${
                                      touched.name && errors.name
                                        ? "is-invalid"
                                        : touched.name
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="email" className="form-label">
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
                              <div className="col-md-6">
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
                                    contain at least one number and one symbol.
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="contactNumber"
                                    className="form-label"
                                  >
                                    Contact Number
                                  </label>
                                  <Field
                                    type="text"
                                    name="contactNumber"
                                    className={`form-control ${
                                      touched.contactNumber &&
                                      errors.contactNumber
                                        ? "is-invalid"
                                        : touched.contactNumber
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="contactNumber"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="mb-3">
                                  <label htmlFor="age" className="form-label">
                                    Age
                                  </label>
                                  <Field
                                    type="number"
                                    name="age"
                                    className={`form-control ${
                                      touched.age && errors.age
                                        ? "is-invalid"
                                        : touched.age
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="age"
                                    component="div"
                                    className="text-danger"
                                  />
                                  <div id="emailHelp" className="form-text">
                                    Should be above 18.
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="mb-3">
                                  <label
                                    htmlFor="gender"
                                    className="form-label"
                                  >
                                    Gender
                                  </label>
                                  <Field
                                    as="select"
                                    name="gender"
                                    className={`form-control ${
                                      touched.gender && errors.gender
                                        ? "is-invalid"
                                        : touched.gender
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  >
                                    <option value="" disabled>
                                      Select...
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                  </Field>
                                  <ErrorMessage
                                    name="gender"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="mb-3">
                                  <label
                                    htmlFor="bloodType"
                                    className="form-label"
                                  >
                                    Blood Type
                                  </label>
                                  <Field
                                    as="select"
                                    name="bloodType"
                                    className={`form-control ${
                                      touched.bloodType && errors.bloodType
                                        ? "is-invalid"
                                        : touched.bloodType
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  >
                                    <option value="" disabled>
                                      Select...
                                    </option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                  </Field>
                                  <ErrorMessage
                                    name="bloodType"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label htmlFor="state" className="form-label">
                                    State
                                  </label>
                                  <Field
                                    as="select"
                                    name="state"
                                    className={`form-control ${
                                      touched.state && errors.state
                                        ? "is-invalid"
                                        : touched.state
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  >
                                    <option value="" disabled>
                                      Select State
                                    </option>
                                    {states.map((state) => (
                                      <option key={state.id} value={state.name}>
                                        {state.name}
                                      </option>
                                    ))}
                                  </Field>
                                  <ErrorMessage
                                    name="state"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="district"
                                    className="form-label"
                                  >
                                    District
                                  </label>
                                  <Field
                                    as="select"
                                    name="district"
                                    className={`form-select ${
                                      touched.district && errors.district
                                        ? "is-invalid"
                                        : touched.district
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  >
                                    {/* districts */}
                                    <option value="" disabled>
                                      Select District
                                    </option>
                                    {districts.map((district) => (
                                      <option
                                        key={district.id}
                                        value={district.name}
                                      >
                                        {district.name}
                                      </option>
                                    ))}
                                  </Field>
                                  <ErrorMessage
                                    name="district"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="mb-3">
                                  <label
                                    htmlFor="marriedStatus"
                                    className="form-label"
                                  >
                                    Married Status
                                  </label>
                                  <Field
                                    as="select"
                                    name="marriedStatus"
                                    className={`form-control ${
                                      touched.marriedStatus &&
                                      errors.marriedStatus
                                        ? "is-invalid"
                                        : touched.marriedStatus
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  >
                                    <option value="" disabled>
                                      Select...
                                    </option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                  </Field>
                                  <ErrorMessage
                                    name="marriedStatus"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* <button
                              type="submit"
                              className="btn btn-primary mt-2"
                              disabled={isSubmitting || !isValid}
                            >
                              {isSubmitting ? "Submitting..." : "Submit"}
                            </button> */}
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
  );
};

export default DonorRegister;
