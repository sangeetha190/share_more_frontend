import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notify from "../../../components/Notify/Notify";
const LookingForBlood = () => {
  const validationSchema = Yup.object().shape({
    bloodType: Yup.string().required("Blood type is required"),
    state: Yup.string().required("State is required"),
    district: Yup.string().required("District is required"),
  });
  // const notify = () => toast("Wow so easy!");

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [searchResults, setSearchResults] = useState({ data: [] });
  const [searched, setSearched] = useState(false);
  // const [showPopup, setShowPopup] = useState(false); // Popup visibility state
  // const [showThankYou, setShowThankYou] = useState(false); // Thank you message visibility state

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          "https://api.countrystatecity.in/v1/countries/IN/states",
          {
            method: "GET",
            headers: {
              "X-CSCAPI-KEY":
                "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
            },
          }
        );
        const statesData = await response.json();
        setStates(statesData);
        console.log(statesData);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const selectedStateData = states.find(
          (state) => state.name === selectedState
        );
        const iso2Code = selectedStateData ? selectedStateData.iso2 : "";

        if (iso2Code) {
          const response = await fetch(
            `https://api.countrystatecity.in/v1/countries/IN/states/${iso2Code}/cities`,
            {
              method: "GET",
              headers: {
                "X-CSCAPI-KEY":
                  "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
              },
            }
          );
          const districtsData = await response.json();
          setDistricts(districtsData);
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    if (selectedState) {
      fetchDistricts();
    }
  }, [selectedState, states]);

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
      // toast.success("🦄 Wow so easy!", {
      //   position: "top-right",
      // });
      // =============== static calling ===============
      // toast.success(<Notify />, {
      //   position: "top-right",
      // });
      // =============== dynamic ==============
      toast(
        <Notify
          message="Thank you. come Again"
          imgUrl="https://cdn3d.iconscout.com/3d/premium/thumb/blood-drop-5075241-4235159.png?f=webp"
        />
      ); // Show custom toast notification
      // setShowPopup(true); // Show the popup
      // setShowThankYou(true); // Show the thank you message
      resetForm();
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // useEffect(() => {
  //   if (showPopup) {
  //     const modal = new window.bootstrap.Modal(
  //       document.getElementById("exampleModal")
  //     );
  //     modal.show();
  //     modal._element.addEventListener("hidden.bs.modal", () =>
  //       setShowPopup(false)
  //     );
  //   }
  // }, [showPopup]);

  return (
    <div>
      <div className="mt-5 pt-5 container">
        <div className="card mt-4">
          <div className="card-body">
            <div className="row">
              <div className="mx-auto px-4">
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
                    setFieldValue,
                    values,
                  }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="bloodType" className="form-label">
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
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                setFieldValue("state", selectedValue);
                                setSelectedState(selectedValue);
                              }}
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
                            <label htmlFor="district" className="form-label">
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
                              <option value="" disabled>
                                Select District
                              </option>
                              {districts.map((district) => (
                                <option key={district.id} value={district.name}>
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
                {/* <button onClick={notify}>Notify!</button> */}
                <ToastContainer />
                {/* {showThankYou && (
                        <div className="alert alert-success mt-4" role="alert">
                          Thank you, we will contact you soon.
                        </div>
                      )} */}
                {/* test */}

                {searched && (
                  <div className="container mt-5 pt-3">
                    <div className="row">
                      {searchResults.data.length === 0 ? (
                        <div className="col-md-12 mb-4">
                          <p>No details found.</p>
                        </div>
                      ) : (
                        searchResults.data.map((donor) => (
                          <div key={donor._id} className="col-md-4 mb-4">
                            <div className="card">
                              <div class="profile-card__img">
                                <img
                                  src="https://www.freepnglogos.com/uploads/blood-drop-png/blood-drop-blood-donation-drop-vector-graphic-pixabay-9.png"
                                  alt="Blood Type"
                                  className="w-100"
                                />
                              </div>
                              <div className="card-body LF_blood_container">
                                <h5 className="card-title">
                                  <b>{donor.name}</b>
                                </h5>
                                <p className="card-text">
                                  Email: {donor.email}
                                </p>
                                <p className="card-text">
                                  Contact Number: {donor.contactNumber}
                                </p>
                                <p className="card-text">
                                  Blood Type: <b>{donor.bloodType}</b>
                                </p>
                                <button className="btn btn-primary mt-2">
                                  Call
                                </button>
                                <button className="btn btn-primary mt-2 mx-2">
                                  SMS
                                </button>
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
  );
};

export default LookingForBlood;
