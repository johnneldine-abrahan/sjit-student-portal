import React from 'react'
import './About.css'
import placeholder from '../../../../img/LandingPage/Strand/placeholder.jpg'

const About = () => {
  return (
    <div className='about'>
        <div className='about-left'>
          <img src={placeholder} alt="" className='about-img'/>
        </div>
        <div className='about-right'>
            <h3>About the Institution</h3>
            <h2>Your journey to success starts here!</h2>
            <p>At San Juan Institute of Technology, we are dedicated to making the dreams of learners a reality. As a leading educational institution, we provide a nurturing and innovative atmosphere in which all students can succeed. 
              Whether students are starting their academic adventure in Junior High or progressing through Senior High, our programs are designed to provide them with the knowledge, skills, and confidence they need to excel in an ever-changing world.</p>
            <p>We think that education is the key to maximizing every student's potential. Our devoted teachers, cutting-edge facilities, and hands-on learning experiences are all designed to help students reach their objectives. 
              No matter where their aspirations take them, we're here to help them every step of the way, ensuring that they graduate not only with a certificate, but also with the skills, knowledge, and confidence to succeed in any path they choose. 
              At San Juan Institute of Technology, we are committed to making students' goals come true.</p>
        </div>
    </div>
  )
}

export default About
