import React from 'react'
import { BiHome } from "react-icons/bi"
import { FaHistory, FaFileAlt } from "react-icons/fa";
import { GiInjustice } from "react-icons/gi";
import menu_logo from '../../../../../img/Sidebar/menu-logo.png'

const TagLiabilities_Sidebar = () => {
  return (
    <div className='menu'>
        <div className='menu-logo'>
            <img src={menu_logo} alt="" />
            <h2>SJIT</h2>
        </div>
        <div className='menu-list'>
            <a href='/finance/dashboard' className='item'><BiHome size={18}/>Dashboard</a>
            <a href='/finance/tag-liabilities' className='item active'><GiInjustice size={18}/>Tag Liabilities</a>
            <a href='#' className='item'><FaFileAlt />Student Records</a>
            <a href='/finance/history' className='item'><FaHistory size={18}/>History</a>
        </div>
      
    </div>
  )
}

export default TagLiabilities_Sidebar
