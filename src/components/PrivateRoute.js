import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const location = useLocation();

  return isAuthenticated ? (
    children ? children : <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location.pathname, message: "Please sign in first." }} replace />
  );
};

export default PrivateRoute;
