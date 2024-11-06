import React, { useEffect, useState } from 'react';
import './Faculty_module.css';
import Faculty_Header from '../components/Faculty/Header_Faculty';
import MainContent_Faculty from '../components/Faculty/MainContent_Faculty';
import ProfileSidebar_Faculty from '../components/Faculty/ProfileSidebar_Faculty';

const Faculty_Dashboard = () => {
  const [semester, setSemester] = useState('');

  useEffect(() => {
    document.title = "Faculty - Dashboard";
  }, []);

  return (
    <div className='facultyHome'>
      <Faculty_Header />
      <main className='mainContent-Student'>
        <div className='contentWrapper'>
          <MainContent_Faculty semester={semester} /> {/* Pass semester */}
          <ProfileSidebar_Faculty setSemester={setSemester} /> {/* Pass setter function */}
        </div>
      </main>
    </div>
  );
}

export default Faculty_Dashboard;