import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import TodoApp from "../components/TodoApp";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear Redux state
    navigate("/"); // Redirect to login page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to the Dashboard!</h2>
      <p>You are now logged in.</p>
      <button onClick={handleLogout}>Logout</button>
      <TodoApp />
    </div>
  );
};

export default Dashboard;
