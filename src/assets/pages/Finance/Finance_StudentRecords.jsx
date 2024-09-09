import React, {useEffect} from 'react'
import './Finance_layout.css'
import StudentRecords_Sidebar from '../components/Finance/History_StudentRecords/StudentRecords_Sidebar/StudentRecords_Sidebar'
import StudentRecords_Content from '../components/Finance/History_StudentRecords/StudentRecords_Content/StudentRecords_Content'

const Finance_StudentRecords = () => {
  useEffect(() => {
    document.title = "Finance - Student Records";
  }, []);

  return (
    <div className='finance-body'>
      <div className='finance-display'>
        <StudentRecords_Sidebar />
        <div className='finance-main-content'>
          <StudentRecords_Content />
        </div>
      </div>
      
    </div>
  )
}

export default Finance_StudentRecords
