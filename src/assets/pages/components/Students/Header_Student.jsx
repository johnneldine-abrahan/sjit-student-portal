import React from 'react'
import '../../Students/Students_module.css'
import logo from '../../../img/LandingPage/NavBar/logo.png'
import { LuLogOut } from "react-icons/lu";

const Header = () => {
  return (
    <header className='headerStudent'>
      <img src={logo} className='logo-student' />
      <button className='btn log-out'>Log out<LuLogOut className='btn-img' /></button>
    </header>
  )
}

export default Header
