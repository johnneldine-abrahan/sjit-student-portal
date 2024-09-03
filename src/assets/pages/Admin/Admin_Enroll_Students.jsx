import React from 'react'
import './Admin_Enroll_Students.css'
import Enroll_Students_Sidebar from '../components/Admin/Enroll_Students/Enroll_Students-Sidebar/Enroll_Students_Sidebar'
import Enroll_Students_Content from '../components/Admin/Enroll_Students/Enroll_Students-Content/Enroll_Students_Content'

const Admin_Enroll_Students = () => {
  return (
    <div className='enroll-body'>
        <div className='admin_enroll'>
            <Enroll_Students_Sidebar />
            <div className='admin_enroll_content'>
                <Enroll_Students_Content />
            </div>
        </div>
      
    </div>
  )
}

export default Admin_Enroll_Students
