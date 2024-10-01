import React from 'react'
import './Finance_Content.css'
import Finance_ContentHeader from './Finance_ContentHeader'
import Finance_Card from './Finance_Card'
import Finance_Announcements from './Finance_Announcements'

const Finance_Content = () => {
  return (
    <div className='finance_content'>
        <Finance_ContentHeader />
        <Finance_Card />
        <Finance_Announcements/>

    </div>
  )
}

export default Finance_Content