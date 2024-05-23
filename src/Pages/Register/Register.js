import React, { useState } from "react";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateFields = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!contactNumber.trim()) {
      setContactNumberError("Phone number is required");
      isValid = false;
    } else {
      setContactNumberError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const register = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!validateFields()) {
      return;
    }

    try {
      const user_response = await axios.post(`/user/signup`, {
        name,
        email,
        contactNumber,
        password,
      });

      localStorage.setItem("token", user_response.data.token);
      dispatch(handleLogin(user_response.data.token));
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };
  const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="container">
      <button className="btn btn-primary px-5 position-absoulte right-0">
        <Link to={"/"} className="text-white">
          {" "}
          Back to Homepage
        </Link>
      </button>

      <div className="wrapper">
        <div className="authentication-forgot d-flex align-items-center justify-content-center">
          <div className="card">
            <div className="card-body">
              <div className="px-3">
                <div className="text-center">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/024/300/164/original/check-mark-security-icon-3d-lock-icon-png.png"
                    width="100"
                    alt="lock"
                  />
                </div>
                <h4 className="mt-1 font-weight-bold">
                  <b>Create An Account</b>
                </h4>
                {errorMessage && <p>{errorMessage}</p>}
                <form onSubmit={register}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={validateFields}
                      id="name"
                      placeholder="Your Name"
                    />
                    {nameError && <p className="text-danger">{nameError}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={validateFields}
                      id="email"
                      placeholder="name@example.com"
                    />
                    {emailError && <p className="text-danger">{emailError}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      onBlur={validateFields}
                      id="contactNumber"
                      placeholder="Your Phone Number"
                    />
                    {contactNumberError && (
                      <p className="text-danger">{contactNumberError}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={validateFields}
                        className="form-control"
                        id="password"
                        placeholder="Password"
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
                      </div>
                    </div>
                    {passwordError && (
                      <p className="text-danger">{passwordError}</p>
                    )}
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary px-5" type="submit">
                      Register
                    </button>
                    <div>
                      Already have an account?
                      <Link to={"/login"} className="signup_btn_text px-1">
                        Login
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
