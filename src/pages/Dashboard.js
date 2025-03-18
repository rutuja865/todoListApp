import React from "react";
import { useNavigate } from "react-router-dom";
import TodoApp from '../components/TodoApp';
const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/"); // Redirect to login
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to the Dashboard!</h2>
      <p>You are now logged in.</p>
      <button onClick={handleLogout}>Logout</button>
      <TodoApp/>
    </div>
  );
};

export default Dashboard;
