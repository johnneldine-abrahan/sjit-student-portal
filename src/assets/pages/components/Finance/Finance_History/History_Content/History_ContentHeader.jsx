import React from 'react'
import './History_Content.css'
import { BiSearch } from "react-icons/bi";

const History_ContentHeader = () => {
  return (
    <div className='history-header'>
        <h1 className='header-title'>History</h1>
        <div className='history-activity'>
            <div className='search-box'>
                <input type="text" placeholder='Search...' />
                <BiSearch className='search-icon' />
            </div>
        </div>
      
    </div>
  )
}

export default History_ContentHeader
