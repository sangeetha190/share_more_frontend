import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";

const Dashboard = () => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    setFormattedDate(`Today (${formattedDate})`);
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div>
      <Layout />

      <div className="page-wrapper">
        <div className="page-content">
          <div className="d-flex justify-content-between flex-column flex-md-row mb-3 mb-md-1">
            <div>
              {/* <!-- Top Welcome Content --> */}
              <h4 className="font-weight-bold1">Welcome Aamir</h4>

              <p>
                All systems are running smoothly! You have
                <span className="text-primary">3 unread alerts!</span>
              </p>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary position-relative"
                id="demo"
              >
                {formattedDate}
              </button>
            </div>
          </div>
          {/* <!-- card content is started --> */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4">
            <div className="col">
              <div className="card radius-10 border-start border-0 border-4 border-info">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Total Orders</p>
                      <h4 className="my-1 text-info">4805</h4>
                      <p className="mb-0 font-13">+2.5% from last week</p>
                    </div>
                    <div className="widgets-icons-2 rounded-circle bg-gradient-blues text-white ms-auto">
                      <i className="bx bxs-cart"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card radius-10 border-start border-0 border-4 border-danger">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Total Revenue</p>
                      <h4 className="my-1 text-danger">$84,245</h4>
                      <p className="mb-0 font-13">+5.4% from last week</p>
                    </div>
                    <div className="widgets-icons-2 rounded-circle bg-gradient-burning text-white ms-auto">
                      <i className="bx bxs-wallet"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card radius-10 border-start border-0 border-4 border-success">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Bounce Rate</p>
                      <h4 className="my-1 text-success">34.6%</h4>
                      <p className="mb-0 font-13">-4.5% from last week</p>
                    </div>
                    <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                      <i className="bx bxs-bar-chart-alt-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card radius-10 border-start border-0 border-4 border-warning">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Total Customers</p>
                      <h4 className="my-1 text-warning">8.4K</h4>
                      <p className="mb-0 font-13">+8.4% from last week</p>
                    </div>
                    <div className="widgets-icons-2 rounded-circle bg-gradient-orange text-white ms-auto">
                      <i className="bx bxs-group"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
