import React from 'react'
import './Admin_FacultyMembers.css'

import FacultyMembers_Sidebar from '../components/Admin/FacultyMembers/FacultyMembers_Sidebar/FacultyMembers_Sidebar'
import FacultyMembers_Content from '../components/Admin/FacultyMembers/FacultyMembers_Content/FacultyMembers_Content'

const Admin_FacultyMembers = () => {
  return (
    <div className='admin_faculty-body'>
        <div className='faculty_admin'>
        <FacultyMembers_Sidebar />
            <div className='faculty_admin_content'>
                <FacultyMembers_Content />
                
            </div>
      
        </div>
    </div>
  )
}

export default Admin_FacultyMembers