import React from 'react'
import '../../Students/Students_module.css'

const ProfileSidebar_Student = () => {
  return (
    <aside className='profileSidebar'>
        <div className='profileCard'>
            <h2 className='profileTitle'>Profile</h2>
            <div className='profileImage' />
            <h2 className='studentName'>DELA CRUZ, JUAN A.</h2>
            <p className='studentClass'>GRADE 10</p>
            <p className='academicYear'>2024-2025</p>
            <p className='enrollmentStatus'>ENROLLED</p>
        </div>
    </aside>
  )
}

export default ProfileSidebar_Student
