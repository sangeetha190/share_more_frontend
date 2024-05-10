import { getUser, handleLogin, logout } from "../../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
const user_stauts = useSelector(getUser);

// if token is not in the localstorage or user value is not in the redux then call the midleware
const dispatch = useDispatch();
useEffect(() => {
  let token = localStorage.getItem("token");
  if (token && !user_stauts) {
    dispatch(handleLogin(token));
  }
});

{
  user_stauts.role;
}
