import React from 'react'
import './StudentRecords_Content.css'
import { BiSearch } from "react-icons/bi";

const StudentRecords_ContentHeader = () => {
  return (
    <div className='student-records-header'>
      <h1 className='header-title'>Student Records</h1>
      <div className='activity-header'>
            <div className='search-box'>
              <input type="text" placeholder='Search...' />
              <BiSearch className='search-icon' />
            </div>
      </div>
      
    </div>
  )
}

export default StudentRecords_ContentHeader
