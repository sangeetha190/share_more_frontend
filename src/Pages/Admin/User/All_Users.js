import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "../../../axios";
import { getUser, handleLogin } from "../../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Notify from "../../../components/Notify/Notify";
import HelpOthersImg from "../../../assets/images/banner_image/user_icon.png";
const PAGE_SIZE = 10; // Number of users per page

const All_Users = () => {
  const userStatus = useSelector(getUser);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const userCreated = localStorage.getItem("userCreated");
    if (userCreated) {
      // toast.success("User created successfully");
      toast(<Notify message="Created successfully" imgUrl={HelpOthersImg} />);
      localStorage.removeItem("userCreated"); // Remove the flag after showing the notification
    }
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user/all_users");
        setUsers(response.data);
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
    <div>
      <Layout />
      <div className="page-wrapper">
        <div className="page-content">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between  ">
                <h5 class="mb-4 px-2">All Users List</h5>
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
                      <th scope="col">Role</th>
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
                        <td>{user.role}</td>
                        {/* <td>
                          {userStatus.role === "admin" && (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm mx-2"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
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

export default All_Users;
