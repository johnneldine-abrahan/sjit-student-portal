import React from 'react'
import './Admin_Profile.css'
import { BiEditAlt } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Admin_ProfileHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="admin-p_header">
        <h2 className='profile-title'>Profile</h2>
        <div className='buttons-header'>
          <div className='profile-act'>
            <BiEditAlt class='profile-icon' />
          </div>
          <div className='profile-act'>
            <LuLogOut className='profile-icon' onClick={handleLogout}/>
          </div>
        </div>
    </div>
  )
}

export default Admin_ProfileHeader
