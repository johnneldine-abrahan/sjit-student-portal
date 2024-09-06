import React from 'react'
import './Admin_layout.css'
import Archive_Content from '../components/Admin/Archive/Archive_Content/Archive_Content'
import Archive_Sidebar from '../components/Admin/Archive/Archive_Sidebar/Archive_Sidebar'

const Admin_Archive = () => {
  return (
    <div className='admin-body'>
        <div className='admin-display'>
        <Archive_Sidebar />
            <div className='admin-main-content'>
                <Archive_Content />
                
            </div>
      
        </div>
    </div>
  )
}

export default Admin_Archive
