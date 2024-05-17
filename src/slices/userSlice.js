import { createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //   user data storting
    setUser: (state, action) => {
      state.user = action.payload;
    },
    //   user data clearing
    logout: (state, action) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export const getUser = (state) => state.userInfo.user;
// "userInfo" store name ;

export default userSlice.reducer;

// middleware action
export const handleLogin = (token) => {
  return async (dispatch) => {
    const response = await axios.get("/user/get/data", {
      headers: {
        Authorization: token,
      },
    });
    dispatch(setUser(response.data));
    console.log(response);
  };
};

export const DonorhandleLogin = (token) => {
  return async (dispatch) => {
    const response = await axios.get("/donor/get/data", {
      headers: {
        Authorization: token,
      },
    });
    dispatch(setUser(response.data));
    console.log(response);
  };
};
