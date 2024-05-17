import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, handleLogin, logout } from "../../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
const Layout = () => {
  const user_stauts = useSelector(getUser);
  const navigate = useNavigate();
  // if token is not in the localstorage or user value is not in the redux then call the midleware
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !user_stauts) {
      dispatch(handleLogin(token));
    }
  });
  //   const login = () => {
  //     if (user_stauts) {
  //       dispatch(logout());
  //     } else {
  //       navigate("/login");
  //     }
  //   };
  const handleLogout = () => {
    // Clear user authentication token from local storage
    localStorage.removeItem("token");

    // Dispatch the logout action to update the Redux state
    dispatch(logout());

    // Navigate to the login page
    navigate("/admin/login");
  };
  return (
    <div>
      {/* <!--wrapper--> */}
      <div className="wrapper">
        {/* <!--sidebar wrapper --> */}
        <div className="sidebar-wrapper" data-simplebar="true">
          <div className="sidebar-header">
            <div>
              <div className="fs-4">
                <i className="bx bx-shopping-bag"></i>
              </div>
            </div>
            <div>
              <h4 className="logo-text">
                <b>Share More</b>
              </h4>
            </div>
            <div className="toggle-icon ms-auto">
              <i className="bx bx-menu"></i>
            </div>
          </div>
          {/* <!--navigation--> */}
          <ul className="metismenu" id="menu">
            <li>
              <Link to="/dashboard">
                <div className="parent-icon">
                  <i className="bx bx-home-alt"></i>
                </div>
                <div className="menu-title">Dashboard</div>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div className="parent-icon">
                  <i className="bx bx-home-alt"></i>
                </div>
                <div className="menu-title">Go to Website</div>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <div className="parent-icon">
                  <i className="bx bx-home-alt"></i>
                </div>
                <div className="menu-title">
                  <b>User Management</b>
                </div>
              </Link>
            </li>
            <li>
              <ul className="mt-0 pt-0">
                {user_stauts && user_stauts.role === "admin" && (
                  <>
                    <li>
                      <Link to="/support_team" className="logo">
                        <i className="bx bx-radio-circle"></i>Create Support
                        Team
                      </Link>
                    </li>
                    <li>
                      <Link to="/create_user" className="logo">
                        <i className="bx bx-radio-circle"></i>Create User
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link to="/all_users" className="logo">
                    <i className="bx bx-radio-circle"></i>All Users
                  </Link>
                </li>
              </ul>
            </li>

            {/* Donor */}
            <li>
              <Link>
                <div className="parent-icon">
                  <i className="bx bx-home-alt"></i>
                </div>
                <div className="menu-title">
                  <b>Donor Management</b>
                </div>
              </Link>
            </li>
            <li>
              <ul className="mt-0 pt-0">
                {user_stauts && user_stauts.role === "admin" && (
                  <>
                    <li>
                      <Link to="/create_donor" className="logo">
                        <i className="bx bx-radio-circle"></i>Create Donor
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/edit_donor" className="logo">
                        <i className="bx bx-radio-circle"></i>Edit Donor
                      </Link>
                    </li> */}
                  </>
                )}
                <li>
                  <Link to="/all_donor" className="logo">
                    <i className="bx bx-radio-circle"></i>All Donors
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          {/* <!--end navigation--> */}
        </div>
        {/* <!--end sidebar wrapper -->
      <!--start header --> */}
        <header>
          <div className="topbar d-flex align-items-center">
            <nav className="navbar navbar-expand gap-3">
              <div className="mobile-toggle-menu">
                <i className="bx bx-menu"></i>
              </div>
              <div className="top-menu ms-auto">
                <ul className="navbar-nav align-items-center gap-1">
                  <li
                    className="nav-item mobile-search-icon d-flex d-lg-none"
                    data-bs-toggle="modal"
                    data-bs-target="#SearchModal"
                  >
                    <i className="bx bx-search"></i>
                  </li>
                  {user_stauts && (
                    <li>
                      <span>
                        Welcome, {user_stauts.name} <br />
                        {user_stauts.role}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="user-box dropdown px-3">
                <p className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret">
                  <i class="fa-solid fa-circle-user fs-2 mt-3"></i>
                </p>

                <button className="btn " onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Layout;
