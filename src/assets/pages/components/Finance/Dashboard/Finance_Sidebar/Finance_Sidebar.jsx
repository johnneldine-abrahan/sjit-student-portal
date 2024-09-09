import React from 'react'
import './Finance_Sidebar.css'
import { BiHome } from "react-icons/bi"
import { FaHistory, FaFileAlt } from "react-icons/fa";
import { GiInjustice } from "react-icons/gi";
import menu_logo from '../../../../../img/Sidebar/menu-logo.png'

const Finance_Sidebar = () => {
  return (
    <div className='menu'>
        <div className='menu-logo'>
            <img src={menu_logo} alt="" />
            <h2>SJIT</h2>
        </div>
        <div className='menu-list'>
            <a href='/finance/dashboard' className='item active'><BiHome size={18}/>Dashboard</a>
            <a href='/finance/tag-liabilities' className='item'><GiInjustice size={18}/>Tag Liabilities</a>
            <a href='/finance/student-records' className='item'><FaFileAlt />Student Records</a>
            <a href='/finance/history' className='item'><FaHistory size={18}/>History</a>
        </div>
      
    </div>
  )
}

export default Finance_Sidebar
