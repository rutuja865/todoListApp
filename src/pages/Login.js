import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../redux/authSlice"; // Adjust path if needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from || "/dashboard"; // Get previous route or default to dashboard

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token); // Store token in localStorage
      dispatch(setAuthToken(token)); // Store token in Redux

      setMessage("Login successful!");
      navigate(from, { replace: true }); // Redirect to the intended page
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      {location.state?.message && <p style={{ color: "red" }}>{location.state.message}</p>} {/* Show message if redirected */}
      
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <p>Email Id is eve.holt@reqres.in & password is cityslicka</p>
    </div>
  );
};

export default Login;
