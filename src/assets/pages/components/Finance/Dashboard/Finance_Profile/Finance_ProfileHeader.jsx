import React from 'react'
import './Finance_Profile.css'
import { BiEditAlt } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Finance_ProfileHeader = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className='finance-profile-header'>
        <h2 className='profile-title'>Profile</h2>
        <div className='buttons-header'>
            <div className='profile-act'>
                <BiEditAlt className='profile-icon' />
            </div>
            <div className='profile-act'>
                <LuLogOut className='profile-icon' onClick={handleLogout}/>
            </div>
        </div>
      
    </div>
  )
}

export default Finance_ProfileHeader
