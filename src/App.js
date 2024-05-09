import React from "react";
// import "antd/dist/antd.less"; // or 'antd/dist/antd.less'
// import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Sample from "./Pages/Sample";
import Login from "./Pages/Login/Login";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute";

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
      </Routes>
    </Router>
  );
};

export default App;
