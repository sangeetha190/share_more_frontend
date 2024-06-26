import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "../../../axios";
import { getUser, handleLogin } from "../../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import UserImg from "../../../assets/images/banner_image/user_icon.png";
import { ToastContainer, toast } from "react-toastify";
import Notify from "../../../components/Notify/Notify";
const PAGE_SIZE = 10; // Number of users per page

const Donor = () => {
  // const navigate = useNavigate();
  const userStatus = useSelector(getUser);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [donors, setDonors] = useState([]);
  useEffect(() => {
    const userCreated = localStorage.getItem("userCreated");
    if (userCreated) {
      // toast.success("User created successfully");
      toast(<Notify message="Created successfully" imgUrl={UserImg} />);
      localStorage.removeItem("userCreated"); // Remove the flag after showing the notification
    }
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/donor/list");
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
  // bnnb

  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !userStatus) {
      dispatch(handleLogin(token));
    }
  });

  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this donor?")) {
  //     axios
  //       .delete(`/donor/delete/${id}`)
  //       .then((response) => {
  //         console.log(response.data.message);
  //         // Filter out the deleted donor from the donors array
  //         const updatedDonors = users.filter((donor) => donor._id !== id);
  //         // Update the donors state with the updated list
  //         setUsers(updatedDonors);
  //       })
  //       .catch((error) => {
  //         console.error("There was an error deleting the donor!", error);
  //       });
  //   }
  // };
  const isEligibleToDonate = (lastDonationDate) => {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    return new Date(lastDonationDate) <= twoMonthsAgo;
  };
  return (
    <div>
      <Layout />
      <div className="page-wrapper">
        <div className="page-content">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between  ">
                <h5 class="mb-4 px-2">All Donor List</h5>
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
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">BloodType</th>
                      <th scope="col">Status</th>
                      <th scope="col">Donate or Not</th>
                      {/* <th scope="col"> Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user, index) => (
                      <tr key={index}>
                        <th scope="row">{indexOfFirstUser + index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.contactNumber}</td>
                        <td>{user.bloodType}</td>
                        <td>
                          {user.last_donation_date
                            ? new Date(user.last_donation_date).toLocaleString()
                            : "No Appointment"}
                        </td>
                        <td
                          style={{
                            backgroundColor: isEligibleToDonate(
                              user.last_donation_date
                            )
                              ? "green"
                              : "red",
                          }}
                          className="text-white"
                        >
                          {isEligibleToDonate(user.last_donation_date)
                            ? "Eligible to donate"
                            : "Not eligible yet"}
                        </td>
                        {/* <td>
                            {userStatus.role === "admin" && (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm mx-2"
                                  onClick={() =>
                                    navigate(`/edit-donor/${user._id}`)
                                  }
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleDelete(user._id)}
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
                                    navigate(`/edit-donor/${user._id}`)
                                  }
                                >
                                  Edit
                                </button>
                              </>
                            )}
                          </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donor;
