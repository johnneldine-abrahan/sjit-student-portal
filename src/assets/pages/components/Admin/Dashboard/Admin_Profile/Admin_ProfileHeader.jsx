import React from 'react'
import './Admin_Profile.css'
import { BiEditAlt } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";

const Admin_ProfileHeader = () => {
  return (
    <div className="admin-p_header">
        <h2 className='profile-title'>Profile</h2>
        <div className='buttons-header'>
          <div className='profile-act'>
            <BiEditAlt class='profile-icon' />
          </div>
          <div className='profile-act'>
            <LuLogOut className='profile-icon'/>
          </div>
        </div>
    </div>
  )
}

export default Admin_ProfileHeader
