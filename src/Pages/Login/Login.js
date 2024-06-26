import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser, handleLogin } from "../../slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/app.css";
// import Header from "../../components/Header/Header";

const Login = () => {
  const user_status = useSelector(getUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // State variable to track loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !user_status) {
      dispatch(handleLogin(token));
    }
  });

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

    setLoading(true); // Set loading state to true when login button is clicked

    try {
      const user_response = await axios.post(`/user/login`, {
        email,
        password,
      });
      localStorage.setItem("token", user_response.data.token);

      dispatch(handleLogin(user_response.data.token));

      // const userRole = user_response.data.role;
      // Redirect based on user role
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false); // Set loading state to false when response is received
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-primary px-5 position-absoulte right-0">
          <Link to={"/"} className="text-white">
            {" "}
            Back to Homepage
          </Link>
        </button>
        <div className="wrapper">
          <div className="authentication-forgot d-flex align-items-center justify-content-center">
            <div className="card forgot-box">
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
                    <b>Welcome Back</b>
                  </h4>
                  <p className="text-muted">
                    Enter your registered email ID and password
                  </p>
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
                      {emailError && (
                        <p className="text-danger">{emailError}</p>
                      )}
                    </div>
                    <div className="mb-3 ">
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
                          onClick={togglePasswordVisibility}
                        >
                          <i
                            className={`fa-solid ${
                              showPassword ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </div>
                      </div>
                      {passwordError && (
                        <p className="text-danger">{passwordError}</p>
                      )}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <button className="btn btn-primary px-5" type="submit">
                        {loading ? "Loading..." : "Login"}{" "}
                        {/* Display loading text if loading state is true */}
                      </button>
                      <div>
                        <Link
                          to={!user_status && "/register"}
                          className="signup_btn_text"
                        >
                          Create an account
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
    </>
  );
};

export default Login;
