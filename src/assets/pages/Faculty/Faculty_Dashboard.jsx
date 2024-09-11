import React from 'react'
import './Faculty_module.css'
import Faculty_Header from '../components/Faculty/Header_Faculty'
import MainContent_Faculty from '../components/Faculty/MainContent_Faculty'

const Faculty_Dashboard = () => {
  return (
    <div className='facultyHome'>
       <Faculty_Header />
       <main className='mainContent-Student'>
        <div className='contentWrapper'>
            <MainContent_Faculty />
        </div>
       </main>
    </div>
  )
}

export default Faculty_Dashboard
