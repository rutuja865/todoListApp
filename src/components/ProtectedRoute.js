import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  console.log(children)

  if (!token) {
    return <Navigate to="/" state={{ from: location.pathname, message: "Please log in first." }} replace />;
  }

  return children;
};

export default ProtectedRoute;
