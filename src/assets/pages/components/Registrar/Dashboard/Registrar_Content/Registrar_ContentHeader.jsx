import React from 'react'
import './Registrar_Content.css'
import { BiSearch } from "react-icons/bi";

const Registrar_ContentHeader = () => {
  return (
    <div className='dashboard-header'>
        <h1 className='header-title'>Dashboard</h1>
        <div className='activity-header'>
            <div className='search-box'>
                <input type="text" placeholder='Search...' />
                <BiSearch className='search-icon'/>
            </div>

        </div>

    </div>
  )
}

export default Registrar_ContentHeader