import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../axios";

const LookingForBlood = () => {
  const validationSchema = Yup.object().shape({
    bloodType: Yup.string().required("Blood type is required"),
    state: Yup.string().required("State is required"),
    district: Yup.string().required("District is required"),
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [searchResults, setSearchResults] = useState({ data: [] });
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    // Dummy data for states
    const dummyStates = [
      { id: 1, name: "State 1" },
      { id: 2, name: "State 2" },
      { id: 3, name: "pondicherry" },
    ];

    // Dummy data for districts
    const dummyDistricts = [
      { id: 1, name: "District 1", state: "State 1" },
      { id: 2, name: "District 2", state: "State 2" },
      { id: 3, name: "pondicherry", state: "pondicherry" },
    ];

    // Set states and districts using dummy data
    setStates(dummyStates);
    setDistricts(dummyDistricts);
  }, []);

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const bloodSearchResult_data = await axios.post(`/blood/search`, {
        bloodType: values.bloodType,
        state: values.state,
        district: values.district,
      });
      setSearchResults(bloodSearchResult_data);
      setSearched(true);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="loginbox_container">
        <div className="container-fluid">
          <div className="row no-gutter">
            {/* Content half */}
            <div className="col-md-12  bg-light login_form_box">
              <div className="login  py-5">
                <div className="container">
                  <div className="row">
                    <div className=" mx-auto px-4">
                      <h3 className="display-7">Looking for Blood</h3>
                      <Formik
                        initialValues={{
                          bloodType: "",
                          state: "",
                          district: "",
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
                              <div className="col-md-4">
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
                              <div className="col-md-4">
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
                            </div>
                            <button
                              type="submit"
                              className="btn btn-primary mt-2"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Searching..." : "Search"}
                            </button>
                            {/* Clear button */}
                            <button
                              type="button"
                              className="btn btn-secondary mt-2 me-2 mx-2"
                              onClick={() => {
                                resetForm();
                                setSearched(false);
                              }}
                            >
                              Clear
                            </button>
                          </Form>
                        )}
                      </Formik>

                      {/* Search results */}
                      {searched && (
                        <div className="container mt-4">
                          <div className="row">
                            {searchResults.data.length === 0 ? (
                              <div className="col-md-12 mb-4">
                                <p>No details found.</p>
                              </div>
                            ) : (
                              searchResults.data.map((donor) => (
                                <div key={donor._id} className="col-md-4 mb-4">
                                  <div className="card">
                                    <div className="card-body">
                                      {/* Display donor information */}
                                      <h5 className="card-title">
                                        {donor.name}
                                      </h5>
                                      <p className="card-text">
                                        Email: {donor.email}
                                      </p>
                                      <p className="card-text">
                                        Contact Number: {donor.contactNumber}
                                      </p>
                                      <p className="card-text">
                                        Blood Type: {donor.bloodType}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
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

export default LookingForBlood;
