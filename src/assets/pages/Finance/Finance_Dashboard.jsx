import React, { useEffect } from 'react'
import './Finance_layout.css'
import Finance_Sidebar from '../components/Finance/Dashboard/Finance_Sidebar/Finance_Sidebar'
import Finance_Content from '../components/Finance/Dashboard/Finance_Content/Finance_Content';

const Finance_Dashboard = () => {
  useEffect(() => {
    document.title = "Finance - Dashboard";
  }, []);

  return (
    <div className='finance-body'>
      <div className='finance-display'>
        <Finance_Sidebar />
        <div className='finance-main-content'>
          <Finance_Content />

        </div>
      </div>
      
    </div>
  )
}

export default Finance_Dashboard
