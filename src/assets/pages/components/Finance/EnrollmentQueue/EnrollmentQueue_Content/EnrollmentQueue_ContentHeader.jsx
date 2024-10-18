import React from 'react'
import './EnrollmentQueue_Content.css'
import { BiSearch } from "react-icons/bi";

const EnrollmentQueue_ContentHeader = () => {
  return (
    <div className='confirm-enrollment-header'>
      <h1 className='header-title'>Enrollment  Queue</h1>
      <div className='confirm-enrollment-activity'>
        <div className='search-box'>
            <input type="text" placeholder='Search...' />
            <BiSearch className='search-icon' />
            </div>
        </div>
    </div>
  )
}

export default EnrollmentQueue_ContentHeader