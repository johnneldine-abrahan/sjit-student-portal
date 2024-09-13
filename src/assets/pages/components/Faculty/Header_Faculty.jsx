import React from 'react'
import '../../Faculty/Faculty_module.css'
import logo from '../../../img/LandingPage/NavBar/logo.png'
import { LuLogOut } from "react-icons/lu";

const Header_Faculty = () => {
  return (
    <header className='headerFaculty'>
        <img src={logo} className='logo-faculty' />
        <button className='btn log-out'>Log out<LuLogOut className='btn-img' /></button>
    </header>
  )
}

export default Header_Faculty
