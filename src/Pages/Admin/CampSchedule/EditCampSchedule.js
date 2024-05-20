import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../Layout/Layout";
import axios from "../../../axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notify from "../../../components/Notify/Notify";
const EditCampSchedule = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const navigate = useNavigate();
  //   const [searchResults, setSearchResults] = useState({ data: [] });
  //   const [searched, setSearched] = useState(false);
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    start_date: "",
    end_date: "",
    organizer: "",
    address: "",
    state: "",
    district: "",
    time: "",
    approx_donor: "",
  });
  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const response = await axios.get(`/camp_schedule/${id}`);
        const donorData = response.data;
        console.log(response.data);

        const formatDateString = (dateString) => {
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };

        const formatTimeString = (timeString) => {
          const [hours, minutes] = timeString.split(":");
          return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
        };

        setInitialValues({
          start_date: donorData.start_date
            ? formatDateString(donorData.start_date)
            : "",
          end_date: donorData.end_date
            ? formatDateString(donorData.end_date)
            : "",
          organizer: donorData.organizer || "",
          address: donorData.address || "",
          state: donorData.state || "",
          district: donorData.district || "",
          time: donorData.time ? formatTimeString(donorData.time) : "",
          approx_donor: donorData.approx_donor || "",
        });
      } catch (error) {
        console.error("Error fetching donor data", error);
      }
    };

    fetchDonorData();
  }, [id]);

  const validationSchema = Yup.object().shape({
    start_date: Yup.string().required("Start date is required"),
    end_date: Yup.string().required("End date is required"),
    organizer: Yup.string().required("Organizer is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    district: Yup.string().required("District is required"),
    time: Yup.string().required("Time is required"),
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

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    // console.log(values);
    try {
      const response = await axios.put(`/camp_schedule/edit/${id}`, values);
      console.log(response.data);
      // =============== dynamic ==============
      toast(
        <Notify
          message="Thank you. come Again"
          imgUrl="https://cdn3d.iconscout.com/3d/premium/thumb/blood-drop-5075241-4235159.png?f=webp"
        />
      );
      navigate("/camp_schedule_list");
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
                    <h4 className="display-7">Edit Camp Schedule</h4>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                      enableReinitialize={true} // Add this line
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
                            <div className="col-md-6">
                              <div className="mb-3">
                                <div className="form-group">
                                  <label htmlFor="time" className="form-label">
                                    Time
                                  </label>
                                  <Field
                                    type="time"
                                    name="time"
                                    className={`form-select ${
                                      touched.time && errors.time
                                        ? "is-invalid"
                                        : touched.time
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="time"
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

export default EditCampSchedule;
