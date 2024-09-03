import React from 'react'
import NavBar from './components/LandingPage/NavBar/Navbar'
import Hero from './components/LandingPage/Hero/Hero'
import Title from './components/LandingPage/Title/Title'
import Programs from './components/LandingPage/Progams/Programs'
import Strand from './components/LandingPage/Strand/Strand'
import About from './components/LandingPage/About/About'
import ContactUs from './components/LandingPage/ContactUs/ContactUs'
import Footer from './components/LandingPage/Footer/Footer'
import Admissions from './components/LandingPage/Admissions/Admissions'

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <div className='container'>
        <Title subTitle='Our Program' title='Basic Education Program'/>
        <Programs />
        <Title subTitle='Senior High School Program' title='Strands Offered'/>
        <Strand />
        <About />
        <Admissions />
        <Title subTitle='Contact Us' title='Get in touch' />
        <ContactUs />
        <Footer />

      </div>
    </div>
  )
}

export default LandingPage
