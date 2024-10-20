import React, {useEffect} from 'react'
import './Finance_layout.css'
import EnrollmentQueue_Sidebar from '../components/Finance/EnrollmentQueue/EnrollmentQueue_Sidebar/EnrollmentQueue_Sidebar'
import EnrollmentQueue_Content from '../components/Finance/EnrollmentQueue/EnrollmentQueue_Content/EnrollmentQueue_Content'

const Finance_EnrollmentQueue = () => {
    useEffect(() => {
        document.title = "Finance - Enrollment Queue";
    }, []);

  return (
    <div className='finance-body'>
      <div className='finance-display'>
        <EnrollmentQueue_Sidebar />
        <div className='finance-main-content'>
            <EnrollmentQueue_Content />
        </div>
      </div>
    </div>
  )
}

export default Finance_EnrollmentQueue