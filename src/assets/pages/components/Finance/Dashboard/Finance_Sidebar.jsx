import React from 'react'
import './Finance_Sidebar.css'
import { BiHome } from "react-icons/bi"

const Finance_Sidebar = () => {
  return (
    <div className='menu'>
        <div className='menu-logo'>
            <img src={menu_logo} alt="" />
            <h2>SJIT</h2>
        </div>
        <div className='menu-list'>
            <a href='#' className='item active'><BiHome size={18}/>Dashboard</a>
        </div>
      
    </div>
  )
}

export default Finance_Sidebar
