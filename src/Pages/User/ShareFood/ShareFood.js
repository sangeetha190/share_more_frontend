import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Notify from "../../../components/Notify/Notify";
import foodImg from "../../../assets/images/banner_image/food_donation.png";
import food_icon from "../../../assets/images/banner_image/food_icon.png";
import Footer from "../../../components/Footer/Footer";
import foodBannerImg from "../../../assets/images/banner_image/food_banner1.png";
// Import Pagination component

const ShareFood = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [searchResults, setSearchResults] = useState({ data: [] });
  const [searched, setSearched] = useState(false);
  const [formValues, setFormValues] = useState(null); // Declare formValues state
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState({}); // Track loading state for each button
  const [isToastDisplayed, setIsToastDisplayed] = useState(false);
  // const history = useHistory(); // Initialize useHistory hook
  // const dispatch = useDispatch();
  // const history = useHistory();
  const navigate = useNavigate();
  const handleToastClose = () => {
    navigate("/all_history");
  };
  const isFutureDate = (date) => {
    const today = new Date();
    return date >= today;
  };
  console.log(loading);
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
  const BookingAppointment = async (values, refer_id, index, resetForm) => {
    setLoading(true); // Set loading to true when the process starts
    setButtonLoading((prev) => ({ ...prev, [index]: true }));
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
          imgUrl={food_icon}
          progressBarColor="red"
        />
      );

      setFormValues(null);
      setSearchResults({ data: [] });
      setSearched(false);
      setIsToastDisplayed(true);
      // resetForm(); // Reset the form
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setSearched(true);
      setButtonLoading((prev) => ({ ...prev, [index]: false }));
    }
  };
  useEffect(() => {
    if (isToastDisplayed) {
      const unlisten = () => {
        setIsToastDisplayed(false);
      };

      return unlisten;
    }
  }, [isToastDisplayed]);
  return (
    <>
      <div className="pt-5 ">
        <img
          src={foodBannerImg}
          alt="blood_camp_image"
          className="w-100 h-100"
          style={{ objectFit: "contain", marginTop: "25px" }}
        />
      </div>
      {/* starts */}
      <div className="container">
        <div className="px-md-5 mx-md-5  text-center">
          <div className=" my-4">
            <h3 className="mt-4 title_food_color">
              {" "}
              How Can We Do This, Together?
            </h3>

            <p className="fs-6 mt-2">
              Celebrations are always more special, it’s more special if you
              celebrate your special moments along with needy. Register with us,
              Let’s celebrate your special moments together.
            </p>
            <button className="btn btn-primary">
              <i className="fa-solid fa-heart"></i> Donate Food
            </button>
          </div>
        </div>

        {/* explain starts */}
        <section className="">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4 col-sm-6">
                <div className="card p-4 dashed_border">
                  {/* <div className="icon">
                    <i className="fa fa-users" />
                  </div> */}
                  <h5 className="mb-2">1. Register</h5>
                  <p className="fs-6">
                    Share the Details of Your Special Day and Choose the Nearest
                    Place to Your Location to Arrange Excess Food. You can
                    select whether we need to collect the food or if you will be
                    visiting the donation site.
                  </p>
                  {/* <p>
                    Please share with us the details of your special day, and we
                    will help you find the nearest place to your location to
                    arrange for any excess food. You can select whether we need
                    to collect the food or if you will be visiting the donation
                    site.
                  </p> */}
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 ">
                <div className="card p-4 dashed_border">
                  {/* <div className="icon">
                    <i className="fa fa-heart" />
                  </div> */}
                  <h5>2. Choose the Charity</h5>
                  <p className="fs-6">
                    Based on your location, we will display the charity details,
                    and you can 'select the charity'. After registration, a
                    unique ID will be shared with you. The 'SM' volunteer team
                    will then get in touch with you to confirm the type of food
                    and other details a few days before the event date.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 pe-2">
                <div className="card p-4 dashed_border">
                  <div className="icon">
                    {/* <i className="fa fa-star" /> */}
                  </div>
                  <h5>3. Distributing to Needy</h5>
                  <p className="fs-6">
                    Our volunteer will examine the food carefully to ensure it
                    is in good condition and safe for consumption. If it meets
                    our quality standards, we will distribute it to the needy
                    with love.
                  </p>
                </div>
              </div>
              {/* <div className="col-lg-3 col-sm-6">
                <div className="single-fun-fact">
                  <div className="icon">
                    <i className="fa fa-download" />
                  </div>
                  <h3>+</h3>
                  <p>Donation</p>
                </div>
              </div> */}
            </div>
          </div>
        </section>
        {/* explain Ends */}
      </div>
      {/* Ends */}
      <div className=" pt-5 container">
        <div className="card pt-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="" style={{ height: "auto" }}>
                  <img src={foodImg} alt="ttest" className="w-100" />
                </div>
              </div>
              <div className="col-md-8">
                <h4 className="title_food_color">
                  <i class="fa-solid fa-bowl-rice"></i> Share Your Day
                </h4>
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
                        <div className="col-md-6">
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
                        <div className="col-md-6">
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
                        <div className="col-md-6">
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
                        {/* <div className="row"> */}
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

                        <div className="col-md-6">
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
                        {/* </div> */}
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
              </div>
            </div>

            {/* Notify container */}
            <ToastContainer onClose={handleToastClose} />
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
                                  onClick={() =>
                                    BookingAppointment(
                                      formValues,
                                      data._id,
                                      index
                                    )
                                  } // Pass the form values, index, and resetForm to the function
                                  disabled={buttonLoading[index]} // Disable button when specific button is loading
                                >
                                  {buttonLoading[index]
                                    ? "Booking..."
                                    : "Select The Charity"}{" "}
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
      <Footer />
    </>
  );
};

export default ShareFood;
