import React from 'react'
import './ContactUs.css'
import email from '../../../../img/LandingPage/ContactUs/email.png'
import phone from '../../../../img/LandingPage/ContactUs/phone.png'
import address from '../../../../img/LandingPage/ContactUs/address.png'

const ContactUs = () => {

    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "e18a8c76-b16c-4736-a25b-22c51189cce6");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        eventt.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };

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
            <form onSubmit={onSubmit}>
                <label>Name</label>
                <input type='text' name='name' placeholder='Enter your name' required />
                <label>Phone Number</label>
                <input type='tel' name='phone' placeholder='Enter your phone number' required />
                <label>Write your messaage here</label>
                <textarea name='message' id='' rows='6' placeholder='Enter your message' required></textarea>
                <button type='submit' className='btn dark-btn'>Submit Now</button>
            </form>
            <span>{result}</span>
        </div>
      
    </div>
  )
}

export default ContactUs