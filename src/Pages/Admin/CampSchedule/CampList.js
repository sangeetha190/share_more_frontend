import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "../../../axios";
import { getUser, handleLogin } from "../../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notify from "../../../components/Notify/Notify";
const PAGE_SIZE = 10; // Number of users per page

const CampList = () => {
  const navigate = useNavigate();
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      axios
        .delete(`/donor/delete/${id}`)
        .then((response) => {
          console.log(response.data.message);
          // Filter out the deleted donor from the donors array
          const updatedDonors = users.filter((donor) => donor._id !== id);
          // Update the donors state with the updated list
          setUsers(updatedDonors);
        })
        .catch((error) => {
          console.error("There was an error deleting the donor!", error);
        });
    }
  };
  return (
    <div>
      <Layout />
      <div className="page-wrapper">
        <div className="page-content">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between  ">
                <h5 class="mb-4 px-2">All Camp Schedule List</h5>
                {/* pagination */}
                {/* Pagination starts */}
                <nav aria-label="Page navigation">
                  <ul className="pagination">
                    <li
                      className={`page-item ${currentPage === 1 && "disabled"}`}
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
              <div className="container table-responsive pb-2">
                <table className="table table-bordered table-hover ">
                  <thead className="thead-dark blue_bg text-white">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">Organizer</th>
                      <th scope="col">Address</th>
                      <th scope="col">Time</th>
                      <th scope="col">Approx_Donor</th>
                      <th scope="col"> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((camp_details, index) => (
                      <tr key={index}>
                        <th scope="row">{indexOfFirstUser + index + 1}</th>
                        <td>
                          {new Date(camp_details.start_date).toLocaleDateString(
                            undefined,
                            {
                              weekday: "long", // to get the full name of the day
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td>
                          {new Date(camp_details.end_date).toLocaleDateString(
                            undefined,
                            {
                              weekday: "long", // to get the full name of the day
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </td>
                        {/* <td>{user.end_date}</td> */}
                        <td>{camp_details.organizer}</td>
                        <td>{camp_details.address}</td>
                        <td>{camp_details.time}</td>
                        <td>{camp_details.approx_donor}</td>
                        <td>
                          {userStatus.role === "admin" && (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm mx-2"
                                onClick={() =>
                                  navigate(`/camp_schedule/${camp_details._id}`)
                                }
                              >
                                Edit
                              </button>
                              {/* <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this donor?"
                                    )
                                  ) {
                                    axios
                                      .delete(`donor/delete/${user._id}`)
                                      .then((response) => {
                                        console.log(response.data.message);
                                        navigate("/all_donor"); // Navigate back to the list of donors
                                      })
                                      .catch((error) => {
                                        console.error(
                                          "There was an error deleting the donor!",
                                          error
                                        );
                                      });
                                  }
                                }}
                              >
                                Delete
                              </button> */}
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(camp_details._id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                          {userStatus.role === "support team" && (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm mx-2"
                                onClick={() =>
                                  navigate(`/camp_schedule/${camp_details._id}`)
                                }
                              >
                                Edit
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CampList;
