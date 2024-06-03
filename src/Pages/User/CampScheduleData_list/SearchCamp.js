import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../axios";
import { getUser, handleLogin } from "../../../slices/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Notify from "../../../components/Notify/Notify";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/Paginattion";
import locationImg from "../../../assets/images/banner_image/location.png";
import Footer from "../../../components/Footer/Footer";
// Import Pagination component

const PAGE_SIZE = 10; // Number of users per page

const SearchCamp = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [searchResults, setSearchResults] = useState({ data: [] });
  const [searched, setSearched] = useState(false);
  // const [formValues, setFormValues] = useState(null); // Declare formValues state

  const userStatus = useSelector(getUser);
  const [currentPage, setCurrentPage] = useState(1);

  const initialValues = {
    state: "",
    district: "",
  };

  const validationSchema = Yup.object({
    state: Yup.string().required("State is required"),
    district: Yup.string().required("District is required"),
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
      // const token = localStorage.getItem("token");
      // if (!token) {
      //   throw new Error("No token found. Please log in again.");
      // }
      const data_response = await axios.post(`/camp_schedule/search_camp`, {
        state: values.state,
        district: values.district,
      });
      setSearchResults(data_response);
      setSearched(true);
    } catch (error) {
      console.error("Error during form submission:", error);

      if (error.response && error.response.status === 401) {
        setErrors({
          password: "Unauthorized access. Please check your credentials.",
        });
      } else {
        setErrors({ password: "An error occurred. Please try again." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination logic
  const indexOfLastUser = currentPage * PAGE_SIZE;
  const indexOfFirstUser = indexOfLastUser - PAGE_SIZE;
  const currentSearchResults = searchResults.data.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const totalPages = Math.ceil(searchResults.data.length / PAGE_SIZE);

  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !userStatus) {
      dispatch(handleLogin(token));
    }
  });

  return (
    <>
      <div className="mt-5 pt-5 container">
        <div className="card pt-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-5">
                <img src={locationImg} alt="ttest" className="w-100" />
              </div>
              <div className="col-md-7">
                <h4>Location Based Camp Details</h4>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, actions) => {
                    // setFormValues(values);
                    handleSubmit(values, actions);
                  }}
                >
                  {({
                    touched,
                    errors,
                    isSubmitting,
                    resetForm,
                    setFieldValue,
                    values,
                  }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-12">
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
                        <div className="col-md-12">
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
                        className="btn btn-primary mt-3"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Search"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary mt-2 me-2 mx-2  mt-3"
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
              </div>
            </div>

            <ToastContainer />
            {searched && (
              <div className="container pt-4">
                <div className="row">
                  <div className="d-flex justify-content-between">
                    <h5 className="px-2">Camp Details</h5>
                    <div>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </div>
                  <div className="table-responsive pb-2">
                    <table className="table table-bordered table-hover">
                      <thead className="thead-dark red_bg text-white">
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Start Date</th>
                          <th scope="col">End Date</th>
                          <th scope="col">Organizer</th>
                          <th scope="col">Address</th>
                          <th scope="col">Start Time</th>
                          <th scope="col">End Time</th>
                          <th scope="col">Approx_Donor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentSearchResults.length === 0 ? (
                          <tr>
                            <td colSpan="8" className="text-center fs-5">
                              😕 Sorry, No Details Found.
                            </td>
                          </tr>
                        ) : (
                          currentSearchResults.map((camp_details, index) => (
                            <tr key={index}>
                              <th scope="row">
                                {indexOfFirstUser + index + 1}
                              </th>
                              <td>
                                {new Date(
                                  camp_details.start_date
                                ).toLocaleDateString(undefined, {
                                  weekday: "long", // to get the full name of the day
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </td>
                              <td>
                                {new Date(
                                  camp_details.end_date
                                ).toLocaleDateString(undefined, {
                                  weekday: "long", // to get the full name of the day
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </td>
                              <td>{camp_details.organizer}</td>
                              <td>{camp_details.address}</td>
                              <td>{camp_details.start_time}</td>
                              <td>{camp_details.end_time}</td>
                              <td>{camp_details.approx_donor}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchCamp;
