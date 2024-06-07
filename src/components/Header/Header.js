import React, { useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { getUser, handleLogin, logout } from "../../slices/userSlice";

const Header = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !user) {
      dispatch(handleLogin(token));
    }
  }, [dispatch, user]);

  const login = () => {
    if (user) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  };

  const isActive = (location, path) => {
    return location.pathname === path;
  };

  return (
    <div className="home_banner_header">
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light header-navbar shadow-lg">
        <div className="container-fluid">
          <NavLink to="/" className="logo">
            <img src="https://i.ibb.co/qYGCxnf/logo5.png" alt="logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              <li
                className={`nav-item dropdown ${
                  isActive(location, [
                    "/looking_for_blood",
                    "/page_under_maintance",
                    "/all_camp_schedule",
                    "/search_camp",
                  ])
                    ? "active"
                    : ""
                }`}
              >
                <div
                  className="nav-link dropdown-toggle fs-6"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Blood
                </div>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink to="/looking_for_blood" className="dropdown-item">
                      Looking for blood
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/types_of_blood" className="dropdown-item">
                      Types of Bloods
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/all_camp_schedule" className="dropdown-item">
                      Camp schedules
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/search_camp" className="dropdown-item">
                      Location Based Camp schedules
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li
                className={`nav-item dropdown ${
                  isActive(location, ["/share_food"]) ? "active" : ""
                }`}
              >
                <div
                  className={`nav-link dropdown-toggle fs-6 ${
                    isActive(location, ["#/share_food"]) ? "active" : ""
                  }`}
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Food
                </div>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink to="/share_food" className="dropdown-item">
                      Share a Day
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li
                className={`nav-item dropdown ${
                  isActive(location, ["/clothes_donation"]) ? "active" : ""
                }`}
              >
                <div
                  className="nav-link dropdown-toggle fs-6"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Clothes
                </div>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink to="/clothes_donation" className="dropdown-item">
                      Share a Day
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li
                className={`nav-item dropdown ${
                  isActive(location, [
                    "/donor/appointment",
                    "/donor/register",
                    "/donor/login1",
                  ])
                    ? "active"
                    : ""
                }`}
              >
                <div
                  className="nav-link dropdown-toggle fs-6"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Donor
                </div>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {user ? (
                    <>
                      <li>
                        <NavLink
                          to="/donor/appointment"
                          className="dropdown-item"
                        >
                          Appointment Booking
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink to="/donor/register" className="dropdown-item">
                          Donor Registration
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/donor/login1" className="dropdown-item">
                          Donor Login
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </li>
              <li
                className={`nav-item dropdown ${
                  isActive(location, [
                    "/bloodrequestmessage",
                    "/bloodforwardmsg",
                  ])
                    ? "active"
                    : ""
                }`}
              >
                <div
                  className="nav-link dropdown-toggle fs-6"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Help Others
                </div>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink
                      to="/bloodrequestmessage"
                      className="dropdown-item"
                    >
                      Paste Blood Request Message
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/bloodforwardmsg" className="dropdown-item">
                      Details Blood Request Message
                    </NavLink>
                  </li>
                </ul>
              </li>
              {user && (
                <li className="nav-item">
                  <NavLink to="/all_history" className="nav-link">
                    History
                  </NavLink>
                </li>
              )}
              {/* {user && user.role === "donor" && (
                <h3>
                  <div className="btn-group">Hai Donor</div>
                </h3>
              )} */}
            </ul>
            <span className="navbar-text">
              <div className="header_btn_section d-flex">
                {user ? (
                  <div className="btn-group">
                    <button
                      className="btn btn-dark dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="text-uppercase">
                        {user?.name ? user.name[0] : ""}
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu profile_drop-down"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <p className="dropdown-item text-wrap mb-0">
                          Hello, <span>{user?.name}</span>
                        </p>
                      </li>
                      <hr className="m-0" />
                      <li>
                        <p className="dropdown-item mb-0">Profile</p>
                      </li>
                      <li>
                        <p className="dropdown-item mb-0" onClick={login}>
                          Logout
                        </p>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
                    <button className="header_btn">
                      <NavLink to="/login" className="signup_btn mx-2">
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>{" "}
                        Login
                      </NavLink>
                    </button>
                    <button className="header_btn">
                      <NavLink to="/register" className="signup_btn">
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>{" "}
                        Sign Up
                      </NavLink>
                    </button>
                  </>
                )}
                <button className="btn header_btn">
                  <NavLink
                    to="/razorpaymethod"
                    className="donate_btn text-white"
                  >
                    <i className="fa-solid fa-heart fa-beat-fade"></i> Donate
                  </NavLink>
                </button>
              </div>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
