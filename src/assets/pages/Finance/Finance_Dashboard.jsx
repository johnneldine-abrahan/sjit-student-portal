import React, { useEffect } from 'react'
import './Finance_layout.css'
import Finance_Sidebar from '../components/Finance/Dashboard/Finance_Sidebar/Finance_Sidebar'
import Finance_Content from '../components/Finance/Dashboard/Finance_Content/Finance_Content';
import Finance_Profile from '../components/Finance/Dashboard/Finance_Profile/Finance_Profile';

const Finance_Dashboard = () => {
  useEffect(() => {
    document.title = "Admin - Archive";
  }, []);

  return (
    <div className='finance-body'>
      <div className='finance-display'>
        <Finance_Sidebar />
        <div className='finance-main-content'>
          <Finance_Content />
          <Finance_Profile />

        </div>
      </div>
      
    </div>
  )
}

export default Finance_Dashboard
