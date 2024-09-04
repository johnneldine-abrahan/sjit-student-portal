import React from 'react'
import './Archive_Content.css'
import Archive_ContentHeader from './Archive_ContentHeader'
import Archive_Records from './Archive_Records'

const Archive_Content = () => {
  return (
    <div className='archive_content'>
      <Archive_ContentHeader />
      <Archive_Records/>
    </div>
  )
}

export default Archive_Content
