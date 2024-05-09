import React, { useState } from "react";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateFields = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const login = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!validateFields()) {
      return;
    }

    try {
      const user_response = await axios.post(`/user/login`, {
        email,
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

  return (
    <div className="container">
      <h1>Login Form</h1>
      <div className="card">
        <div className="card-body">
          {errorMessage && <p>{errorMessage}</p>}
          <form onSubmit={login}>
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
              {/* Validate fields onBlur */}
              {emailError && <p className="text-danger">{emailError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validateFields}
                className="form-control"
                id="password"
                placeholder="Password"
              />
              {/* Validate fields onBlur */}
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </div>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
