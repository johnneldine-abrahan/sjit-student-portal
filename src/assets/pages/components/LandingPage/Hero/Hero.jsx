import React from 'react'
import './Hero.css'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/explore')
  }

  return (
    <div className='hero container'>
      <div className='hero-text'>
        <h1>Turning your dreams into reality...</h1>
        <p>We are committed to transforming student's aspirations into tangible outcomes by offering
          them the necessary education, support, and opportunities to achieve success</p>
        <button className='btn' onClick={handleExploreClick}>Explore more</button>
      </div>
    </div>
  )
}

export default Hero