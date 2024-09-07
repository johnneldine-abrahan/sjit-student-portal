import React from 'react'
import './Admissions.css'
import pic2x2 from '../../../../img/LandingPage/Admissions/2x2.png'
import placeholder from '../../../../img/LandingPage/Strand/placeholder.jpg'
import enroll_now from '../../../../img/LandingPage/Admissions/enroll-now.png'
import birth_certificate from '../../../../img/LandingPage/Admissions/birth_certificate.png'
import good_moral from '../../../../img/LandingPage/Admissions/good-moral.png'
import form138 from '../../../../img/LandingPage/Admissions/card.png'

const Admissions = () => {
  return (
    <div className='admissions'>
        <div className='admissions-left'>
            <h3>Admissions</h3>
            <h2>BECOME A SJITIAN NOW!</h2>
            <p>To join the lively community at San Juan Institute of Technology, 
              prospective students must meet the following admission requirements:</p>
            <ul>
                <li><img src={pic2x2} alt='' />Two pieces of 2x2 picture</li>
                <li><img src={good_moral} alt='' />Good Moral Certificate</li>
                <li><img src={birth_certificate} alt='' />Original Birth Certificate</li>
                <li><img src={form138} alt='' />Form 138 (Report Card)</li>
            </ul>
        </div>
        <div className='admissions-right'>
          <img src={enroll_now} alt="" className='about-img'/>
        </div>
    </div>
  )
}

export default Admissions
