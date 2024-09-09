import React from 'react'
import './History_Content.css'
import History_ContentHeader from './History_ContentHeader'
import History_List from './History_List'


const History_Content = () => {
  return (
    <div className='history-content'>
      <History_ContentHeader />
      <History_List />
    </div>
  )
}

export default History_Content
