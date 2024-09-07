import React from 'react'
import './Vision_Mission.css'

const Vision_Mission = () => {
  return (
    <div className='vision-mission-container'>
        <div className='vision'>
          <h2>Vision</h2>
          <p>San Juan Institute of Technology hopes to empower student to
              meet their full potential and inspire them to grow to be productive
              and to be responsible adults through education and guided learning
          </p>
        </div>
        <div className='mission'>
          <h2>Mission</h2>
          <p>San Juan Institute of Technology is committed to providing
              accessible and relevant learning opportunities that help students
              obtain the necessary knowledge, attitude, and critical skills
              to achieve personal and academic success
          </p>
        </div>
        <div className='core-values'>
          <h2>Core Values</h2>
          <p>San Juan Institute of Technology, we aspire to the values that promote the
            character qualities of:
          </p>
          <ul>
            <li>- Solidarity, Steadfastness</li>
            <li>- Justice</li>
            <li>- Integrity, Intelligence</li>
            <li>- Trustworthiness</li>
          </ul>
        </div>
      
    </div>
  )
}

export default Vision_Mission
