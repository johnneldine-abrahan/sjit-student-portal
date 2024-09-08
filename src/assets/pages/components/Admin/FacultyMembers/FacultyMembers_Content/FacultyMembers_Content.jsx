import React from 'react'
import './FacultyMembers_Content.css'
import FacultyMembers_ContentHeader from './FacultyMembers_ContentHeader'
import FacultyMembers_List from './FacultyMembers_List'

const FacultyMembers_Content = () => {
  return (
    <div className='FacultyMembers_content'>
      <FacultyMembers_ContentHeader />
      <FacultyMembers_List />
    </div>
  )
}

export default FacultyMembers_Content