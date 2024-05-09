import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
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
      <nav className="header">
        <Link to="/">
          Share More
          <BloodtypeIcon />{" "}
        </Link>
        <div>
          <Link to={!user && "/login"} className="header__link">
            <span>Hello{user?.email}</span>
            <span>{user ? "sign out" : "sign In"}</span>
          </Link>
        </div>
      </nav>
      <div>
        <div className="homepage_banner">
          <div className="box homepage_banner_content">
            <div className="homepage_banner__header">
              <Link to="/mainpage" className="logo">
                <img
                  src="https://c.tenor.com/KMqG7xBEaeUAAAAi/cv.gif"
                  alt="logo"
                />
              </Link>
              <ul>
                <li>
                  <Link to={!user && "/login"}>Login</Link>
                </li>
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              </ul>
              <li onClick={login}>Logout</li>
            </div>
            <div className="homepage_banner__contentBox">
              <h2>Welcome to Our Website</h2>
              <p>
                Create your account and modify your profile info. This site
                built using Reactjs And Nodejs.
              </p>

              <Link to="/login" className="btn">
                Create An Account
              </Link>
            </div>
          </div>
          {/* <!-- ============================================================================ --> */}

          {/* <!-- Image starts Here --> */}
          <div className="box images">
            <div className="homepage_banner__header_images">
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="signup_btn">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            <div className="imagecontainerBox">
              <img
                src="https://cdn.dribbble.com/users/1568450/screenshots/5430738/work_2_dribbble-01_4x.png"
                alt="mainpage_img"
              />
            </div>
          </div>
          {/* <!-- Image Ends  Here --> */}
          {/* <!-- ============================================================================ --> */}
        </div>

        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Header;
