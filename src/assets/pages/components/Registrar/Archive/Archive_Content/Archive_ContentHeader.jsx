import React from 'react'
import './Archive_Content.css'
import { BiSearch } from "react-icons/bi";

const Archive_ContentHeader = () => {
  return (
    <div className='archive-header'>
        <h1 className='header-title'>Archive</h1>
        <div className='archive-activity'>
          <div className='search-box'>
            <input type="text" placeholder='Search...' />
            <BiSearch className='search-icon' />
          </div>



        </div>
    </div>
  )
}

export default Archive_ContentHeader