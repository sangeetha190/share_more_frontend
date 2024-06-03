import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../Layout/Layout";
import axios from "../../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notify from "../../../components/Notify/Notify";
import warning from "../../../assets/images/banner_image/warning.png";
import tick from "../../../assets/images/banner_image/tick.png";
// warning
// import { useNavigate } from "react-router-dom";
const ClothesUnique = () => {
  //   const navigate = useNavigate();
  const [getData, setGetData] = useState(null);
  const [isDonatedLoading, setIsDonatedLoading] = useState(false); // State for tracking "Donated" button loading
  const initialValues = {
    unique: "",
  };

  const validationSchema = Yup.object().shape({
    unique: Yup.string().required("Unique ID is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values, "all values");
    try {
      const response = await axios.get(`/clothes_donation/${values.unique}`);
      if (response.data) {
        setGetData(response.data);
      } else {
        setGetData("no-data"); // Set to "no-data" if no data is found
      }
      console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
      setGetData("no-data"); // Set to "no-data" if there's an error
    }
    setSubmitting(false);
  };
  const handleDonatedClick = async (values, setSubmitting) => {
    setIsDonatedLoading(true); // Set loading state to true
    try {
      // share_food/update/SM240528151500
      const response = await axios.put(
        `/clothes_donation/update/${values.unique}`
      );
      console.log(response.data); // Handle the response as needed
      toast(<Notify message="Donor status is updated....." imgUrl={tick} />);
      setSubmitting(false);
    } catch (error) {
      console.error("Error updating donor appointment:", error);
      toast(<Notify message={error.response.data.msg} imgUrl={warning} />);
      setSubmitting(false);
    }
    setIsDonatedLoading(false); // Set loading state to false
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
                    <h4 className="display-7">Unique ID</h4>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {({
                        isSubmitting,
                        touched,
                        errors,
                        values,
                        resetForm,
                        setSubmitting,
                      }) => (
                        <Form>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <div className="form-group">
                                  <label
                                    htmlFor="unique"
                                    className="form-label"
                                  >
                                    Enter the Unique ID
                                  </label>
                                  <Field
                                    type="text"
                                    name="unique"
                                    className={`form-control ${
                                      touched.unique && errors.unique
                                        ? "is-invalid"
                                        : touched.unique
                                        ? "is-valid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="unique"
                                    component="div"
                                    className="text-danger"
                                  />
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
                                      setGetData(null); // Clear getData when form is reset
                                    }}
                                  >
                                    Clear
                                  </button>
                                </div>
                              </div>
                            </div>

                            {getData === "no-data" && (
                              <div className="col-md-6">
                                <h5 className="text-danger">No data found</h5>
                              </div>
                            )}

                            {getData && getData !== "no-data" && (
                              <div className="col-md-6">
                                <h6 className="mb-2">
                                  Name: {getData?.userId?.name}
                                </h6>
                                <h6 className="mb-2">
                                  Mobile no: {getData.contactNumber}
                                </h6>

                                {/* charityId */}
                                <button
                                  type="button"
                                  className="btn btn-success mt-2"
                                  onClick={() =>
                                    handleDonatedClick(values, setSubmitting)
                                  }
                                  disabled={isDonatedLoading} // Disable button while loading
                                >
                                  {isDonatedLoading
                                    ? "Processing..."
                                    : "Donated"}{" "}
                                  {/* Show loading text */}
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-secondary mt-2 me-2 mx-2"
                                  onClick={() => {
                                    resetForm();
                                    setGetData(null); // Clear getData when form is reset
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>
                        </Form>
                      )}
                    </Formik>
                    <ToastContainer />
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

export default ClothesUnique;
