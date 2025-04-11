import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../redux/authSlice"; // Import login action

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from || "/dashboard"; // Redirect location after login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to authenticate the user
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      const token = response.data.token; // Extract the token from the response

      // Dispatch the login action to update Redux state
      dispatch(login(token));

      // Store the token in sessionStorage for persistence
      sessionStorage.setItem("token", token);

      setMessage("Login successful!");
      navigate(from, { replace: true }); // Redirect to the intended page
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      {location.state?.message && <p style={{ color: "red" }}>{location.state.message}</p>}
      
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
        <button className="loginlogout" type="submit">Login</button>
      </form>
      <p>{message}</p>
      <p>Email Id: eve.holt@reqres.in | Password: cityslicka</p>
    </div>
  );
};

export default Login;
