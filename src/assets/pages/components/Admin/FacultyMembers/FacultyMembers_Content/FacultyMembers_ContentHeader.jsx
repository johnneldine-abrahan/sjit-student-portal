import React from 'react'
import './FacultyMembers_Content.css'
import { BiSearch } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";
import { RiInboxUnarchiveLine } from "react-icons/ri";

const FacultyMembers_ContentHeader = () => {
  return (
    <div className='facultymembers-header'>
      <h1 className='header-title'>Faculty Members</h1>
      <div className='facultymembers-activity'>
        <div className='search-box'>
          <input type="text" placeholder='Search...' />
          <BiSearch className='search-icon' />
        </div>
        <div className='buttons-header'>
          <div className='buttons-act'>
            <RiAddLargeFill className='buttons-icon' />
          </div>
          <div className='buttons-act'>
            <BiEditAlt className='buttons-icon' />
          </div>
          <div className='buttons-act'>
            <RiDeleteBin6Line className='buttons-icon' />
          </div>
          <div className='buttons-act'>
            <RiInboxUnarchiveLine className='buttons-icon' />
          </div>
        </div>
  
      </div>

    </div>
  )
}

export default FacultyMembers_ContentHeader
