import React from "react";
// import "antd/dist/antd.less"; // or 'antd/dist/antd.less'
// import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./assets/css/app.css";
// import "./assets/js/own.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Sample from "./Pages/Sample";
import Login from "./Pages/Login/Login";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import TeamRegister from "./Pages/Admin/Support_team/Team_Register";
import CreateUser from "./Pages/Admin/User/Create_User";
import AllUsers from "./Pages/Admin/User/All_Users";
import AdminLogin from "./Pages/Admin/Login/Login";
import DonorRegister from "./Pages/User/Donor/Register/DonorRegister";
import LoginEmail from "./Pages/User/Donor/LoginEmail/LoginEmail";
import LookingForBlood from "./Pages/User/LookingForBlood/LookingForBlood";
import BDonor from "./Pages/Admin/Donor/Donor";
import CreateDonor from "./Pages/Admin/Donor/CreateDonor";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Need to  Login before use */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/sample"
            element={
              <>
                {/* <Header /> */}
                <Sample />
              </>
            }
          />
          {/* user Looking for blood */}
          <Route
            path="/looking_for_blood"
            element={
              <>
                <Header />
                <LookingForBlood />
              </>
            }
          />
        </Route>
        {/* Without Login you can access */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header />
              <Register />
            </>
          }
        />

        <Route
          path="/donor/register"
          element={
            <>
              <Header />
              <DonorRegister />
            </>
          }
        />
        <Route
          path="/donor/login1"
          element={
            <>
              <Header />
              <LoginEmail />
            </>
          }
        />

        {/* Admin Side */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/support_team" element={<TeamRegister />} />
          <Route path="/create_user" element={<CreateUser />} />
          <Route path="/all_users" element={<AllUsers />} />
          <Route path="/all_donor" element={<BDonor />} />
          <Route path="/create_donor" element={<CreateDonor />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
