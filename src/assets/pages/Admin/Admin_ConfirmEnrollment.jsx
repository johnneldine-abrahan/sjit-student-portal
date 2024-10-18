import React, { useEffect } from 'react'
import './Admin_layout.css'
import ConfirmEnrollment_Content from '../components/Admin/ConfirmEnrollment/ConfirmEnrollment_Content/ConfirmEnrollment_Content'
import ConfirmEnrollment_Sidebar from '../components/Admin/ConfirmEnrollment/ConfirmEnrollment_Sidebar/ConfirmEnrollment_Sidebar'

const Admin_ConfirmEnrollment = () => {
  useEffect(() => {
    document.title = "Admin - ConfirmEnrollment";
  }, []);

  return (
    <div className='admin-body'>
        <div className='admin-display'>
        <ConfirmEnrollment_Sidebar />
            <div className='admin-main-content'>
                <ConfirmEnrollment_Content />

            </div>

        </div>
    </div>
  )
}

export default Admin_ConfirmEnrollment