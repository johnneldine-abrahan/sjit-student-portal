import React, {useEffect} from 'react'
import './Admin_layout.css'
import ManageSchedule_Content from '../components/Admin/ManageSchedule/ManageSchedule_Content/ManageSchedule_Content'
import ManageSchedule_Sidebar from '../components/Admin/ManageSchedule/ManageSchedule_Sidebar/ManageSchedule_Sidebar'


const Admin_ManageSchedule = () => {
  useEffect(() => {
    document.title = "Admin - Manage Schedule";
  }, []);


  return (
    <div className='admin-body'>
        <div className='admin-display'>
            <ManageSchedule_Sidebar />
            <div className='admin-main-content'>
                <ManageSchedule_Content />
                
            </div>
      
        </div>
    </div>
  )
}

export default Admin_ManageSchedule
