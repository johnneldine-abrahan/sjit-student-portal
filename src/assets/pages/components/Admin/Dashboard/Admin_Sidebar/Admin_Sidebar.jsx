import React from 'react'
import { BiHome, BiArchiveIn} from "react-icons/bi"
import { PiStudentBold } from "react-icons/pi"
import { GiArchiveRegister } from "react-icons/gi"
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

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
            <a href='https://san-juan-institute-of-technology.onrender.com/admin/dashboard' className='item active'><BiHome size={18}/>Dashboard</a>
            <a href='/admin/student-list' className='item'><PiStudentBold size={18}/>Students</a>
            <a href='/admin/enroll-students' className='item'><GiArchiveRegister size={18}/>Enroll Student</a>
            <a href='/admin/confirm-enrollment' className='item'><IoCheckmarkDoneSharp size={18}/>Confirm Enrollment</a>
            <a href='/admin/faculty-members' className='item'><FaChalkboardTeacher size={18}/>Faculty Members</a>
            <a href='/admin/manage-schedule' className='item'><AiFillSchedule size={18} />Manage Schedule</a>
            <a href='/admin/manage-accounts' className='item'><MdOutlineSwitchAccount size={18}/>Manage Accounts</a>
            <a href='/admin/archive' className='item'><BiArchiveIn size={18}/>Archive</a>


        </div>

    </div>
  )
}

export default Admin_Sidebar