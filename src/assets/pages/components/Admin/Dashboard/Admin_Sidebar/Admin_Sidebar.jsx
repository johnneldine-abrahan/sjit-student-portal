import React from 'react'
import { BiHome } from "react-icons/bi"
import { PiStudentBold } from "react-icons/pi"
import { GiArchiveRegister } from "react-icons/gi"
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import './Admin_Sidebar.css'
import menu_logo from '../../../../../img/Sidebar/menu-logo.png'

const Admin_Sidebar = () => {
  return (
    <div className='menu'>
        <div className='menu-logo'>
            <img src={menu_logo} alt="" />
            <h2>SJIT</h2>
        </div>
        <div className='menu-list'>
            <a href='#' className='item'><BiHome size={18}/>Dashboard</a>
            <a href='#' className='item'><PiStudentBold size={18}/>Students</a>
            <a href='#' className='item'><GiArchiveRegister size={18}/>Enroll Student</a>
            <a href='#' className='item'><FaChalkboardTeacher size={18}/>Faculty Members</a>
            <a href='#' className='item'><AiFillSchedule size={18} />Manage Schedule</a>
        </div>
      
    </div>
  )
}

export default Admin_Sidebar
