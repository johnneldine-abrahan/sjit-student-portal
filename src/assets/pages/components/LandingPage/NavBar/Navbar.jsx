import React, { useEffect, useState } from 'react'
import './NavBar.css'
import logo from '../../../../img/LandingPage/NavBar/logo.png'
import menu  from '../../../../img/LandingPage/NavBar/menu-icon.png'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-scroll'

const NavBar = () => {
  const navigate = useNavigate();
  
  const [sticky, setSticky] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    })
  },[]);

  const handleLoginClick = () => {
    navigate('/login');
  }

  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  }

  return (
    <nav className={`container ${sticky? 'dark-nav' : ''}`}>
      <img src={logo} alt="" className='logo' onClick={() => {window.scrollTo(0,0); window.location.reload}} />
      <ul className={mobileMenu?'':'hide-mobile-menu'}>
        <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
        <li><Link to='programs' smooth={true} offset={-240} duration={500}>Programs</Link></li>
        <li><Link to='about' smooth={true} offset={-100} duration={500}>About</Link></li>
        <li><Link to='admissions' smooth={true} offset={-160} duration={500}>Admissions</Link></li>
        <li><Link to="contact" smooth={true} offset={-240} duration={500}>Contact Us</Link></li>
        <li><button className='btn log-in' onClick={handleLoginClick}>Log in</button></li>
      </ul> 
      <img src={menu} alt="" className='menu-icon' onClick={toggleMenu}/>
    </nav>
  )
}

export default NavBar
