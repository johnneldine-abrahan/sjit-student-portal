import React, {useEffect} from 'react'
import './Admin_layout.css'
import Admin_Students_Sidebar from '../components/Admin/Students/Admin_Students-Sidebar/Admin_Students-Sidebar.jsx'
import Admin_Students_Content from '../components/Admin/Students/Admin_Students-Content/Admin_Students-Content.jsx'

const Admin_Students = () => {
  useEffect(() => {
    document.title = "Admin - Students";
  }, []);


  return (
    <div className='admin-body'>
      <div className='admin-display'>
        <Admin_Students_Sidebar />
        <div className='admin-main-content'>
            <Admin_Students_Content />
        </div>
      </div>
    </div>
  )
}

export default Admin_Students
