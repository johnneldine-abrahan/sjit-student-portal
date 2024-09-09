import React from 'react'
import './StudentRecords_Content.css'
import StudentRecords_ContentHeader from './StudentRecords_ContentHeader'
import StudentRecords from './StudentRecords'

const StudentRecords_Content = () => {
  return (
    <div className='student-records-content'>
        <StudentRecords_ContentHeader />
        <StudentRecords />
      
    </div>
  )
}

export default StudentRecords_Content
