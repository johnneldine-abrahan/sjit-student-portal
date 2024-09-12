import React from 'react'
import '../../Faculty/Faculty_module.css'
import Notifications_Faculty from './Notifications_Faculty'

const ProfileSidebar_Faculty = () => {
  return (
    <aside className='profileSidebar'>
        <div className='profileCard'>
          <div className='profileHeader'>
          <h2 className='profileTitle'>Profile</h2>

          </div>
          <div className='profileImage' />
          <h2 className='facultyName'>DELA CRUZ, JUAN A.</h2>
          <p className='facultyPosition'>Lecturer I</p>
          <p className='academicYear'>2024-2025</p>
        </div>
        <Notifications_Faculty />
    </aside>
  )
}

export default ProfileSidebar_Faculty
