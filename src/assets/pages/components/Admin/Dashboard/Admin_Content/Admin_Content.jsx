import React from 'react'
import './Admin_Content.css'
import Admin_ContentHeader from './Admin_ContentHeader'
import Admin_Profile from '../Admin_Profile/Admin_Profile'
import Admin_Card from './Admin_Card'
import Admin_Announcements from './Admin_Announcements'


const Admin_Content = () => {
  return (
    <div className='admin-d_content'>
      <Admin_ContentHeader />
      <Admin_Card />
      <Admin_Announcements />
    </div>
  )
}

export default Admin_Content
