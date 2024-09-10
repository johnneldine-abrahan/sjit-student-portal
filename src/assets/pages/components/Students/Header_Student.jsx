import React from 'react'
import '../../Students/Students_module.css'
import logo from '../../../img/LandingPage/NavBar/logo.png'

const Header = () => {
  return (
    <header className='headerStudent'>
      <img src={logo} className='logo-student' />
      <div className='userActions'>

      </div>
    </header>
  )
}

export default Header
