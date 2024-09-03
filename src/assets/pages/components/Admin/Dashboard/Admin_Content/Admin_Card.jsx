import React from 'react'
import './Admin_Content.css'

const info_details = [
  {
    title: 'Enrolled Students',
    number: '800'
  },

  {
    title: 'Faculty Members',
    number: '69'
  },

  {
    title: 'Active Users',
    number: '78'
  }

  
]

const Admin_Card = () => {
  return (
    <div className='card-container'>
      {info_details.map((item) => (
        <div className='card'>
          <div className='card-title'>
            <h2>{item.title}</h2>
          </div>
          <div className='card-number'>
            <h1>{item.number}</h1>
          </div>
        </div>
      ))}
    </div>
    
  )
}

export default Admin_Card
