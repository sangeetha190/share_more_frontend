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
    navigate("/login");
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
              <a href="javascript:;" className="has-arrow">
                <div className="parent-icon">
                  <i className="bx bx-user-circle"></i>
                </div>
                <div className="menu-title">User Management</div>
              </a>
              <ul>
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
                        Welcome, {user_stauts.name} {user_stauts.role}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="user-box dropdown px-3">
                <a
                  className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa-solid fa-circle-user fs-2"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="javascript:;"
                    >
                      <i className="bx bx-user fs-5"></i>
                      <span>Profile</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="javascript:;"
                    >
                      <i className="bx bx-cog fs-5"></i>
                      <span>Settings</span>
                    </a>
                  </li>
                  <li>
                    <div className="dropdown-divider mb-0"></div>
                  </li>

                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="javascript:;"
                    >
                      <i className="bx bx-log-out-circle"></i>
                      <Link onClick={handleLogout}>Logout</Link>
                    </a>
                  </li>
                </ul>
                <button className="btn " onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </header>

        {/* <div className="overlay toggle-icon"></div>

        <a href="javaScript:;" className="back-to-top">
          <i className="bx bxs-up-arrow-alt"></i>
        </a>

        <footer className="page-footer">
          <p className="mb-0">Copyright © 2024. All right reserved.</p>
        </footer> */}
      </div>
    </div>
  );
};

export default Layout;
