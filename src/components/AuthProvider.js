// src/components/AuthProvider.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, restoreUser } from "../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      try {
        const decodedToken = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decodedToken.exp < now) {
          // Token has expired
          notification.warning({
            message: "Session Expired",
            description: "Your session has expired. Please log in again.",
          });
          dispatch(logout());

          navigate("/login");
          return;
        } else {
          const user = JSON.parse(userData);
          const roleCode = decodedToken.roleCode;
            const propertyId = decodedToken.propertyId;
          dispatch(restoreUser({ token, ...user, roleCode, propertyId }));
        }
      } catch (e) {
        dispatch(logout());
      }
    }
  }, []);

  return children;
};

export default AuthProvider;
