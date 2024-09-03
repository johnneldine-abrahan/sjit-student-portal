import React from 'react'
import './Admin_Profile.css'
import { BiEditAlt } from "react-icons/bi";

const Admin_ProfileHeader = () => {
  return (
    <div className="admin-p_header">
        <h2 className='profile-title'>Profile</h2>
        <div className='edit'>
            <BiEditAlt class='edit-icon' />
        </div>
    </div>
  )
}

export default Admin_ProfileHeader
