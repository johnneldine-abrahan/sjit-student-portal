import React, {useEffect} from 'react'
import './Finance_layout.css'
import ConfirmEnrollment_Sidebar from '../components/Finance/Finance_ConfirmEnrollment/ConfirmEnrollment_Sidebar/ConfirmEnrollment_Sidebar'
import ConfirmEnrollment_Content from '../components/Finance/Finance_ConfirmEnrollment/ConfirmEnrollment_Content/ConfirmEnrollment_Content'

const Finance_ConfirmEnrollment = () => {
    useEffect(() => {
        document.title = "Finance - History";
    }, []);

  return (
    <div className='finance-body'>
      <div className='finance-display'>
        <ConfirmEnrollment_Sidebar />
        <div className='finance-main-content'>
            <ConfirmEnrollment_Content />
        </div>
      </div>
    </div>
  )
}

export default Finance_ConfirmEnrollment
