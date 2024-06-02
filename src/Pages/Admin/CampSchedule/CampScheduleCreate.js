import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../Layout/Layout";
import axios from "../../../axios";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Notify from "../../../components/Notify/Notify";
import { useNavigate } from "react-router-dom";
const CampScheduleCreate = () => {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  // const [searchResults, setSearchResults] = useState({ data: [] });
  // const [searched, setSearched] = useState(false);
  const initialValues = {
    start_date: "",
    end_date: "",
    organizer: "",
    address: "",
    state: "",
    district: "",
    start_time: "",
    end_time: "",
    approx_donor: "",
  };

  const validationSchema = Yup.object().shape({
    start_date: Yup.string().required("Start date is required"),
    end_date: Yup.string().required("End date is required"),
    organizer: Yup.string().required("Organizer is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    district: Yup.string().required("District is required"),
    start_time: Yup.string().required("Time is required"),
    end_time: Yup.string().required("Time is required"),
    approx_donor: Yup.number()
      .required("Approx. donor is required")
      .positive("Approx. donor must be a positive number"),
  });
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
  const convertTimeTo12HourFormat = (timeString) => {
    const [hour, minute] = timeString.split(":");
    let hours = parseInt(hour);
    const minutes = parseInt(minute);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert hour to 12-hour format
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )} ${ampm}`;
  };
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
    try {
      const formattedValues = {
        ...values,
        start_time: convertTimeTo12HourFormat(values.start_time),
        end_time: convertTimeTo12HourFormat(values.end_time),
      };
      const response = await axios.post(
        "/camp_schedule/create",
        formattedValues
      );
      console.log(response.data);
      // =============== dynamic ==============
      // toast(
      //   <Notify
      //     message="Thank you. come Again"
      //     imgUrl="https://cdn3d.iconscout.com/3d/premium/thumb/blood-drop-5075241-4235159.png?f=webp"
      //   />
      // );
      // navigate("/camp_schedule_list");

      // Navigate to /camp_schedule_list with state containing the toast message and image URL
      navigate("/camp_schedule_list", {
        state: {
          message: "Camp Schedule Created Successfully",
          imgUrl:
            "https://cdn3d.iconscout.com/3d/premium/thumb/blood-drop-5075241-4235159.png?f=webp",
        },
      });
      resetForm();
    } catch (error) {
      console.error("There was an error creating the camp schedule!", error);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Layout />
      <div className="page-wrapper">
        <div className="page-content">
          <div className=" justify-content-between flex-column flex-md-row mb-3 mb-md-1 w-100">
            <div className="row">
              <div className="col-xl-12 mx-auto">
                <div className="card">
                  <div className="card-body p-4">
                    <h4 className="display-7">Create Camp Schedule</h4>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {({
                        isSubmitting,
                        touched,
                        errors,
                        resetForm,
                        setFieldValue,
                      }) => (
                        <Form>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <div className="form-group">
                                  <label
                                    htmlFor="start_date"
                                    className="form-label"
                                  >
                                    Start Date
                                  </label>
                                  <Field
                                    type="date"
                                    name="start_date"
                                    className={`form-control ${
                                      touched.start_date && errors.start_date
                                        ? "is-invalid"
                                        : touched.start_date
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="start_date"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <div className="form-group">
                                  <label
                                    htmlFor="end_date"
                                    className="form-label"
                                  >
                                    End Date
                                  </label>
                                  <Field
                                    type="date"
                                    name="end_date"
                                    className={`form-control ${
                                      touched.end_date && errors.end_date
                                        ? "is-invalid"
                                        : touched.end_date
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="end_date"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <div className="form-group">
                                  <label
                                    htmlFor="organizer"
                                    className="form-label"
                                  >
                                    Organizer
                                  </label>
                                  <Field
                                    type="text"
                                    name="organizer"
                                    className={`form-control ${
                                      touched.organizer && errors.organizer
                                        ? "is-invalid"
                                        : touched.organizer
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="organizer"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <div className="form-group">
                                  <label
                                    htmlFor="address"
                                    className="form-label"
                                  >
                                    Address
                                  </label>
                                  <Field
                                    type="text"
                                    name="address"
                                    className={`form-control ${
                                      touched.address && errors.address
                                        ? "is-invalid"
                                        : touched.address
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="address"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            {/* <div className="col-md-6">
                              <div className="mb-3">
                                <div className="form-group">
                                  <label htmlFor="state">State</label>
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
                                  />
                                  <ErrorMessage
                                    name="state"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                            </div> */}
                            <div className="col-md-6">
                              <div className="mb-3">
                                <div className="form-group">
                                  <label htmlFor="state">State</label>
                                  <Field
                                    as="select"
                                    name="state"
                                    className={`form-select ${
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
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <div className="form-group">
                                  <label htmlFor="district">District</label>
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
                          </div>

                          <div className="row">
                            <div className="col-md-3">
                              <div className="mb-3">
                                <div className="form-group">
                                  <label
                                    htmlFor="start_time"
                                    className="form-label"
                                  >
                                    Start Time
                                  </label>
                                  <Field
                                    type="time"
                                    name="start_time"
                                    className={`form-select ${
                                      touched.start_time && errors.start_time
                                        ? "is-invalid"
                                        : touched.start_time
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="start_time"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="mb-3">
                                <div className="form-group">
                                  <label
                                    htmlFor="end_time"
                                    className="form-label"
                                  >
                                    End Time
                                  </label>
                                  <Field
                                    type="time"
                                    name="end_time"
                                    className={`form-select ${
                                      touched.end_time && errors.end_time
                                        ? "is-invalid"
                                        : touched.end_time
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="end_time"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <div className="form-group">
                                  <label
                                    htmlFor="approx_donor"
                                    className="form-label"
                                  >
                                    Approx. Donor
                                  </label>
                                  <Field
                                    type="number"
                                    name="approx_donor"
                                    className={`form-select ${
                                      touched.approx_donor &&
                                      errors.approx_donor
                                        ? "is-invalid"
                                        : touched.approx_donor
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="approx_donor"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
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

                    {/* <ToastContainer /> */}
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

export default CampScheduleCreate;
