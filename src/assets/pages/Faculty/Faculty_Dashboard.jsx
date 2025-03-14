import React, {useEffect} from 'react'
import './Faculty_module.css'
import Faculty_Header from '../components/Faculty/Header_Faculty'
import MainContent_Faculty from '../components/Faculty/MainContent_Faculty'
import ProfileSidebar_Faculty from '../components/Faculty/ProfileSidebar_Faculty'

const Faculty_Dashboard = () => {
  useEffect(() => {
    document.title = "Faculty - Dashboard";
  }, []);

  return (
    <div className='facultyHome'>
       <Faculty_Header />
       <main className='mainContent-Student'>
        <div className='contentWrapper'>
            <MainContent_Faculty />
            <ProfileSidebar_Faculty />
        </div>
       </main>
    </div>
  )
}

export default Faculty_Dashboard