import React from 'react'
import './Admin_layout.css'
import Enroll_Students_Sidebar from '../components/Admin/Enroll_Students/Enroll_Students-Sidebar/Enroll_Students_Sidebar'
import Enroll_Students_Content from '../components/Admin/Enroll_Students/Enroll_Students-Content/Enroll_Students_Content'

const Admin_Enroll_Students = () => {
  return (
    <div className='admin-body'>
        <div className='admin-display'>
            <Enroll_Students_Sidebar />
            <div className='admin-main-content'>
                <Enroll_Students_Content />
            </div>
        </div>
      
    </div>
  )
}

export default Admin_Enroll_Students
