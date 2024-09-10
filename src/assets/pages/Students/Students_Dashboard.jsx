import React from 'react'
import './Students_module.css'
import Header from '../components/Students/Header_Student'
import MainContent from '../components/Students/MainContent_Student'
import ProfileSidebar from '../components/Students/ProfileSidebar_Student'

const Students_Dashboard = () => {
  return (
    <div className='studentHome'>
      <Header />
      <main className='mainContent-Student'>
        <div className='contentWrapper'>
          <MainContent />
          <ProfileSidebar />
        </div>

      </main>
    </div>
  )
}

export default Students_Dashboard