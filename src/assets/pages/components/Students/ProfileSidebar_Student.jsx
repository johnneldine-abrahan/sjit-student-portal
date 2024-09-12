import React from 'react'
import '../../Students/Students_module.css'
import Notifications_Student from './Notifications_Student'

const ProfileSidebar_Student = () => {
  return (
    <aside className='profileSidebar'>
        <div className='profileCard'>
          <div className='profileHeader'>
          <h2 className='profileTitle'>Profile</h2>

          </div>
          <div className='profileImage' />
          <h2 className='studentName'>DELA CRUZ, JUAN A.</h2>
          <p className='studentClass'>GRADE 10</p>
          <p className='academicYear'>2024-2025</p>
          <p className='enrollmentStatus'>ENROLLED</p>
        </div>
        <Notifications_Student />
    </aside>
  )
}

export default ProfileSidebar_Student
