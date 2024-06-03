import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="subscribe-area ptb-100 mt-5">
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
                it’s a lifeline for someone in need. Thank you for your kindness
                and generosity. Together, we can make a meaningful difference
                and build a stronger, more compassionate community.
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
    </div>
  );
};

export default Footer;
