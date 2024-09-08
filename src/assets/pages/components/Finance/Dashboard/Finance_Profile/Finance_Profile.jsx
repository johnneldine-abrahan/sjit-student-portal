import React from 'react'
import './Finance_Profile.css'
import Finance_ProfileHeader from './Finance_ProfileHeader'
import Profile from '../../../../../img/Profile/ProfileSample.jpg'

const Finance_Profile = () => {
  return (
    <div className='finance-profile'>
        <Finance_ProfileHeader />

        <div className='user-profile'>
            <div className='user-details'>
                <img src={Profile} alt="" />
                <h3 className='finance-fullname'>Juan Dela Cruz</h3>
                <span className='position'>Finance</span>
            </div>
            <div className='calendar-container'>

            </div>
        </div>
    </div>
  )
}

export default Finance_Profile
