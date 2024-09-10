import React from 'react'
import '../../Students/Students_module.css'

const ActionCard_Student = ({icon, text}) => {
  return (
    <div className='actionCard'>
      <div className='actionIcon'>{icon}</div>
      <span className='actionText'>{text}</span>
      
    </div>
  )
}

export default ActionCard_Student
