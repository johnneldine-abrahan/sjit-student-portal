import React from 'react'
import './Admin_Dashboard.css'
import Admin_Content from '../components/Admin/Dashboard/Admin_Content/Admin_Content'
import Admin_Profile from '../components/Admin/Dashboard/Admin_Profile/Admin_Profile'
import Admin_Sidebar from '../components/Admin/Dashboard/Admin_Sidebar/Admin_Sidebar'

const Admin_Dashboard = () => {
  return (
    <div className='admin-body'>
        <div className='dashboard_admin'>
            <Admin_Sidebar />
            <div className='dashboard_admin_content'>
                <Admin_Content />
                <Admin_Profile />
            </div>
      
        </div>
    </div>
  )
}

export default Admin_Dashboard
