import React from 'react'
import './Admin_Students.css'
import Admin_Students_Sidebar from '../components/Admin/Students/Admin_Students-Sidebar/Admin_Students-Sidebar.jsx'
import Admin_Students_Content from '../components/Admin/Students/Admin_Students-Content/Admin_Students-Content.jsx'

const Admin_Students = () => {
  return (
    <div className='admin-students-body'>
      <div className='students_admin'>
        <Admin_Students_Sidebar />
        <div className='admin_students_content'>
            <Admin_Students_Content />
        </div>
      </div>
    </div>
  )
}

export default Admin_Students
