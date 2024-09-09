import React, {useEffect} from 'react'
import './Finance_layout.css'
import TagLiabilities_Sidebar from '../components/Finance/Finance_TagLiabilities/TagLiabilities_Sidebar/TagLiabilities_Sidebar';
import TagLiabilities_Content from '../components/Finance/Finance_TagLiabilities/TagLiabilities_Content/TagLiabilities_Content';


const Finance_TagLiabilities = () => {
    useEffect(() => {
        document.title = "Finance - Tag Liabilities";
    }, []);

  return (
    <div className='finance-body'>
      <div className='finance-display'>
        <TagLiabilities_Sidebar />
        <div className='finance-main-content'>
          <TagLiabilities_Content />
            
        </div>
      </div>
    </div>
  )
}

export default Finance_TagLiabilities
