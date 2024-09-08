import React, {useEffect} from 'react'
import './Finance_layout.css'
import History_Sidebar from '../components/Finance/Finance_History/Finance_Sidebar/History_Sidebar';

const Finance_History = () => {
    useEffect(() => {
        document.title = "Finance - History";
    }, []);

  return (
    <div className='finance-body'>
        <div className='finance-display'>
            <History_Sidebar />
            <div className='finance-main-content'>
                
            </div>
        </div>
      
    </div>
  )
}

export default Finance_History
