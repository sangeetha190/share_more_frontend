import React, { useEffect, useState } from "react";

import axios from "../../../axios";
import { getUser, handleLogin } from "../../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notify from "../../../components/Notify/Notify";
import "./campScheduleData.css";
import campImg from "../../../assets/images/banner_image/camp_banner.png";
import Footer from "../../../components/Footer/Footer";
const PAGE_SIZE = 10; // Number of users per page

const CampSceduleData_list = () => {
  //   const navigate = useNavigate();
  const userStatus = useSelector(getUser);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [donors, setDonors] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.message && location.state.imgUrl) {
      // toast(
      //   <Notify
      //     message={location.state.message}
      //     imgUrl={location.state.imgUrl}
      //   />,{}
      // );
      toast(
        <Notify
          message={location.state.message}
          imgUrl={location.state.imgUrl}
        />,
        {
          position: location.state.position || "bottom-right", // Default to "top-right" if not provided
          progressClassName: {
            backgroundColor: location.state.progressColor || "#fbbd08", // Default to yellow if not provided
          },
        }
      );
    }
  }, [location]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/camp_schedule/list");
        setUsers(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * PAGE_SIZE;
  const indexOfFirstUser = indexOfLastUser - PAGE_SIZE;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / PAGE_SIZE);

  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !userStatus) {
      dispatch(handleLogin(token));
    }
  });

  return (
    <>
      <div>
        {/* <Layout /> */}
        {/* <div className="page-wrapper"> */}
        {/* <div className="page-content"> */}
        <div className="mt-4">
          <img
            src={campImg}
            alt="blood_camp_image"
            className="w-100 h-100"
            style={{ objectFit: "contain", marginTop: "25px" }}
          />
        </div>

        <div className="mt-3 container">
          <div className="card">
            <div className="card-body">
              {/* <div className="container"> */}
              <div className="row">
                <div className="mx-auto px-4">
                  <div className="d-flex justify-content-between  ">
                    <h5 class="mb-4 px-2">All Camp Schedule List</h5>
                    {/* pagination */}
                    {/* Pagination starts */}
                    <nav aria-label="Page navigation">
                      <ul className="pagination">
                        <li
                          className={`page-item ${
                            currentPage === 1 && "disabled"
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            Previous
                          </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              currentPage === index + 1 && "active"
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentPage === totalPages && "disabled"
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                    {/*  pagination ends*/}
                  </div>
                  <div className="table-responsive pb-2">
                    <table className="table table-bordered table-hover ">
                      <thead className="thead-dark red_bg text-white">
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Start Date</th>
                          <th scope="col">End Date</th>
                          <th scope="col">Organizer</th>
                          <th scope="col">Address</th>
                          <th scope="col">Start Time</th>
                          <th scope="col">End Time</th>
                          <th scope="col">Approx_Donor</th>
                          {/* <th scope="col"> Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {currentUsers.map((camp_details, index) => (
                          <tr key={index}>
                            <th scope="row">{indexOfFirstUser + index + 1}</th>
                            <td>
                              {new Date(
                                camp_details.start_date
                              ).toLocaleDateString(undefined, {
                                weekday: "long", // to get the full name of the day
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </td>
                            <td>
                              {new Date(
                                camp_details.end_date
                              ).toLocaleDateString(undefined, {
                                weekday: "long", // to get the full name of the day
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </td>
                            {/* <td>{user.end_date}</td> */}
                            <td>{camp_details.organizer}</td>
                            <td>{camp_details.address}</td>
                            <td>{camp_details.start_time}</td>
                            <td>{camp_details.end_time}</td>
                            <td>{camp_details.approx_donor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* </div> */}
                {/* </div> */}
                {/* //   </div> */}
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CampSceduleData_list;
