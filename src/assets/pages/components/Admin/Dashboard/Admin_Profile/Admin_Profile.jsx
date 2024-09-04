import React from 'react'
import './Admin_Profile.css'
import Admin_ProfileHeader from './Admin_ProfileHeader'
import Profile from '../../../../../img/Profile/ProfileSample.jpg'

const Admin_Profile = () => {
  return (
    <div className='admin-profile'>
      <Admin_ProfileHeader />

      <div className='user-profile'>
        <div className='user-details'>
          <img src={Profile} alt="" />
          <h3 className='admin-fullname'>Juan Dela Cruz</h3>
          <span className='position'>Admin</span>
        </div>
        <div className='calendar'>
          
        </div>
      </div>
    </div>
  )
}

export default Admin_Profile
