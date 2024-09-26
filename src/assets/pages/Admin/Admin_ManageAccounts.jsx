import React, {useEffect} from 'react'
import './Admin_layout.css'
import ManageAccounts_ContentHeader from '../components/Admin/ManageAccounts/ManageAccounts_Content/ManageAccounts_Content'
import ManageAccounts_Sidebar from '../components/Admin/ManageAccounts/ManageAccounts_Sidebar/ManageAccounts_Sidebar'


const Admin_ManageAccounts = () => {
  useEffect(() => {
    document.title = "Admin - Manage Schedule";
  }, []);


  return (
    <div className='admin-body'>
        <div className='admin-display'>
            <ManageAccounts_Sidebar />
            <div className='admin-main-content'>
                <ManageAccounts_ContentHeader />

            </div>

        </div>
    </div>
  )
}

export default Admin_ManageAccounts