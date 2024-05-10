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
      <div>
        <div className="homepage_banner">
          <div className="box homepage_banner_content">
            <div className="homepage_banner__header">
              <Link to="/mainpage" className="logo">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/039/314/387/original/3d-blood-drop-red-blood-drop-with-white-cross-sign-the-concept-of-blood-donation-to-save-the-lives-of-patients-3d-illustration-vector.jpg"
                  alt="logo"
                />
              </Link>
              {/* <ul>
                <li>
                  <Link to={!user && "/login"}>Login</Link>
                </li>
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              </ul>
              <li onClick={login}>Logout</li> */}
            </div>
            <div className="homepage_banner__contentBox">
              <h2>Donate Blood Today!</h2>
              <p>Be Hero and save a Life! Every Drop Will Help!</p>

              <Link to="/login" className="btn">
                Get Help Together
              </Link>
            </div>
          </div>
          {/* <!-- ============================================================================ --> */}

          {/* <!-- Image starts Here --> */}
          <div className="box images">
            <div className="homepage_banner__header_images">
              <ul>
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
                      <Link to={!user && "/login"}>Login</Link>
                    </li>
                    <li>
                      <Link to={!user && "/register"} className="signup_btn">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="imagecontainerBox">
              <img src="./banner2.png" alt="mainpage_img" />
            </div>
          </div>
          {/* <!-- Image Ends  Here --> */}
          {/* <!-- ============================================================================ --> */}
        </div>
      </div>
    </>
  );
};

export default Header;
