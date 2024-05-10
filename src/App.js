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
import Team_Register from "./Pages/Admin/Support_team/Team_Register";
import Create_User from "./Pages/Admin/User/Create_User";
import All_Users from "./Pages/Admin/User/All_Users";
// import AdminLogin from "./Pages/Admin/Login/Login";

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
                <Header />
                <Sample />
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* safe */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/support_team" element={<Team_Register />} />
          <Route path="/create_user" element={<Create_User />} />
          <Route path="/all_users" element={<All_Users />} />
          {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
