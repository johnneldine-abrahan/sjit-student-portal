import React from 'react'
import './ConfirmEnrollment_Content.css'
import ConfirmEnrollment_ContentHeader from './ConfirmEnrollment_ContentHeader'
import ConfirmEnrollment_Queue from './ConfirmEnrollment_Queue'

const ConfirmEnrollment_Content = () => {
  return (
    <div className='confirm-enrollment-content'>
      <ConfirmEnrollment_ContentHeader />
      <ConfirmEnrollment_Queue />
    </div>
  )
}

export default ConfirmEnrollment_Content
