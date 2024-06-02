import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
// import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { useSelector } from "react-redux";
import { getUser, handleLogin, logout } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
const Header = () => {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  // if token is not in the localstorage or user value is not in the redux then call the midleware
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !user) {
      dispatch(handleLogin(token));
    }
  });

  const login = () => {
    if (user) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="home_banner_header">
        {/* <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light"> */}
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light header-navbar shadow-lg">
          <div className="container-fluid">
            <Link to="/" className="logo">
              {/* <img src="./images/logo5.png" alt="logo" /> */}
              <img src="https://i.ibb.co/qYGCxnf/logo5.png" alt="logo" />
            </Link>
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

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/"}
                  >
                    Home
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link" href="#">
                    Link
                  </a>
                </li> */}
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Blood
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/looking_for_blood">
                        Looking for blood
                      </Link>
                    </li>
                    {/* <li>
                      <Link className="dropdown-item" href="#">
                        Appointment Booking
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/page_under_maintance"
                      >
                        Types of Bloods
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/all_camp_schedule">
                        Camp schedules
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/search_camp">
                        Location Based Camp schedules
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Food
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/share_food">
                        Share a Day
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Clothes
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/clothes_donation">
                        Share a Day
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Donor
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {user ? (
                      <>
                        <li>
                          <Link
                            to="/donor/appointment"
                            className="dropdown-item"
                          >
                            Appointment Booking
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        {" "}
                        <li>
                          <Link to="/donor/register" className="dropdown-item">
                            Donor Registration
                          </Link>
                        </li>
                        <li>
                          <Link to="/donor/login1" className="dropdown-item">
                            Donor Login
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Help Others
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/bloodrequestmessage">
                        Paste Blood Request Message
                      </Link>
                    </li>
                    {/* bloodforwardmsg */}
                    <li>
                      <Link className="dropdown-item" to="/bloodforwardmsg">
                        Details Blood Request Message
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* all_history */}

                {user ? (
                  <>
                    {/* <li className="nav-item">
                      <Link className="nav-link" to="/dashboard">
                        Dashboard
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/all_history">
                        History
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}
                {/* "Help Others: Paste Blood Request Message" */}
                <h3>
                  {" "}
                  {user && user.role === "donor" && (
                    <div class="btn-group">Hai Donor</div>
                  )}
                </h3>
              </ul>

              <span class="navbar-text">
                {/* <div className="homepage_banner__header_images"> */}
                <div className="header_btn_section d-flex">
                  {user ? (
                    <>
                      {/* <p>
                        Welcome <span>{user?.name}</span>
                      </p>
                      <button className="">
                        <Link onClick={login}>Logout</Link>
                      </button> */}

                      {/* Profile  starts*/}
                      <div class="btn-group">
                        <button
                          class="btn btn-dark dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span className="text-uppercase">
                            {user?.name ? user.name[0] : ""}
                            {/* {user} */}
                          </span>
                        </button>

                        <ul
                          class="dropdown-menu profile_drop-down"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li>
                            <Link class="dropdown-item text-wrap">
                              Hello, <span>{user?.name}</span>
                            </Link>
                          </li>
                          <hr className="m-0" />
                          <li>
                            <Link class="dropdown-item">Profile</Link>
                          </li>
                          <li>
                            <Link class="dropdown-item" onClick={login}>
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* Profile  Ends*/}
                    </>
                  ) : (
                    <>
                      <button className=" header_btn">
                        <Link
                          to={!user && "/login"}
                          className="signup_btn mx-2"
                        >
                          <i class="fa-solid fa-arrow-right-to-bracket"></i>{" "}
                          Login
                        </Link>
                      </button>
                      <button className=" header_btn">
                        <Link to={!user && "/register"} className="signup_btn">
                          <i class="fa-solid fa-arrow-right-to-bracket"></i>{" "}
                          Sign Up
                        </Link>
                      </button>
                    </>
                  )}

                  <button className="btn header_btn">
                    <Link
                      to={"/razorpaymethod"}
                      className="donate_btn text-white"
                    >
                      <i class="fa-solid fa-heart fa-beat-fade"></i> Donate
                    </Link>
                  </button>

                  {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                    {user ? (
                      <>
                        <li>
                          Welcome <span>{user?.name}</span>
                        </li>
                        <li>
                          <Link onClick={login}>Logout</Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to={!user && "/login"} className="text-white">
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={!user && "/register"}
                            className="signup_btn"
                          >
                            Sign Up
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link to={"/"} className="donate_btn text-white">
                        <i class="fa-solid fa-heart fa-beat-fade"></i> Donate
                      </Link>
                    </li>
                  </ul> */}
                </div>
                {/* </div> */}
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
