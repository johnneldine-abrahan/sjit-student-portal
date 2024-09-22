import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import icons
import { useNavigate } from "react-router-dom";
import "./components/Login/Login.css";
import login_logo from "../img/Login/login-logo.png";
import welcome_img from "../img/Login/welcome-img.png";

const Login = () => {
  useEffect(() => {
    document.title = "SJIT - Log in";
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: Username, password: Password }),
        });

        if (response.ok) {
            const data = await response.json();
            const { token, userRole } = data;

            // Store the token in localStorage
            localStorage.setItem('token', token);

            // Redirect based on role
            if (userRole === 'Admin' || userRole === 'Registrar') {
                navigate("/admin/dashboard");
            } else if (userRole === 'Finance') {
                navigate("/finance/dashboard");
            } else if (userRole === 'Student') {
                navigate("/student/dashboard");
            } else if (userRole === 'Faculty') {
                navigate("/faculty/dashboard");
            }
        } else {
            const errorMsg = await response.text();
            setError(errorMsg);
        }
    } catch (error) {
        setError("Server error. Please try again later.");
    }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleindexClick = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src={login_logo}
          alt=""
          className="login-logo"
          onClick={handleindexClick}
        />
        <div className="login-main">
          <h2>Log in</h2>
          <p>Enter your account details</p>
          {error && <p style={{ color: "red", fontWeight: 600 }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="login-btn">
              Log in
            </button>
          </form>
        </div>
      </div>
      <div className="login-right">
        <h1>Welcome to</h1>
        <h2>San Juan Institute of Technology</h2>
        <p>Turning your dreams into reality</p>
        <img src={welcome_img} className="welcome_img" alt="" />
      </div>
    </div>
  );
};

export default Login;