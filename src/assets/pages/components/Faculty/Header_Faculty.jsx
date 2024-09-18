import React, { useState, useEffect } from 'react';
import '../../Faculty/Faculty_module.css';
import logo from '../../../img/LandingPage/NavBar/logo.png';
import { LuLogOut } from "react-icons/lu";

const Header_Faculty = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    show: false,
    message: '',
  });

  const handleLogout = () => {
    setIsModalOpen({
      show: true,
      message: 'Are you sure you want to log out?',
    });
  };

  const handleClose = () => {
    setIsModalOpen({
      show: false,
      message: '',
    });
  };

  const handleConfirmLogout = () => {
    console.log('Logging out...');
    setIsModalOpen({
      show: false,
      message: '',
    });
  };

  useEffect(() => {
    if (isModalOpen.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset'; // Reset overflow when modal is closed
    }

    // Clean up the effect when the component unmounts or modal closes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen.show]);

  return (
    <header className='headerFaculty'>
      <img src={logo} className='logo-faculty' />
      <button
        className='btn log-out'
        onClick={handleLogout}
      >
        Log out<LuLogOut className='btn-img' />
      </button>

      {isModalOpen.show && (
        <div className='modalOverlay' onClick={handleClose} />
      )}
      {isModalOpen.show && (
        <div className='modal'>
          <div className='modalHeader'>
            <h3 className='modalTitle'>Log out</h3>
            <button className='modalCloseButton' onClick={handleClose}>Close</button>
          </div>
          <div className='modalBody'>
            <p>{isModalOpen.message}</p>
            <button onClick={handleConfirmLogout}>Confirm</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header_Faculty;
