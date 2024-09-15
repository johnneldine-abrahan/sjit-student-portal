import React from 'react'
import './Enroll_Students_Content.css'
import Enroll_Students_ContentHeader from './Enroll_Students_ContentHeader'
import Enroll_SubjectsList from './Enroll_SubjectsList'
import Enroll_Student_Preview from './Enroll_Student_Preview'

const Enroll_Students_Content = () => {
  return (
    <div className='admin-enroll_content'>
      <Enroll_Students_ContentHeader />
      <Enroll_Student_Preview />
      <Enroll_SubjectsList />
    </div>
  )
}

export default Enroll_Students_Content
