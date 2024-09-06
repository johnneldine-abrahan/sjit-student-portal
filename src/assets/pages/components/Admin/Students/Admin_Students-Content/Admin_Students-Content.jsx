import React from 'react'
import './Admin_Students-Content.css'
import Admin_Students_ContentHeader from './Admin_Students_ContentHeader'
import Admin_StudentsRecords from './Admin_StudentsRecords'

const Students_Content = () => {
  return (
    <div className='admin-s_content'>
      <Admin_Students_ContentHeader />
      <Admin_StudentsRecords />
    </div>
  )
}

export default Students_Content
