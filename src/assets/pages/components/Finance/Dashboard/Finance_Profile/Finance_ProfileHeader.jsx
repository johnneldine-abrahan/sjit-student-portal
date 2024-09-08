import React from 'react'
import './Finance_Profile.css'
import { BiEditAlt } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";

const Finance_ProfileHeader = () => {
  return (
    <div className='finance-profile-header'>
        <h2 className='profile-title'>Profile</h2>
        <div className='buttons-header'>
            <div className='profile-act'>
                <BiEditAlt className='profile-icon' />
            </div>
            <div className='profile-act'>
                <LuLogOut className='profile-icon' />
            </div>
        </div>
      
    </div>
  )
}

export default Finance_ProfileHeader
