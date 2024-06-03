import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <>
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="logo" style={{ width: "200px" }}>
              <a href="index.html">
                <img
                  src="img/logo/logo5.png"
                  alt=""
                  srcSet=""
                  className="w-100"
                />
              </a>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="#home" className="nav-link">
                    {" "}
                    Home{" "}
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#about" className="nav-link">
                    {" "}
                    About{" "}
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#features" className="nav-link">
                    {" "}
                    Service{" "}
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#screenshots" className="nav-link">
                    {" "}
                    Users{" "}
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#contact" className="nav-link">
                    {" "}
                    Contact{" "}
                  </a>
                </li>
              </ul>
              <div className="others-option">
                <div className="d-flex align-items-center gap-2">
                  <div className="option-item">
                    <a href="#" className="default-btn">
                      Login
                      <span style={{ top: 79, left: "54.427px" }} />
                    </a>
                  </div>
                  <div className="option-item">
                    <a href="#" className="default-btn">
                      Register
                      <span style={{ top: 79, left: "54.427px" }} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav> */}

        <div id="home" className="main-banner">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="banner-content">
                      <h1>
                        {" "}
                        Give the
                        <span style={{ color: "#056526" }}>
                          {" "}
                          Gift of Life:
                        </span>{" "}
                        Donate Blood Today!
                      </h1>{" "}
                      {/* <h1>
                        Best Mobile App 
                        Template For Your Business
                      </h1> */}
                      {/* <p>
                        App ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p> */}
                      <div className="others-option">
                        <div className="d-flex align-items-center gap-2 mb-4">
                          <div className="option-item">
                            <Link to="/" className="default-btn">
                              Contact Us
                              <span style={{ top: 357, left: "-176.781px" }} />
                            </Link>
                          </div>
                          <div className="option-item ">
                            <Link
                              to="/razorpaymethod"
                              className="default-btn bg-dark"
                            >
                              Donate
                              <span
                                style={{ top: "67.6667px", left: "-21.0834px" }}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="banner-image1">
                      <img src="/banner00.png" alt="image1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="default-shape">
            <div className="shape-1">
              {/* <img src="/img/shape/1.png" alt="image1" /> */}
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/blood-donation-7811170-6184541.png?f=webp"
                alt="image1"
                className="w-120px"
              />
            </div>
            <div className="shape-2 rotateme">
              {/* <img src="/img/shape/2.png" alt="image1" /> */}
              <img
                src="https://static.vecteezy.com/system/resources/previews/010/851/862/original/3d-illustration-blood-drop-suitable-for-medical-png.png"
                alt="image1"
                className="w-50px"
              />
            </div>
            <div className="shape-3_withoutanimation">
              {/* <img src="/img/shape/7.png" alt="image1" /> */}
              <img
                src="https://static.vecteezy.com/system/resources/previews/014/455/624/original/illustration-icon-3d-donate-button-heart-shape-red-isolated-on-white-background-free-vector.jpg"
                alt="image1"
                className="w-120px"
              />
            </div>
            {/* <div className="shape-4">
              <img src="/img/shape/7.png" alt="image1" />
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/planet-earth-6923826-5685373.png?f=webp"
                alt="image1"
                className="w-50px"
              />
            </div> */}
            <div className="shape-5">
              {/* <img src="/img/shape/6.png" alt="image1" /> */}
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/leaves-7970020-6342179.png"
                alt="image1"
                className="image_animation_w"
              ></img>
            </div>
          </div>
        </div>
        <section className="fun-facts-area pt-100 pb-70">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-sm-6">
                <div className="single-fun-fact">
                  <div className="icon">
                    <i className="fa fa-users" />
                  </div>
                  <h3>
                    <span
                      className="odometer odometer-auto-theme"
                      data-count={1020}
                    >
                      <div className="odometer-inside">
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">50</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">0+</span>
                              </span>
                            </span>
                          </span>
                        </span>
                        {/* <span className="odometer-formatting-mark">,</span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">0</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">2</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">0</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                      </div>
                    </span>
                  </h3>
                  <p>Blood Donors</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-fun-fact">
                  <div className="icon">
                    <i className="fa fa-heart" />
                  </div>
                  <h3>
                    <span
                      className="odometer odometer-auto-theme"
                      data-count={5679}
                    >
                      <div className="odometer-inside">
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          {/* <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">5</span>
                              </span>
                            </span>
                          </span> */}
                        </span>
                        {/* <span className="odometer-formatting-mark">,</span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">6</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          {/* <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">7</span>
                              </span>
                            </span>
                          </span> */}
                        </span>
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          {/* <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">9</span>
                              </span>
                            </span>
                          </span> */}
                        </span>
                      </div>
                    </span>
                  </h3>
                  <p>Donated Food</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-fun-fact">
                  <div className="icon">
                    <i className="fa fa-star" />
                  </div>
                  <h3>
                    <span
                      className="odometer odometer-auto-theme"
                      data-count={2660}
                    >
                      <div className="odometer-inside">
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">1</span>
                          {/* <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">2</span>
                              </span>
                            </span>
                          </span> */}
                        </span>
                        {/* <span className="odometer-formatting-mark">,</span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">6</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">6</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">00</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">0+</span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </div>
                    </span>
                  </h3>
                  <p>Charity</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-fun-fact">
                  <div className="icon">
                    <i className="fa fa-download" />
                  </div>
                  <h3>
                    <span
                      className="odometer odometer-auto-theme"
                      data-count={6789}
                    >
                      <div className="odometer-inside">
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">3</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">00+</span>
                              </span>
                            </span>
                          </span>
                        </span>
                        {/* <span className="odometer-formatting-mark">,</span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">7</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">8</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">9</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                      </div>
                    </span>
                  </h3>
                  <p>Donation</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="about-area pb-100 pt-70 pb-30">
          <div className="container">
            <div className="section-title">
              <h2>About US</h2>
              <div className="bar" />
            </div>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="about-content">
                  <h3>We're for social causes</h3>
                  <div className="bar" />
                  <p className="fs-5">
                    At Share More, we believe in the power of compassion and
                    community. Founded with a vision to make a difference in the
                    lives of those in need, we provide a platform for
                    individuals to extend their support through blood donation,
                    food drives, and clothing donations. Our mission is to
                    foster a culture of giving, where every act of kindness, no
                    matter how small, creates a ripple effect of positive
                    change.
                  </p>

                  <div className="about-btn">
                    <Link to="/" className="default-btn">
                      Read More
                      <span />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-image1">
                  <img src="/img/about.png" alt="image1" className="w-100" />
                </div>
              </div>
            </div>
          </div>
          <div className="default-shape">
            <div className="shape-1">
              <img src="/img/shape/1.png" alt="image1" />
              {/* <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyUUH3N61jY8tFNkXXFd5nNBwHUzWifZP0IhWbCiG96w&s"
                alt="image1"
              /> */}
            </div>
            <div className="shape-2 rotateme">
              {/* <img src="/img/shape/2.png" alt="image1" /> */}
              {/* <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/food-donation-9725449-7887493.png"
                alt="image1"
              /> */}
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyUUH3N61jY8tFNkXXFd5nNBwHUzWifZP0IhWbCiG96w&s"
                alt="image1"
                className="w-50"
              />
            </div>
            <div className="shape-3">
              {/* <img src="/img/shape/7.png" alt="image1" /> */}
              <img src="/img/shape/6.png" alt="image1" />
            </div>
            <div className="shape-4">
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/leaves-6936201-5700455.png"
                alt="image1"
                className="w-50px"
              />
            </div>
            <div className="shape-5">
              <img src="/img/shape/7.png" alt="image1" />
            </div>
          </div>
        </section>

        <section className="app-download ptb-100">
          <div className="container">
            <div className="app-download-content">
              <h3>Donate to Share More</h3>
              <div className="bar" />
              <p className="fs-5">
                Your generosity saves lives, fights hunger, and provides warmth
                to those in need. Join us in making a meaningful impact today.
              </p>
              <div className="app-holder">
                <Link to="/razorpaymethod">
                  <img
                    src="https://www.wmpress.org/wp-content/uploads/2020/10/donate-button.png"
                    alt="image1"
                    className="w-25"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="fun-facts-area pt-100 pb-70">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-sm-6">
                <div className="single-fun-fact">
                  <div className="icon">
                    <i className="fa fa-users" />
                  </div>
                  <h3>
                    <span
                      className="odometer odometer-auto-theme"
                      data-count={1020}
                    >
                      <div className="odometer-inside">
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">50</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">0+</span>
                              </span>
                            </span>
                          </span>
                        </span>
                        {/* <span className="odometer-formatting-mark">,</span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">0</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">2</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">0</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                      </div>
                    </span>
                  </h3>
                  <p>Blood Donors</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-fun-fact">
                  <div className="icon">
                    <i className="fa fa-heart" />
                  </div>
                  <h3>
                    <span
                      className="odometer odometer-auto-theme"
                      data-count={5679}
                    >
                      <div className="odometer-inside">
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          {/* <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">5</span>
                              </span>
                            </span>
                          </span> */}
                        </span>
                        {/* <span className="odometer-formatting-mark">,</span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">6</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          {/* <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">7</span>
                              </span>
                            </span>
                          </span> */}
                        </span>
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          {/* <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">9</span>
                              </span>
                            </span>
                          </span> */}
                        </span>
                      </div>
                    </span>
                  </h3>
                  <p>Donated Food</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-fun-fact">
                  <div className="icon">
                    <i className="fa fa-star" />
                  </div>
                  <h3>
                    <span
                      className="odometer odometer-auto-theme"
                      data-count={2660}
                    >
                      <div className="odometer-inside">
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">1</span>
                          {/* <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">2</span>
                              </span>
                            </span>
                          </span> */}
                        </span>
                        {/* <span className="odometer-formatting-mark">,</span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">6</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">6</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">00</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">0+</span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </div>
                    </span>
                  </h3>
                  <p>Charity</p>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="single-fun-fact">
                  <div className="icon">
                    <i className="fa fa-download" />
                  </div>
                  <h3>
                    <span
                      className="odometer odometer-auto-theme"
                      data-count={6789}
                    >
                      <div className="odometer-inside">
                        <span className="odometer-digit">
                          <span className="odometer-digit-spacer">3</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">00+</span>
                              </span>
                            </span>
                          </span>
                        </span>
                        {/* <span className="odometer-formatting-mark">,</span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">7</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">8</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                        {/* <span className="odometer-digit">
                          <span className="odometer-digit-spacer">8</span>
                          <span className="odometer-digit-inner">
                            <span className="odometer-ribbon">
                              <span className="odometer-ribbon-inner">
                                <span className="odometer-value">9</span>
                              </span>
                            </span>
                          </span>
                        </span> */}
                      </div>
                    </span>
                  </h3>
                  <p>Donation</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="features-area pb-70 ">
          <div className="container">
            <div className="section-title">
              <h2>Together, We Make a Difference</h2>
              <div className="bar" />
              <p className="fs-6">
                Join us in our mission to share more love, share more hope, and
                share more life. Together, we can create a brighter future for
                all.
              </p>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="single-features">
                  <div className="icon">
                    <i className="fa-solid fa-campground" />
                  </div>
                  <h3>Donate Blood:</h3>
                  <p className="fs-6">
                    Your blood donation can save lives. Join our blood drives or
                    visit our partnering blood banks to make a donation today.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-features">
                  <div className="icon">
                    <i className="fa-solid fa-hand-holding-heart" />
                  </div>
                  <h3>Food Drives:</h3>
                  <p>
                    Organize a food drive in your neighborhood, workplace, or
                    school. Every canned good and non-perishable item collected
                    helps feed a hungry family.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-features">
                  <div className="icon">
                    <i className="fa-solid fa-circle-dollar-to-slot" />
                  </div>
                  <h3>Clothing Drives </h3>
                  <p className="fs-6">
                    Clean out your closets and donate gently-used clothing
                    items. Your old garments can provide warmth and comfort to
                    someone in need.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="default-shape">
            <div className="shape-1">
              <img src="/img/shape/1.png" alt="image1" />
            </div>
            <div className="shape-2 rotateme">
              <img src="/img/shape/2.png" alt="image1" />
            </div>
            <div className="shape-3">
              <img src="/img/shape/7.png" alt="image1" />
            </div>
            <div className="shape-4">
              <img src="/img/shape/7.png" alt="image1" />
            </div>
            <div className="shape-5">
              <img src="/img/shape/6.png" alt="image1" />
            </div>
          </div>
        </section>
        <section className="overview-area ptb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="overview-content">
                  <h3>Donate for #ZeroHunger</h3>
                  <div className="bar" />
                  <p className="fs-5 text-danger">
                    "If you can’t feed a 100 people, then feed just 1 - Mother
                    Teresa"
                  </p>
                  <p className="fs-6 pt-2">
                    Most cities in India have large landfills being filled up
                    with edible food waste. Some cities’ food waste is actually
                    97% of the total solid waste. India wastes nearly 67 million
                    and It amounts to Rs93,000 cr worth of food, which means it
                    can feed the most populated state of Bihar for a complete
                    year. In India, the household food waste estimate is 50 kg
                    per capita per year, or 68,760,163 tonnes a year. Think
                    twice before you waste donate for #zerohunger.
                  </p>
                  <div className="overview-btn">
                    <Link to="/share_food" className="default-btn">
                      Donate Food
                      <span />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="overview-image1">
                  <img src="/img/overview1.png" alt="image1" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="subscribe-area ptb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <div className="subscribe-content">
                  <h2>Ready to Help Save a Life?</h2>
                  <div className="overview-btn">
                    <Link to="/" className="default-btn">
                      Donate More
                      <span />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <h4 className="text-white">Thank You for Your Support!</h4>
                <p className="text-white">
                  Your donation to Share More is more than just a contribution;
                  it’s a lifeline for someone in need. Thank you for your
                  kindness and generosity. Together, we can make a meaningful
                  difference and build a stronger, more compassionate community.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center bg-dark text-white">
          <p className="mb-0 py-2">
            Copyright @ 2024 Share More. Designed By Sangeetha
          </p>
        </div>
      </>
    </>
  );
};

export default Home;
