import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notify from "../../../components/Notify/Notify";

const ShareFood = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [searchResults, setSearchResults] = useState({ data: [] });
  const [searched, setSearched] = useState(false);
  const [formValues, setFormValues] = useState(null); // Declare formValues state

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const isFutureDate = (date) => {
    const today = new Date();
    return date >= today;
  };

  const initialValues = {
    appointment: "",
    state: "",
    district: "",
    reminder: "", // Default value
    contactNumber: "",
    max_member: "",
  };

  const validationSchema = Yup.object({
    appointment: Yup.date()
      .required("Appointment date is required")
      .nullable()
      .test(
        "is-future",
        "The appointment date must be in the future.",
        isFutureDate
      ),
    reminder: Yup.string().required("Reminder is required"),
    state: Yup.string().required("State is required"),
    district: Yup.string().required("District is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact number must be exactly 10 digits")
      .required("Contact number is required"),
    max_member: Yup.string().required("Max Memeber is required"),
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

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    console.log(values, "Values.........");
    // ["email", "sms", "none"],
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      const data_response = await axios.post(
        `/share_food/charity`,
        {
          state: values.state,
          district: values.district,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      setSearchResults(data_response);
      console.log(data_response);
      setSearched(true);
    } catch (error) {
      console.error("Error during form submission:", error); // Log the error

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
  // const handleClear = () => {
  //   setSearched(false);
  //   setSearchResults({ data: [] });
  // };
  const BookingAppointment = async (values, refer_id) => {
    console.log(values, refer_id, "Values.........");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const donor_response = await axios.post(
        `/share_food/create`,
        {
          date: values.appointment,
          state: values.state,
          district: values.district,
          maxMember: values.max_member,
          contactNumber: values.contactNumber,
          action: values.reminder,
          charityId: refer_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(donor_response);

      // Display a notification to the user
      toast(
        <Notify
          message="Your appointment has been booked successfully."
          imgUrl="https://cdn3d.iconscout.com/3d/premium/thumb/blood-drop-5075241-4235159.png?f=webp"
          progressBarColor="red"
        />
      );
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setSearched(true);
      // setSearchResults({ data: [] });
    }
  };

  return (
    <div className="mt-5 pt-5 container">
      <div className="card pt-4">
        <div className="card-body">
          <h4>Share Your Day</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            // onSubmit={handleSubmit}
            onSubmit={(values, actions) => {
              setFormValues(values); // Update formValues state
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
                  <div className="col-3">
                    <label htmlFor="appointment" className="form-label">
                      Appointment Date:
                    </label>
                    <Field
                      type="date"
                      id="appointment"
                      name="appointment"
                      className={`form-control ${
                        touched.appointment && errors.appointment
                          ? "is-invalid"
                          : touched.appointment
                          ? "is-valid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="appointment"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-md-3">
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
                  <div className="col-md-3">
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
                  <div className="col-3">
                    <label htmlFor="reminder" className="form-label">
                      Select Method:
                    </label>
                    <Field
                      as="select"
                      name="reminder"
                      className={`form-control ${
                        touched.reminder && errors.reminder
                          ? "is-invalid"
                          : touched.reminder
                          ? "is-valid"
                          : ""
                      }`}
                    >
                      <option value="" disabled>
                        Select...
                      </option>
                      <option value="collect">Collect</option>
                      <option value="visit">Visit</option>
                    </Field>
                    <ErrorMessage
                      name="reminder"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label">
                          Contact Number
                        </label>
                        <Field
                          type="text"
                          name="contactNumber"
                          className={`form-control ${
                            touched.contactNumber && errors.contactNumber
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

                    <div className="col-3">
                      <div className="mb-3">
                        <label htmlFor="max_member" className="form-label">
                          Max Memeber
                        </label>
                        <Field
                          type="text"
                          name="max_member"
                          className={`form-control ${
                            touched.max_member && errors.max_member
                              ? "is-invalid"
                              : touched.max_member
                              ? "is-valid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="max_member"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button> */}
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
          {/* Notify container */}
          <ToastContainer />

          {/* <div className="table-responsive pb-2">
            <table className="table table-bordered table-hover ">
              <thead className="thead-dark red_bg text-white">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Place</th>
                  <th scope="col">Acction</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.data.map((donor, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{donor.name}</td>
                    <td>{donor.state}</td>
                    <td>{donor._id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
          {/* Searched Data */}
          {searched && (
            <div className="container pt-4">
              <div className="row">
                <h5 className="px-2">Charity Details</h5>
                <div className="table-responsive pb-2">
                  <table className="table table-bordered table-hover">
                    <thead className="thead-dark red_bg text-white">
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Charity Name</th>
                        <th scope="col">Place</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.data.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No details found.
                          </td>
                        </tr>
                      ) : (
                        searchResults.data.map((data, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td className="text-capitalize">{data.name}</td>
                            <td>{data.state}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-primary me-2 mx-2"
                                onClick={() => {
                                  BookingAppointment(formValues, data._id); // Pass the form values and donor object to the function
                                }}
                              >
                                Select The Charity
                              </button>
                            </td>
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
  );
};

export default ShareFood;
