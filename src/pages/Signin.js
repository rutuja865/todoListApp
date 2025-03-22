import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Mock user credentials
  const mockUser = {
    email: "test@example.com",
    password: "password123",
    token: "mock-token-12345", // Simulated token
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === mockUser.email && password === mockUser.password) {
        localStorage.setItem("token", mockUser.token); // Store token
      setMessage("Login successful!");
      navigate("/mainpage", { replace: true }); // Redirect to dashboard
    } else {
      setMessage("Login failed. Invalid credentials.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Sign In</h2>
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
      <p>Use: test@example.com | password123</p>
    </div>
  );
};

export default Signin;
