import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin"); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear session
    navigate("/signin"); // Redirect to login
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {isAuthenticated ? (
        <>
          <h2>Welcome to the MainPage!</h2>
          <p>You are now logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MainPage;
