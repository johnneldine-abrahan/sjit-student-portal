import React from 'react'
import './Finance_layout.css'
import Finance_Sidebar from '../components/Finance/Dashboard/Finance_Sidebar'

const Finance_Dashboard = () => {
  return (
    <div className='finance-body'>
      <div className='finance-display'>
        <Finance_Sidebar />
        <div className='finance-main-content'>
          
        </div>
      </div>
      
    </div>
  )
}

export default Finance_Dashboard
