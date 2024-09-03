import React from 'react'
import './Admin_Archive.css'
import Archive_Content from '../components/Admin/Archive/Archive_Content/Archive_Content'
import Archive_Sidebar from '../components/Admin/Archive/Archive_Sidebar/Archive_Sidebar'

const Admin_Archive = () => {
  return (
    <div className='archive-body'>
        <div className='archive_admin'>
        <Archive_Sidebar />
            <div className='archive_admin_content'>
                <Archive_Content />
                
            </div>
      
        </div>
    </div>
  )
}

export default Admin_Archive
