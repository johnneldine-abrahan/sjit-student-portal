import React from 'react'
import './components/Login/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import login_logo from '../img/Login/login-logo.png'
import welcome_img from '../img/Login/welcome-img.png'


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleindexClick = () => {
     navigate('/')
  }

  const handleAdminClick = () => {
    navigate('/admin/dashboard')
  }

  return (
    <div className='login-container'>
      <div className='login-left'>
        <img src={login_logo} alt="" className='login-logo' onClick={handleindexClick}/>
        <div className='login-main'>
          <h2>Log in</h2>
          <p>Enter your account details</p>
          <form>
            <label>Username</label>
            <input type="text" placeholder='Username' required />
            <label>Password</label>
            <input type={showPassword ? "text" : "password"} placeholder='Password' required />
            
            <button type="submit" className='login-btn' onClick={handleAdminClick}>Log in</button>
          </form>
        </div>
      </div>
      <div className='login-right'>
        <h1>Welcome to</h1>
        <h2>San Juan Institute of Technology</h2>
        <p>Turning your dreams into reality</p>
        <img src={welcome_img} alt="" className='welcome_img'/>
      </div>
    </div>
  )
}

export default Login
