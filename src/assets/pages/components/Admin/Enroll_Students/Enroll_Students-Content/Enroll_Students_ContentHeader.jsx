import React from 'react'
import './Enroll_Students_Content.css';

const Enroll_Students_ContentHeader = () => {
  return (
    <div className='admin-enroll-header'>
      <h1 className='header-title'>Enroll Students</h1>
      <div className='admin-enroll-activity'>
        <button type='submit' className='select-btn'>Select Student</button>
      </div>
      
    </div>
  )
}

export default Enroll_Students_ContentHeader
