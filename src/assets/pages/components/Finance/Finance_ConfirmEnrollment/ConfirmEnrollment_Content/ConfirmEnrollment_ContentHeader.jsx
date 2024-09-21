import React from 'react'
import './ConfirmEnrollment_Content.css'
import { BiSearch } from "react-icons/bi";

const ConfirmEnrollment_ContentHeader = () => {
  return (
    <div className='confirm-enrollment-header'>
      <h1 className='header-title'>Confirm Enrollment</h1>
      <div className='confirm-enrollment-activity'>
        <div className='search-box'>
            <input type="text" placeholder='Search...' />
            <BiSearch className='search-icon' />
            </div>
        </div>
    </div>
  )
}

export default ConfirmEnrollment_ContentHeader
