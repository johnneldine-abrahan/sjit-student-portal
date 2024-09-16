import React from 'react'
import './ManageSchedule_Content.css'
import ManageSchedule_ContentHeader from './ManageSchedule_ContentHeader'
import ManageSchedule_Sections from './ManageSchedule_Sections'


const ManageSchedule_Content = () => {
  return (
    <div className='ManageSchedule_content'>
      <ManageSchedule_ContentHeader />
      <ManageSchedule_Sections />
    </div>
  )
}

export default ManageSchedule_Content
