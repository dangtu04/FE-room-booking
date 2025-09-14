import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, roleCode } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null;
  }

  if (!allowedRoles.includes(roleCode)) {
    navigate("/", { replace: true });   
    return null;
  }


  //  if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (!allowedRoles.includes(roleCode)) {
  //   return <Navigate to="/" replace />;
  // }

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login", { replace: true });
  //   } else if (!allowedRoles.includes(roleCode)) {
  //     navigate("/", { replace: true });
  //   }
  // }, [isAuthenticated, roleCode, navigate]);

  return children;
};

export default ProtectedRoute;
