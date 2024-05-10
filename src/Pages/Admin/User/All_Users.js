import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "../../../axios";
import { getUser, handleLogin } from "../../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
const All_Users = () => {
  const user_stauts = useSelector(getUser);
  const [users, setUsers] = useState([]);

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
  // if token is not in the localstorage or user value is not in the redux then call the midleware
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && !user_stauts) {
      dispatch(handleLogin(token));
    }
  });
  return (
    <div>
      {" "}
      <Layout />
      <div className="page-wrapper">
        <div className="page-content">
          <div className="card">
            <div className="card-body">
              <h5 class="mb-4 px-2">All Users List</h5>
              <div className="container table-responsive pb-2">
                <table className="table table-bordered table-hover ">
                  <thead className="thead-dark blue_bg text-white">
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Role</th>
                      <th scope="col"> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                      <th scope="row">2</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Otto</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-primary btn-sm mx-2"
                        >
                          Edit
                        </button>
                        <button type="button" class="btn btn-danger btn-sm ">
                          Delete
                        </button>
                      </td>
                    </tr> */}
                    {users.map((user, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.contactNumber}</td>
                        <td>{user.role}</td>
                        <td>
                          {/* {user.name} */}
                          {/* <button
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
                          </button> */}
                          {user_stauts.role === "admin" && (
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
                          {user_stauts.role === "support team" && (
                            <>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm mx-2"
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
      {/* </div> */}
    </div>
  );
};

export default All_Users;
