import React from 'react'
import '../../Faculty/Faculty_module.css'

const ActionCard_Faculty = ({icon, text}) => {
  return (
    <div className='actionCard'>
      <div className='actionIcon'>{icon}</div>
      <div className='actionText'>{text}</div>
    </div>
  )
}

export default ActionCard_Faculty
