import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "../../../axios";
import { getUser } from "../../../slices/userSlice";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import mailImg from "../../../assets/images/banner_image/drop.png";
import blood_campImg from "../../../assets/images/banner_image/camp.png";
import donationImg from "../../../assets/images/banner_image/donation.png";
import userImg from "../../../assets/images/banner_image/user.png";
const Dashboard = () => {
  const [formattedDate, setFormattedDate] = useState("");
  const [userCount, setuserCount] = useState("");
  const [DonorCount, setDonorCount] = useState("");
  const [totalDonations, setTotalDonations] = useState("");
  const [totalCamps, setTotalCamps] = useState("");
  const user_stauts = useSelector(getUser);
  // const navigate = useNavigate();
  // if token is not in the localstorage or user value is not in the redux then call the midleware
  // const dispatch = useDispatch();
  useEffect(() => {
    const today = new Date();
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    setFormattedDate(`Today (${formattedDate})`);
  }, []); // Empty dependency array to run the effect only once when the component mounts
  // user/totalUsers
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user/totalUsers");
        setuserCount(response.data.totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // donor/api/totalDonors
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("donor/api/totalDonors");
        setDonorCount(response.data.totalDonors);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchDonors();
  }, []);
  // razorpay_method/api/totalDonations
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("razorpay_method/api/totalDonations");
        setTotalDonations(response.data.totalDonations);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchDonors();
  }, []);
  // camp_schedule/api/totalCamps
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("camp_schedule/api/totalCamps");
        setTotalCamps(response.data.totalCamps);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchDonors();
  }, []);
  return (
    <div>
      <Layout />

      <div className="page-wrapper">
        <div className="page-content">
          <div className="d-flex justify-content-between flex-column flex-md-row mb-3 mb-md-1">
            <div>
              {/* <!-- Top Welcome Content --> */}
              <h4 className="font-weight-bold1">Welcome {user_stauts.name}</h4>
              <p>
                All systems are running smoothly!...
                {/* <span className="text-primary">3 unread alerts!</span> */}
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
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 box_shadow_style">
            <div className="col">
              <div className="card radius-10 border-start border-0 border-4 border-info">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">Total Users</p>
                      <h4 className="my-1 text-info">{userCount}</h4>
                      {/* <p className="mb-0 font-13">+2.5% from last week</p> */}
                    </div>
                    <div className="rounded-circle bg-white text-white ms-auto">
                      {/* <i class="fa-solid fa-circle-user fs-2"></i> */}
                      <img
                        src={userImg}
                        alt="drop_image"
                        style={{ width: "80px" }}
                      />
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
                      <p className="mb-0 text-secondary">Total blood Donors</p>
                      <h4 className="my-1 text-danger">{DonorCount}</h4>
                      {/* <p className="mb-0 font-13">+5.4% from last week</p> */}
                    </div>

                    <div className="rounded-circle bg-gradient-burning text-white ms-auto">
                      {/* <i class="fa-solid fa-circle-user fs-2"></i> */}
                      <img
                        src={mailImg}
                        alt="drop_image"
                        style={{ width: "75px" }}
                      />
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
                      <p className="mb-0 text-secondary">Total Camps</p>
                      <h4 className="my-1 text-success">{totalCamps}</h4>
                      {/* <p className="mb-0 font-13">-4.5% from last week</p> */}
                    </div>
                    <div className=" rounded-circle bg-white text-white ms-auto">
                      {/* <i class="fa-solid fa-circle-user fs-2"></i> */}
                      <img
                        src={blood_campImg}
                        alt="drop_image"
                        style={{ width: "105px" }}
                      />
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
                      <p className="mb-0 text-secondary">Total Donation</p>
                      <h4 className="my-1 text-warning">{totalDonations}</h4>
                      {/* <p className="mb-0 font-13">+8.4% from last week</p> */}
                    </div>
                    <div className="rounded-circle  text-white ms-auto">
                      {/* <i class="fa-solid fa-circle-user fs-2"></i> */}
                      <img
                        src={donationImg}
                        alt="drop_image"
                        style={{ width: "74px" }}
                        className="p-0"
                      />
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
