import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notify from "../../../components/Notify/Notify";
import HelpOthersImg from "../../../assets/images/banner_image/help_others.png";
const BloodForwardMsgM = () => {
  // const [showPopup, setShowPopup] = useState(false); // Popup visibility state
  const [showThankYou, setShowThankYou] = useState(false); // Thank you message visibility state

  const validationSchema = Yup.object().shape({
    bloodType: Yup.string().required("Blood type is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact number must be exactly 10 digits")
      .required("Contact number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    console.log("entering....");
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      // Prepare data to send to the server
      const dataToSend = {
        forwardedMessage: "null",
        bloodGroupForwarded: values.bloodType,
        contactNumberForwarded: values.contactNumber,
        emailForwarded: values.email,
      };

      // Send data to the server
      const Result_data = await axios.post(
        `/forward_blood_message/create_forward_msg_details`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      console.log(Result_data);
      // Display a notification to the user
      toast(
        <Notify
          message="Forward Message Submitted successfully"
          imgUrl="https://cdn3d.iconscout.com/3d/premium/thumb/blood-drop-5075241-4235159.png?f=webp"
          progressBarColor="red"
        />
      );
      // setShowPopup(true); // Show the popup
      setShowThankYou(true); // Show the thank you message
      // Reset the form
      resetForm();
      // Set a timeout to hide the thank you message after 5 seconds
      setTimeout(() => {
        setShowThankYou(false);
      }, 10000);
    } catch (error) {
      console.error("An error occurred:", error);
      //   toast.error(error.message);
      toast.error(
        <Notify
          message="An error occurred"
          imgUrl="https://cdn3d.iconscout.com/3d/premium/thumb/blood-drop-5075241-4235159.png?f=webp"
          progressBarColor="red"
        />
      );
    } finally {
      // Set submitting to false
      setSubmitting(false);
    }
  };
  // hank you for submitting the forward message. Your contribution may help save a life! We'll notify you once the message is processed. Stay tuned and thank you for your support!
  return (
    <div className="mt-5 pt-5 container">
      <div className="card mt-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-5">
              <img
                src={HelpOthersImg}
                alt="blood_camp_image"
                className="w-100"
              />
            </div>
            <div className="col-md-7">
              <h3 className="display-7">Fill Forward Message Details Here</h3>
              <Formik
                initialValues={{
                  bloodType: "",
                  email: "",
                  contactNumber: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, touched, errors, resetForm }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
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
                      <div className="col-md-6">
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
                      <div className="col-md-12">
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
                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary mt-2 me-2 mx-2  mt-3"
                      onClick={() => {
                        resetForm();
                      }}
                    >
                      Clear
                    </button>
                  </Form>
                )}
              </Formik>
              <ToastContainer />

              {showThankYou && (
                <div className="alert alert-success mt-4" role="alert">
                  <h4 className="mb-0">
                    {" "}
                    Thank you for submitting the forward message.
                  </h4>
                  <h5 className="mt-2">
                    Your contribution may help save a life!{" "}
                  </h5>
                  <h6> Stay tuned and thank you for your support!</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodForwardMsgM;
