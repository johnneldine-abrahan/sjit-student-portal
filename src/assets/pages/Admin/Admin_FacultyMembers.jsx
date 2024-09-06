import React from 'react'
import './Admin_layout.css'

import FacultyMembers_Sidebar from '../components/Admin/FacultyMembers/FacultyMembers_Sidebar/FacultyMembers_Sidebar'
import FacultyMembers_Content from '../components/Admin/FacultyMembers/FacultyMembers_Content/FacultyMembers_Content'

const Admin_FacultyMembers = () => {
  return (
    <div className='admin-body'>
        <div className='admin-display'>
        <FacultyMembers_Sidebar />
            <div className='admin-main-content'>
                <FacultyMembers_Content />
                
            </div>
      
        </div>
    </div>
  )
}

export default Admin_FacultyMembers