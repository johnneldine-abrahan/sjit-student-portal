import React, {useEffect} from 'react'
import './Students_module.css'
import Header_Student from '../components/Students/Header_Student'
import MainContent_Student from '../components/Students/MainContent_Student'
import ProfileSidebar_Student from '../components/Students/ProfileSidebar_Student'

const Students_Dashboard = () => {
  return (
    <div className='studentHome'>
      <Header_Student />
      <main className='mainContent-Student'>
        <div className='contentWrapper'>
          <MainContent_Student />
          <ProfileSidebar_Student />
        </div>

      </main>
    </div>
  )
}

export default Students_Dashboard