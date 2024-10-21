import React from 'react'
import './ConfirmEnrollment_Content.css'
import ConfirmEnrollment_ContentHeader from './ConfirmEnrollment_ContentHeader'
import ConfirmEnrollment_ContentList from './ConfirmEnrollment_ContentList'
const ConfirmEnrollment_Content = () => {
  return (
    <div className='confirm-enrollment-content'>
      <ConfirmEnrollment_ContentHeader />
      <ConfirmEnrollment_ContentList/>
    </div>
  )
}

export default ConfirmEnrollment_Content