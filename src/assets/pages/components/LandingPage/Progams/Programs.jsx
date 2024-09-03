import React from 'react'
import './Programs.css'
import jhs from '../../../../img/LandingPage/Programs/jhs.png'
import jhs_logo from '../../../../img/LandingPage/Programs/jhs_logo.png'
import shs from '../../../../img/LandingPage/Programs/shs.png'
import shs_logo from '../../../../img/LandingPage/Programs/shs_logo.png'

const Programs = () => {
  return (
    <div className='programs'>
        <div className='program'>
            <img src={jhs} alt="" />
            <div className='caption'>
              <img src={jhs_logo} alt="" />
              <p>Junior Highschool</p>
            </div>
        </div>
        <div className='program'>
            <img src={shs} alt="" />
            <div className='caption'>
              <img src={shs_logo} alt="" />
              <p>Senior Highschool</p>
            </div>
        </div>
    </div>
  )
}

export default Programs
