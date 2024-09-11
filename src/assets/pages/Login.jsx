import React, {useEffect} from 'react'
import './components/Login/Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import login_logo from '../img/Login/login-logo.png'
import welcome_img from '../img/Login/welcome-img.png'

const Login = () => {

  useEffect(() => {
    document.title = "SJIT - Log in";
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) =>{
    e.preventDefault();

    if(Username === 'admin' && Password == 'admin'){
      navigate('/admin/dashboard');
    } else if (Username === 'finance' && Password === 'finance'){
      navigate('/finance/dashboard');
    } else if (Username === 'student' && Password === 'student') {
      navigate('/students/dashboard');
    } else if (Username === 'faculty' && Password === 'faculty'){
      navigate('/faculty/dashboard');
    } else {
      alert('Invalid username or password');
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleindexClick = () => {
     navigate('/')
  }

  return (
    <div className='login-container'>
      <div className='login-left'>
        <img src={login_logo} alt="" className='login-logo' onClick={handleindexClick}/>
        <div className='login-main'>
          <h2>Log in</h2>
          <p>Enter your account details</p>
          <form onSubmit={handleLogin}>
            <label>Username</label>
            <input type="text" placeholder='Username' value={Username} onChange={(e) => setUsername(e.target.value)} required />
            <label>Password</label>
            <input type={showPassword ? "text" : "password"} placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} required />
            
            <button type="submit" className='login-btn'>Log in</button>
          </form>
        </div>
      </div>
      <div className='login-right'>
        <h1>Welcome to</h1>
        <h2>San Juan Institute of Technology</h2>
        <p>Turning your dreams into reality</p>
        <img src={welcome_img} className='welcome_img' alt="" />
      </div>
    </div>
  )
}

export default Login
