import React from 'react'
import './ContactUs.css'
import email from '../../../../img/LandingPage/ContactUs/email.png'
import phone from '../../../../img/LandingPage/ContactUs/phone.png'
import address from '../../../../img/LandingPage/ContactUs/address.png'

const ContactUs = () => {
  return (
    <div className='contact'>
        <div className='contact-col'>
            <h3>Send us a message <img src="" alt=""/></h3>
            <p>Please contact us using the contact form or the details provided below. 
                We value your thoughts, questions, and recommendations as we work to deliver 
                great service to our institution's community.</p>
            <ul>
                <li><img src={email} alt="" />sanjuantech2018@gmail.com</li>
                <li><img src={phone} alt="" />0910 319 5325</li>
                <li><img src={address} alt="" />Brgy. Mabalanoy, San Juan, Batangas</li>
            </ul>
        </div>
        <div className='contact-col'>
            <form>
                <label>Name</label>
                <input type='text' name='name' placeholder='Enter your name' required />
                <label>Phone Number</label>
                <input type='tel' name='phone' placeholder='Enter your phone number' required />
                <label>Write your messaage here</label>
                <textarea name='message' id='' rows='6' placeholder='Enter your message' required></textarea>
                <button type='submit' className='btn dark-btn'>Submit Now</button>
            </form>
            
        </div>
      
    </div>
  )
}

export default ContactUs
