import React from "react";
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
import EditDonor from "./Pages/Admin/Donor/EditDonor";
import DonorAppointment from "./Pages/User/Donor/Appointment/DonorAppointment";
import AppoinmentList from "./Pages/Admin/Appoinment/AppoinmentList";
import CampScheduleCreate from "./Pages/Admin/CampSchedule/CampScheduleCreate";
import CampList from "./Pages/Admin/CampSchedule/CampList";
import EditCampSchedule from "./Pages/Admin/CampSchedule/EditCampSchedule";
import CampSceduleDataList from "./Pages/User/CampScheduleData_list/CampSceduleData_list";
import PageUnderMaintance from "./components/PageUnderMaintance/PageUnderMaintance";

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
        <Route
          path="/donor/appointment"
          element={
            <>
              <Header />
              <DonorAppointment />
            </>
          }
        />
        <Route
          path="/all_camp_schedule"
          element={
            <>
              <Header />
              <CampSceduleDataList />
            </>
          }
        />
        <Route
          path="/page_under_maintance"
          element={
            <>
              <Header />
              <PageUnderMaintance />
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

          {/* <Route path="/edit_donor" element={<EditDonor />} /> */}
          <Route path="/edit-donor/:id" element={<EditDonor />} />
          <Route path="/appoinment_List" element={<AppoinmentList />} />

          {/* Camp Schedule */}
          <Route
            path="/camp_schedule_create"
            element={<CampScheduleCreate />}
          />

          <Route path="/camp_schedule_list" element={<CampList />} />
          <Route path="/camp_schedule/:id" element={<EditCampSchedule />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
