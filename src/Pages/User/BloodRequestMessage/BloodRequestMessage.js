import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notify from "../../../components/Notify/Notify";
import HelpOthersImg from "../../../assets/images/banner_image/help_others.png";
import tickImg from "../../../assets/images/banner_image/tick.png";
import warningImg from "../../../assets/images/banner_image/warning.png";
const BloodRequestMessage = () => {
  // const [showPopup, setShowPopup] = useState(false); // Popup visibility state
  const [showThankYou, setShowThankYou] = useState(false); // Thank you message visibility state

  const validationSchema = Yup.object().shape({
    forward_message: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters long"),
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
      // Define regular expressions to search for blood group, contact number, and email
      const bloodGroupRegex = /(A|B|AB|O)[\s]*([+-])/i;
      const contactNumberRegex = /(\d{3})[\s-]?(\d{3})[\s-]?(\d{4})/;
      const emailRegex = /[\w-]+@([\w-]+\.)+[\w-]+/;

      // Search for patterns in the forwarded message
      const bloodGroupMatch = values.forward_message.match(bloodGroupRegex);
      const contactNumberMatch =
        values.forward_message.match(contactNumberRegex);
      const emailMatch = values.forward_message.match(emailRegex);

      // Extract matched values or set defaults if not found
      const bloodGroup = bloodGroupMatch
        ? bloodGroupMatch[0].toUpperCase()
        : null;
      const contactNumber = contactNumberMatch ? contactNumberMatch[0] : null;
      const email = emailMatch ? emailMatch[0] : null;

      // Check if any information is missing
      if (!bloodGroup || !contactNumber || !email) {
        throw new Error(
          "The provided information is not in proper format. Please check."
        );
      }

      // Prepare data to send to the server
      const dataToSend = {
        forwardedMessage: values.forward_message,
        bloodGroupForwarded: bloodGroup,
        contactNumberForwarded: contactNumber,
        emailForwarded: email,
      };

      // Send data to the server
      const Result_data = await axios.post(
        `/forward_blood_message/create`,
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
          imgUrl={tickImg}
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
          imgUrl={warningImg}
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
              <h3 className="display-7">
                Paste the Blood Related Forward Message Here
              </h3>
              <Formik
                initialValues={{
                  forward_message: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, touched, errors, resetForm }) => (
                  <Form>
                    <div className="mb-3 pe-4">
                      <label htmlFor="forward_message" className="form-label">
                        Paste Forward Message
                      </label>
                      <Field
                        as="textarea"
                        name="forward_message"
                        className={`form-control ${
                          touched.forward_message && errors.forward_message
                            ? "is-invalid"
                            : touched.forward_message
                            ? "is-valid"
                            : ""
                        }`}
                        style={{ height: "150px" }}
                      />
                      <ErrorMessage
                        name="forward_message"
                        component="div"
                        className="text-danger"
                      />
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
            </div>
          </div>
          {showThankYou && (
            <div className="alert alert-success mt-4" role="alert">
              <h4 className="mb-0">
                {" "}
                Thank you for submitting the forward message.
              </h4>
              <h5 className="mt-2">Your contribution may help save a life! </h5>
              <h6> Stay tuned and thank you for your support!</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodRequestMessage;
