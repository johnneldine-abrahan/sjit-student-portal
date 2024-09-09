import React from 'react'
import './TagLiabilities_Content.css'
import { BiSearch } from "react-icons/bi";

const TagLiabilities_ContentHeader = () => {
  return (
    <div className='tagliabilities-header'>
        <h1 className='header-title'>Tag Liabilities</h1>
        <div className='tagliabilities-activity'>
            <div className='search-box'>
                <input type="text" placeholder='Search...' />
                <BiSearch className='search-icon' />
            </div>
        </div>
      
    </div>
  )
}

export default TagLiabilities_ContentHeader
