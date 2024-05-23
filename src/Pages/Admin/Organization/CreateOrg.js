import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../Layout/Layout";
import axios from "../../../axios";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Notify from "../../../components/Notify/Notify";
import { useNavigate } from "react-router-dom";
const CreateOrg = () => {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  // const [searchResults, setSearchResults] = useState({ data: [] });
  // const [searched, setSearched] = useState(false);
  const initialValues = {
    name: "",
    state: "",
    district: "",
    type: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    state: Yup.string().required("State is required"),
    district: Yup.string().required("District is required"),
    type: Yup.string().required("Type is required"),
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
    console.log(values, "all values");
    try {
      const response = await axios.post("/organization/create", values);
      console.log(response, values);

      navigate("/org_list", {
        state: {
          message: "Organization Created Successfully",
          imgUrl:
            "https://cdn3d.iconscout.com/3d/premium/thumb/blood-drop-5075241-4235159.png?f=webp",
        },
      });
      console.log(response);
      resetForm();
    } catch (error) {
      console.error("There was an error creating the organization!", error);
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
                    <h4 className="display-7">Create Oranganization</h4>
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
                                  <label htmlFor="name" className="form-label">
                                    Organization Name
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
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <div className="form-group">
                                  <label htmlFor="type" className="form-label">
                                    Organization Type
                                  </label>
                                  <Field
                                    as="select"
                                    name="type"
                                    className={`form-select ${
                                      touched.type && errors.type
                                        ? "is-invalid"
                                        : touched.type
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  >
                                    <option value="" disabled>
                                      Select Type
                                    </option>
                                    <option value="charity">Charity</option>
                                    <option value="hospital">Hospital</option>
                                    <option value="blood bank">
                                      Blood Bank
                                    </option>
                                  </Field>
                                  <ErrorMessage
                                    name="type"
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
                          <button
                            type="submit"
                            className="btn btn-primary mt-2"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </button>
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

export default CreateOrg;
