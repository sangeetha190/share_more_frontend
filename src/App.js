import React from "react";
import "./assets/css/app.css";
// import "./assets/js/own.js";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
import CreateOrg from "./Pages/Admin/Organization/CreateOrg";
import ListOrg from "./Pages/Admin/Organization/ListOrg";
import EditOrg from "./Pages/Admin/Organization/EditOrg";
import ShareFood from "./Pages/User/ShareFood/ShareFood";
import ClothesDonation from "./Pages/User/ClothesDonation/ClothesDonation";
import BloodRequestMessage from "./Pages/User/BloodRequestMessage/BloodRequestMessage";
import SearchCamp from "./Pages/User/CampScheduleData_list/SearchCamp";
import RazorpayPayment from "./Pages/User/RazorpayPayment";
import AllHistory from "./Pages/User/History/AllHistory";
import PaymentHistory from "./Pages/Admin/PaymentHistory/PaymentHistory";
import DonateOrNot from "./Pages/Admin/Appoinment/DonateOrNot";
import BloodForwardMsgM from "./Pages/User/BloodRequestMessage/BloodForwardMsgM";
import OTPVerify from "./Pages/User/Donor/Register/OTPVerify";
import FoodAppoinment from "./Pages/Admin/Food/FoodAppoinment";
import ClotheAppoinment from "./Pages/Admin/Clothes/ClotheAppoinment";
import FoodUniqueID from "./Pages/Admin/Food/FoodUniqueID";
import ClothesUnique from "./Pages/Admin/Clothes/ClothesUnique";
import { useSelector } from "react-redux";
import { getUser } from "./slices/userSlice";
import NotFound from "./components/NotFound";
import Typesofblood from "./Pages/User/TypesofBlood/Typesofblood";
const App = () => {
  const user_stauts = useSelector(getUser);
  const isAdmin = () => {
    return (
      user_stauts &&
      (user_stauts.role === "admin" || user_stauts.role === "support team")
    );
  };
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

          <Route
            path="/share_food"
            element={
              <>
                <Header />
                <ShareFood />
              </>
            }
          />
          <Route
            path="/clothes_donation"
            element={
              <>
                <Header />
                <ClothesDonation />
              </>
            }
          />
          <Route
            path="/bloodrequestmessage"
            element={
              <>
                <Header />
                <BloodRequestMessage />
              </>
            }
          />

          <Route
            path="/bloodforwardmsg"
            element={
              <>
                <Header />
                <BloodForwardMsgM />
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
          path="/all_camp_schedule"
          element={
            <>
              <Header />
              <CampSceduleDataList />
            </>
          }
        />
        <Route
          path="/search_camp"
          element={
            <>
              <Header />
              <SearchCamp />
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
        <Route
          path="/types_of_blood"
          element={
            <>
              <Header />
              <Typesofblood />
            </>
          }
        />
        <Route
          path="/razorpaymethod"
          element={
            <>
              <Header />
              <RazorpayPayment />
            </>
          }
        />
        <Route
          path="/all_history"
          element={
            <>
              <Header />
              <AllHistory />
            </>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <>
              <Header />
              <OTPVerify />
            </>
          }
        />
        {/* Admin Side */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={isAdmin() ? <Dashboard /> : <NotFound />}
          />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {isAdmin() ? (
            <>
              {" "}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/support_team" element={<TeamRegister />} />
              <Route path="/create_user" element={<CreateUser />} />
              <Route path="/all_users" element={<AllUsers />} />
              <Route path="/all_donor" element={<BDonor />} />
              <Route path="/create_donor" element={<CreateDonor />} />
              {/* <Route path="/edit_donor" element={<EditDonor />} /> */}
              <Route path="/edit-donor/:id" element={<EditDonor />} />
              <Route path="/appoinment_List" element={<AppoinmentList />} />
              <Route path="/unique_id" element={<DonateOrNot />} />
              <Route
                path="/food_appoinment_list"
                element={<FoodAppoinment />}
              />
              <Route path="/food_unique_id" element={<FoodUniqueID />} />
              <Route
                path="/clothe_appoinment_list"
                element={<ClotheAppoinment />}
              />
              <Route path="/clothe_unique_id" element={<ClothesUnique />} />
              {/* Camp Schedule */}
              <Route
                path="/camp_schedule_create"
                element={<CampScheduleCreate />}
              />
              <Route path="/camp_schedule_list" element={<CampList />} />
              <Route path="/camp_schedule/:id" element={<EditCampSchedule />} />
              {/* or */}
              <Route path="/org_list" element={<ListOrg />} />
              <Route path="/create_org" element={<CreateOrg />} />
              <Route path="/edit-org/:id" element={<EditOrg />} />
              <Route path="/payment_history" element={<PaymentHistory />} />
            </>
          ) : (
            <Route path="*" element={<NotFound />} />
          )}
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
