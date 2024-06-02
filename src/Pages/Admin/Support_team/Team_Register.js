import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "../../../axios";
// import { useDispatch } from "react-redux";
// import { handleLogin } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";

const Notification = ({ message }) => {
  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  );
};

const Team_Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message
  const [successMessage, setSuccessMessage] = useState("");
  //   const dispatch = useDispatch(); // Import useDispatch hook
  const navigate = useNavigate(); // Import useNavigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.contactNumber
    ) {
      //   <ToastMessage type="error" message="This is a success message" />;
      setErrorMessage("All fields are required.");
      return; // Exit the function early if any field is empty
    }
    // Validate phone number
    if (!/^\d{10}$/.test(formData.contactNumber)) {
      setErrorMessage("Phone number must be 10 digits.");
      return;
    }

    // Validate password
    if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
        formData.password
      )
    ) {
      setErrorMessage(
        "Password must be at least 8 characters long and include at least one letter, one number, and one special character."
      );
      return;
    }
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        throw new Error("Token not found.");
      }

      const response = await axios.post(`/support_team/signup`, formData, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response, ".......");
      setSuccessMessage(response.data.msg);
      localStorage.setItem("userCreated", "true"); // Set the flag
      navigate("/all_users");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(
          error.response.data.msg || "Email is already registered."
        );
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      contactNumber: "",
    });
    setErrorMessage("");
  };

  const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div>
      <Layout />
      <div className="page-wrapper">
        <div className="page-content">
          <div className="d-flex justify-content-between flex-column flex-md-row mb-3 mb-md-1">
            <div className="row">
              <div className="col-xl-12 mx-auto">
                <div className="card">
                  <div className="card-body p-4">
                    {/* <h5 className="mb-4">Create Support Team | Form</h5> */}
                    <h5 className="mb-4 fs-4 text_blue">
                      <b>Create Support Team | Form</b>
                    </h5>
                    {/* Notification component */}{" "}
                    {successMessage && <div>{successMessage}</div>}
                    <p className="text-danger">
                      {errorMessage && <Notification message={errorMessage} />}
                    </p>
                    <form className="row g-3" onSubmit={handleSubmit}>
                      <div className="col-md-12">
                        <label htmlFor="input1" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="input1"
                          name="name"
                          placeholder="First Name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-md-12">
                        <label htmlFor="input3" className="form-label">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="input3"
                          name="contactNumber"
                          placeholder="Phone"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="input4" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="input4"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* <div className="col-md-12">
                        <label htmlFor="input5" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="input5"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </div> */}
                      <div className="col-md-12">
                        <label htmlFor="input5" className="form-label">
                          Password
                        </label>
                        <div className="input-group" id="show_hide_password">
                          <input
                            type={showPassword ? "text" : "password"} // Show or hide password based on showPassword state
                            className="form-control"
                            id="input5"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                          />

                          <div
                            className="input-group-text bg-transparent"
                            onClick={togglePasswordVisibility} // Toggle password visibility when the eye icon is clicked
                          >
                            <i
                              className={`fa-solid ${
                                showPassword ? "fa-eye-slash" : "fa-eye"
                              }`}
                            ></i>{" "}
                            {/* Toggle eye icon based on showPassword state */}
                          </div>
                        </div>
                        <p className="text-muted mt-2">
                          Password must be at least 8 characters long and
                          include at least one letter, one number, and one
                          special character.
                        </p>
                      </div>

                      <div className="col-md-12">
                        <div className="d-md-flex d-grid align-items-center gap-3">
                          <button
                            type="submit"
                            className="btn btn-primary px-4"
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            className="btn btn-light px-4"
                            onClick={handleReset}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </form>
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

export default Team_Register;
