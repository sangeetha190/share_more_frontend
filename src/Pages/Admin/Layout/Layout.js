import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser, handleLogin, logout } from "../../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Layout = () => {
  const user_stauts = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (menuName) => {
    setOpenSubMenu((prevSubMenu) =>
      prevSubMenu === menuName ? null : menuName
    );
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !user_stauts) {
      dispatch(handleLogin(token));
    }
  }, [dispatch, user_stauts]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/admin/login");
  };

  return (
    <div>
      <div className="wrapper">
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
          <ul className="metismenu" id="menu">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "" : "")}
              >
                <div className="parent-icon">
                  <i className="bx bx-home-alt"></i>
                </div>
                <div className="menu-title">
                  <i className="fa-solid fa-gauge"></i> <b>Dashboard</b>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "" : "")}
              >
                <div className="parent-icon">
                  <i className="bx bx-home-alt"></i>
                </div>
                <div className="menu-title">
                  <i class="fa-solid fa-globe"></i> <b>Go to Website</b>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                className={({ isActive }) => (isActive ? "" : "")}
              >
                <div className="parent-icon">
                  {/* <i className="fa-solid fa-users"></i> */}
                </div>
                <div className="menu-title">
                  <i className="fa-solid fa-users"></i> <b>User Management</b>
                </div>
              </NavLink>
            </li>
            <li>
              <ul className="mt-0 pt-0">
                {user_stauts && user_stauts.role === "admin" && (
                  <>
                    <li>
                      <NavLink
                        to="/support_team"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <i className="bx bx-radio-circle"></i>Create Support
                        Team
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/create_user"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <i className="bx bx-radio-circle"></i>Create User
                      </NavLink>
                    </li>
                  </>
                )}
                <li>
                  <NavLink
                    to="/all_users"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <i className="bx bx-radio-circle"></i>All Users
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink
                to="#"
                className={({ isActive }) => (isActive ? "" : "")}
              >
                <div className="parent-icon">
                  <i className="bx bx-home-alt"></i>
                </div>
                <div className="menu-title">
                  <i className="fa-solid fa-droplet"></i>{" "}
                  <b>Donor Management</b>
                </div>
              </NavLink>
            </li>
            <li>
              <ul className="mt-0 pt-0">
                {user_stauts && user_stauts.role === "admin" && (
                  <>
                    <li>
                      <NavLink
                        to="/create_donor"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <i className="bx bx-radio-circle"></i>Create Donor
                      </NavLink>
                    </li>
                  </>
                )}
                <li>
                  <NavLink
                    to="/all_donor"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <i className="bx bx-radio-circle"></i>All Donors
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/appoinment_List"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <i className="bx bx-radio-circle"></i>Appointment List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/unique_id"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <i className="bx bx-radio-circle"></i>Unique Id
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink
                to="#"
                className={({ isActive }) => (isActive ? "" : "")}
              >
                <div className="parent-icon">
                  <i className="bx bx-home-alt"></i>
                </div>
                <div className="menu-title">
                  <i class="fa-solid fa-bowl-rice"></i> <b>Food Management</b>
                </div>
              </NavLink>
            </li>
            <li>
              <ul className="mt-0 pt-0">
                <li>
                  <NavLink
                    to="/food_appoinment_list"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <i className="bx bx-radio-circle"></i>Appointment List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/food_unique_id"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <i className="bx bx-radio-circle"></i>Unique Id
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* clothes */}

            <li>
              <NavLink
                to="#"
                className={({ isActive }) => (isActive ? "" : "")}
              >
                <div className="parent-icon">
                  <i className="bx bx-home-alt"></i>
                </div>
                <div className="menu-title">
                  <i class="fa-solid fa-shirt"></i> <b>Clothes Management</b>
                </div>
              </NavLink>
            </li>
            <li>
              <ul className="mt-0 pt-0">
                <li>
                  <NavLink
                    to="/clothe_appoinment_list"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <i className="bx bx-radio-circle"></i>Appointment List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/clothe_unique_id"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <i className="bx bx-radio-circle"></i>Unique Id
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink
                to="#"
                className={({ isActive }) => (isActive ? "" : "")}
              >
                <div className="parent-icon">
                  <i className="bx bx-home-alt"></i>
                </div>
                <div className="menu-title">
                  <i className="fa-solid fa-map-location-dot"></i>{" "}
                  <b>Camp Schedule </b>
                </div>
              </NavLink>
            </li>
            <li>
              <ul className="mt-0 pt-0">
                {user_stauts && user_stauts.role === "admin" && (
                  <>
                    <li>
                      <NavLink
                        to="/camp_schedule_create"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <i className="bx bx-radio-circle"></i>Create Camp
                        Schedule
                      </NavLink>
                    </li>
                  </>
                )}
                <li>
                  <NavLink
                    to="/camp_schedule_list"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <i className="bx bx-radio-circle"></i>All Camp_Schedule List
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <div
                onClick={() => toggleSubMenu("org")}
                style={{ cursor: "pointer" }}
                className="title_menu_dashboard"
              >
                <div className="parent-icon">
                  <i className="bx bx-home-alt"></i>
                </div>
                <div className="menu-title px-2">
                  <i className="fa-solid fa-hospital"></i> <b>Organization</b>
                  {openSubMenu === "org" ? (
                    <i
                      className="fa-solid fa-chevron-up"
                      style={{ marginLeft: "10px" }}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-chevron-down"
                      style={{ marginLeft: "10px" }}
                    ></i>
                  )}
                </div>
              </div>
            </li>
            {openSubMenu === "org" && (
              <ul className="mt-0 pt-0">
                {user_stauts && user_stauts.role === "admin" && (
                  <>
                    <li>
                      <NavLink
                        to="/create_org"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <i className="bx bx-radio-circle"></i>Create
                        Organization
                      </NavLink>
                    </li>
                  </>
                )}
                <li>
                  <NavLink
                    to="/org_list"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <i className="bx bx-radio-circle"></i>All Organization List
                  </NavLink>
                </li>
              </ul>
            )}
            {user_stauts && user_stauts.role === "admin" && (
              <li>
                <NavLink
                  to="/payment_history"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <div className="parent-icon">
                    <i className="bx bx-home-alt"></i>
                  </div>
                  <div className="menu-title">
                    <i className="fa-solid fa-hand-holding-dollar"></i>{" "}
                    <b>Donation History </b>
                  </div>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
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
                </ul>
              </div>
              <div className="user-box dropdown px-3">
                <p className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret">
                  <i className="fa-solid fa-circle-user fs-2 mt-3"></i>
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
