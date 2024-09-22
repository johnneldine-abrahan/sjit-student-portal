import React from 'react'
import './Enroll_Students_Content.css'
import Profile from '../../../../../img/Profile/ProfileSample.jpg'

const Enroll_Student_Preview = () => {
  return (
    <div className='student-profile-preview'>
      <div className='preview-details'>
        <div className='user-profile-preview'>
          <img src={Profile} className='profile-pic' alt='' />
        </div>
        <div className='student-enroll-info'>
          <h2>DELA CRUZ, JUAN A.</h2>
          <h3>Junior Highschool</h3>
          <h3>2024-2025, FIRST</h3>
          <h3>Grade 9</h3>
          <h3>NOT ENROLLED</h3>
        </div>
      </div>
      
    </div>
  )
}

export default Enroll_Student_Preview
