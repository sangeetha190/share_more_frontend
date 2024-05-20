import React from "react";
import "./Home.css";
// n
const Home = () => {
  return (
    <>
      <section className="banner_image container-fluid p-0  mt-92 bg-black">
        <div className="row align-items-center container h-100">
          <div className="col-md-7 text-white">
            <span className="fs-18 fw-600">Donate Blood</span>
            <h2 className="fs-44 fw-700">What We do</h2>
            <div className="px-2">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>

            <div className="d-flex gap-2">
              <button className="button">
                <i class="fa-solid fa-droplet"></i> Donate
              </button>

              <button className=" button">
                <i class="fa-solid fa-hand-holding-droplet"></i> Receiver
              </button>
            </div>
          </div>
          <div className="col-md-5 d-flex justify-content-end">
            <img src="banner (2).png" alt="" className="w-100" />
          </div>
        </div>
      </section>

      {/* other content */}
      <section className="py-4 text-black bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src="about.png" alt="" className="w-100" />
            </div>

            <div className="col-md-6">
              <span>HELP THE PEOPLE IN NEED</span>

              <h2 className="my-2">Welcome to Blood Donors Organization</h2>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                suspendisse the gravida. Risus commodo viverra maecenas
              </p>
              <div className="row">
                <div className="col-md-4">
                  <ul className="list-unstyled">
                    <li>
                      <i className="fa-solid fa-angles-right"></i> Service
                    </li>
                    <li>
                      <i className="fa-solid fa-angles-right"></i> Service
                    </li>
                    <li>
                      <i className="fa-solid fa-angles-right"></i> Service
                    </li>
                  </ul>
                </div>

                <div className="col-md-4">
                  <ul className="list-unstyled">
                    <li>
                      <i className="fa-solid fa-angles-right"></i> Service
                    </li>
                    <li>
                      <i className="fa-solid fa-angles-right"></i> Service
                    </li>
                    <li>
                      <i className="fa-solid fa-angles-right"></i> Service
                    </li>
                  </ul>
                </div>
              </div>

              <button className="button">
                Apply Now
                <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                  <path
                    clip-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="text-center mb-5">
          <span>What We do</span>
          <h2>We do it for all people</h2>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <i class="fa-solid fa-users fs-40"></i>
              <span>People Registered as Blood Donors</span>

              <h1>12K</h1>
            </div>
          </div>

          <div className="col-md-4">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <i class="fa-solid fa-church fs-40"></i>
              <span>People Charity</span>

              <h1>12K</h1>
            </div>
          </div>

          <div className="col-md-4">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <i class="fa-solid fa-users-viewfinder fs-40"></i>
              <span>People Voulenteer</span>

              <h1>12K</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="news-letter bg-black " id="News-letter">
        <div className="news ">
          <div className="container text-white">
            <h1 className="news-heading">
              Subscribe To Get
              <br /> The Latest News About Us
            </h1>
            <p className="des how-de">
              Get the Latest news about digital Marketing to Your Pocket, drop
              your <br /> email below to get daliy update about us
            </p>

            <form action="">
              <input
                type="email"
                maxlength="50"
                required
                placeholder="Enter your email address"
              />
              <button className="bt button">
                Apply Now
                <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
                  <path
                    clip-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer text-white">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-4 mt-4 col-lg-3 text-center text-sm-start">
              <div className="information">
                <h6 className="footer-heading text-uppercase text-white fw-bold">
                  Information
                </h6>
                <ul className="list-unstyled footer-link mt-4">
                  <li>
                    <a
                      href=" className="
                      className="text-white text-decoration-none fw-semibold"
                    >
                      Events
                    </a>
                  </li>
                  <li>
                    <a
                      href=" className="
                      className="text-white text-decoration-none fw-semibold"
                    >
                      Our Team
                    </a>
                  </li>
                  <li>
                    <a
                      href=" className="
                      className="text-white text-decoration-none fw-semibold"
                    >
                      Upcoming Sale
                    </a>
                  </li>
                  <li>
                    <a
                      href=" className="
                      className="text-white text-decoration-none fw-semibold"
                    >
                      New Launches
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 mt-4 col-lg-3 text-center text-sm-start">
              <div className="resources">
                <h6 className="footer-heading text-uppercase text-white fw-bold">
                  Resources
                </h6>
                <ul className="list-unstyled footer-link mt-4">
                  <li className="mb-1">
                    <a
                      href=" className="
                      className="text-white text-decoration-none fw-semibold"
                    >
                      API
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href=" className="
                      className="text-white text-decoration-none fw-semibold"
                    >
                      Website Tutorials
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      href=" className="
                      className="text-white text-decoration-none fw-semibold"
                    >
                      Third Party
                    </a>
                  </li>
                  <li className="">
                    <a
                      href=" className="
                      className="text-white text-decoration-none fw-semibold"
                    >
                      Video Lectures
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 mt-4 col-lg-4 text-center text-sm-start">
              <div className="contact">
                <h6 className="footer-heading text-uppercase text-white fw-bold">
                  Contact Us
                </h6>
                <address className="mt-4 m-0 text-white mb-1">
                  <i className="bi bi-pin-map fw-semibold"></i> New South Block
                  , Phase 8B , 160055
                </address>
                <a
                  href="tel:+"
                  className="text-white mb-1 text-decoration-none d-block fw-semibold"
                >
                  <i className="bi bi-telephone"></i> 909090XXXX
                </a>
                <a
                  href="mailto:"
                  className="text-white mb-1 text-decoration-none d-block fw-semibold"
                >
                  <i className="bi bi-envelope"></i> xyzdemomail@gmail.com
                </a>
                <a
                  href=""
                  className="text-white text-decoration-none fw-semibold"
                >
                  <i className="bi bi-skype"></i> xyzdemomail
                </a>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 mt-4 col-lg-2 text-center text-sm-start">
              <div className="">
                <h6 className="footer-heading text-uppercase text-white fw-bold">
                  Social
                </h6>
                <ul className="list-inline my-4 d-flex pr-5">
                  <li>
                    <i class="fa-brands fa-facebook"></i>
                  </li>
                  <li>
                    <i class="fa-brands fa-whatsapp"></i>
                  </li>
                  <li>
                    <i class="fa-brands fa-instagram"></i>
                  </li>
                  <li>
                    <i class="fa-brands fa-twitter"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center  text-white mt-4 p-1">
          <p className="mb-0 fw-bold">2023 © All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
