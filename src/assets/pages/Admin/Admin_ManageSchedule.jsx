import React from 'react'
import './Admin_ManageSchedule.css'
import ManageSchedule_Content from '../components/Admin/ManageSchedule/ManageSchedule_Content/ManageSchedule_Content'
import ManageSchedule_Sidebar from '../components/Admin/ManageSchedule/ManageSchedule_Sidebar/ManageSchedule_Sidebar'

const Admin_ManageSchedule = () => {
  return (
    <div className='admin_ManageSchedule-body'>
        <div className='ManageSchedule_admin'>
        <ManageSchedule_Sidebar />
            <div className='ManageSchedule_admin_content'>
                <ManageSchedule_Content />
                
            </div>
      
        </div>
    </div>
  )
}

export default Admin_ManageSchedule
