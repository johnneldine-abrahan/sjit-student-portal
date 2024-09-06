import React from 'react'
import './Strand.css'
import placeholder from '../../../../img/LandingPage/Strand/placeholder.jpg'
import stem_logo from '../../../../img/LandingPage/Strand/stem_logo.png'
import stem from '../../../../img/LandingPage/Strand/stem.jpg'
import abm_logo from '../../../../img/LandingPage/Strand/abm_logo.png'
import abm from '../../../../img/LandingPage/Strand/abm.jpg'
import humss from '../../../../img/LandingPage/Strand/humss.jpg'
import humss_logo from '../../../../img/LandingPage/Strand/humss_logo.png'
import ict_logo from '../../../../img/LandingPage/Strand/ict_logo.png'
import ict from '../../../../img/LandingPage/Strand/ict.jpg'
import ia_logo from '../../../../img/LandingPage/Strand/ia_logo.png'
import he_logo from '../../../../img/LandingPage/Strand/he_logo.png'


const Strand = () => {
  return (
    <>
      {/* First Row */}
      <div className='strand_container'>
        <div className='strand'>
          <img src={placeholder} alt="" />
          <div className='caption_strand'>
            <img src={stem_logo} alt="" />
            <p>Science and Technology, Engineering and Mathematics (STEM)</p>
          </div>
        </div>
        <div className='strand'>
          <img src={placeholder} alt="" />
          <div className='caption_strand'>
            <img src={abm_logo} alt="" />
            <p>Accoutancy, Business and Mathematics (ABM)</p>
          </div>
        </div>
        <div className='strand'>
          <img src={placeholder} alt="" />
          <div className='caption_strand'>
            <img src={humss_logo} alt="" />
            <p>Humanities and Social Sciences (HUMSS)</p>
          </div>
        </div>
      </div>
      
      {/* Second Row */}
      <div className='strand_container'>
        <div className='strand'>
          <img src={ict} alt="" />
          <div className='caption_strand'>
            <img src={ict_logo} alt="" />
            <p>Internet & Communication Technology (TVL-ICT)</p>
          </div>
        </div>
        <div className='strand'>
          <img src={placeholder} alt="" />
          <div className='caption_strand'>
            <img src={he_logo} alt="" />
            <p>Home Economics (TVL-HE)</p>
          </div>
        </div>
        <div className='strand'>
          <img src={placeholder} alt="" />
          <div className='caption_strand'>
            <img src={ia_logo} alt="" />
            <p>Industrial Arts (TVL-IA)</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Strand
