import React, { useEffect, useState } from "react";
import "./history.css";
import axios from "../../../axios";
import Footer from "../../../components/Footer/Footer";
const AllHistory = () => {
  const [clothesHistory, setclothesHistory] = useState([]);
  const [DonorHistory, setDonorHistory] = useState([]);
  const [paymentHistory, setpaymentHistory] = useState([]);
  const [FoodHistory, setFoodHistory] = useState([]);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()}`;
  };
  // Paymenthistroy info
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in again.");
        }
        const response = await axios.get("/razorpay_method/user-payments", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setpaymentHistory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchHistory();
  }, []);
  // clothes_donation/user-clothes_info
  useEffect(() => {
    const fetch_Clothes_History = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in again.");
        }
        const response = await axios.get(
          "/clothes_donation/user-clothes_info",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setclothesHistory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetch_Clothes_History();
  }, []);
  // blood_donor_appointment/user-donor_info
  useEffect(() => {
    const fetch_Donor_App_History = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in again.");
        }
        const response = await axios.get(
          "/blood_donor_appointment/user-donor_info",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDonorHistory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetch_Donor_App_History();
  }, []);

  // share_food/user-food_history
  useEffect(() => {
    const fetch_Food_History = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in again.");
        }
        const response = await axios.get("/share_food/user-food_history", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFoodHistory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetch_Food_History();
  }, []);
  return (
    <div>
      <>
        <div className="mt-5 pt-5 container-md">
          <div className="card mt-4">
            <div className="card-body">
              <div className="row">
                <div className="mx-auto px-4">
                  <h4 className="display-7">History</h4>
                  {/* <img
                    src="https://img.freepik.com/premium-vector/modern-3d-illustration-credit-card-accept-concept_145666-1892.jpg"
                                      alt="pay"
                                      width={"50px"}
                  /> */}
                  <div className="py-4 d-flex align-items-start   flex-md-row flex-sm-column flex-row">
                    <div className="">
                      <ul
                        className="nav nav-pills flex-column nav-pills border-end border-3 me-3 history_side_nav"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link text-primary fw-semibold active position-relative"
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                          >
                            Food
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link text-primary fw-semibold position-relative"
                            id="pills-profile-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-profile"
                            type="button"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected="false"
                          >
                            Clothes
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link text-primary fw-semibold position-relative"
                            id="pills-donor-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-donor"
                            type="button"
                            role="tab"
                            aria-controls="pills-donor"
                            aria-selected="false"
                          >
                            Donor
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link text-primary fw-semibold position-relative"
                            id="pills-contact-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-contact"
                            type="button"
                            role="tab"
                            aria-controls="pills-contact"
                            aria-selected="false"
                          >
                            Payment
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="tab-content border rounded-3 border-primary p-3 text-danger w-100 border-grey"
                      id="pills-tabContent"
                    >
                      <div
                        className="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        {/* FoodHistory */}
                        <h5 className="text-black">Food History</h5>
                        <div className="table-responsive">
                          <table className="table">
                            <thead className="text-center">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Max_Number</th>
                                <th scope="col">Charity Name</th>
                                <th scope="col">Place</th>
                                <th scope="col">Status</th>
                                <th scope="col">Unique_ID</th>
                                <th scope="col">Method</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {FoodHistory.length === 0 ? (
                                <tr>
                                  <td colSpan="7" className="text-center">
                                    No Food history available.
                                  </td>
                                </tr>
                              ) : (
                                <>
                                  {" "}
                                  {FoodHistory.map((data, index) => (
                                    <tr key={index}>
                                      <th scope="row">{index + 1}</th>
                                      {/* <td className="text-capitalize">
                                      {data.userId.name}
                                    </td> */}

                                      <td>{formatDate(data.date)}</td>
                                      <td>{data.maxMember}</td>
                                      <td className="text-capitalize">
                                        {data.charityId.name}
                                      </td>
                                      <td className="text-capitalize">
                                        {data.district}
                                      </td>
                                      {/*    <td className={`text-capitalize ${data.status === 'pending' ? 'pending_bg' : data.status === 'completed' ? 'success_bg' : ''}`}> */}
                                      <td className="text-capitalize">
                                        <span
                                          className={`${
                                            data.status === "pending"
                                              ? "pending_bg"
                                              : data.status === "completed"
                                              ? "success_bg"
                                              : ""
                                          }`}
                                        >
                                          {data.status}
                                        </span>
                                      </td>
                                      <td>{data.uniqueId}</td>

                                      <td>
                                        {" "}
                                        <span className="pending_bg">
                                          {`${
                                            data.action === "collect"
                                              ? "We will collect"
                                              : data.action === "visit"
                                              ? "Visit"
                                              : ""
                                          }`}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* Clothes Starts */}
                      <div
                        className="tab-pane fade"
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                      >
                        <h5 className="text-black">
                          Clothes and Things History
                        </h5>
                        <div className="table-responsive">
                          <table className="table">
                            <thead className="text-center">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Unique_ID</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {clothesHistory.length === 0 ? (
                                <tr>
                                  <td colSpan="7" className="text-center">
                                    No Donor history available.
                                  </td>
                                </tr>
                              ) : (
                                <>
                                  {" "}
                                  {clothesHistory.map((data, index) => (
                                    <tr key={index}>
                                      <th scope="row">{index + 1}</th>
                                      <td className="text-capitalize">
                                        {data.userId.name}
                                      </td>

                                      <td>{formatDate(data.date)}</td>
                                      {/*    <td className={`text-capitalize ${data.status === 'pending' ? 'pending_bg' : data.status === 'completed' ? 'success_bg' : ''}`}> */}
                                      <td className="text-capitalize">
                                        <span
                                          className={`${
                                            data.status === "pending"
                                              ? "pending_bg"
                                              : data.status === "completed"
                                              ? "success_bg"
                                              : ""
                                          }`}
                                        >
                                          {data.status}
                                        </span>
                                      </td>
                                      <td>{data.uniqueId}</td>
                                    </tr>
                                  ))}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* Clothes  Ends */}
                      {/* Donor  Starts */}
                      <div
                        className="tab-pane fade"
                        id="pills-donor"
                        role="tabpanel"
                        aria-labelledby="pills-donor-tab"
                      >
                        <h5 className="text-black">Blood Donor History</h5>
                        <div className="table-responsive">
                          <table className="table">
                            <thead className="text-center">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Appointment Date</th>
                                {/* <th scope="col">Hosptial Name</th> */}
                                {/* <th scope="col">Place</th> */}
                                <th scope="col">Unique_ID</th>
                                <th scope="col">Status</th>
                                <th scope="col">Reminder Method</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {DonorHistory.length === 0 ? (
                                <tr>
                                  <td colSpan="7" className="text-center">
                                    No Donor history available.
                                  </td>
                                </tr>
                              ) : (
                                <>
                                  {" "}
                                  {DonorHistory.map((data, index) => (
                                    <tr key={index}>
                                      <th scope="row">{index + 1}</th>
                                      <td className="text-capitalize">
                                        {data.donor_id.name}
                                      </td>

                                      <td>
                                        {formatDate(data.appointment_date)}
                                      </td>
                                      {/* <td className="text-capitalize">
                                        {data.hosptial_blood_bank_id.name}
                                      </td>
                                      <td>
                                        {data.hosptial_blood_bank_id.district}
                                      </td> */}
                                      <td>{data.unique_id}</td>
                                      <td className="text-capitalize">
                                        <span
                                          className={`${
                                            data.status === "pending"
                                              ? "pending_bg"
                                              : data.status === "done"
                                              ? "success_bg"
                                              : ""
                                          }`}
                                        >
                                          {data.status}
                                        </span>
                                      </td>

                                      <td className="text-capitalize">
                                        {data.reminder_method}
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* Payment  Ends */}
                      {/* Payment  Starts */}
                      <div
                        className="tab-pane fade"
                        id="pills-contact"
                        role="tabpanel"
                        aria-labelledby="pills-contact-tab"
                      >
                        <h5 className="text-black">Donation Payment History</h5>
                        <div className="table-responsive">
                          <table className="table">
                            <thead className="text-center">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Payment_Id</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {paymentHistory.length === 0 ? (
                                <tr>
                                  <td colSpan="7" className="text-center">
                                    No payment history available.
                                  </td>
                                </tr>
                              ) : (
                                <>
                                  {" "}
                                  {paymentHistory.map((data, index) => (
                                    <tr key={index}>
                                      <th scope="row">{index + 1}</th>
                                      <td className="text-capitalize">
                                        {data.userId.name}
                                      </td>
                                      <td>{data.razorpay_payment_id}</td>
                                      <td>{data.amount}</td>
                                      <td>{formatDateTime(data.createdAt)}</td>
                                      <td className="text-capitalize">
                                        <span className="success_bg">
                                          Successful
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* Payment  Ends */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* test 2 */}
        <Footer />
      </>
    </div>
  );
};

export default AllHistory;
