import React, { useState } from 'react';
import './Finance_Profile.css';
import { BiEditAlt } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import Profile from '../../../../../img/Profile/ProfileSample.jpg'

const Finance_ProfileHeader = () => {
  const navigate = useNavigate();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
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
    navigate('/login');
  };

  const handleEditClick = () => {
    setIsEditPopupOpen(true);
  }

  const handlePopupClose = () => {
    setIsEditPopupOpen(false);
  }

  return (
    <div className='finance-profile-header'>
        <h2 className='profile-title'>Profile</h2>
        <div className='buttons-header'>
            <div className='profile-act'>
                <BiEditAlt className='profile-icon' onClick={handleEditClick} />
            </div>
            <div className='profile-act'>
                <LuLogOut className='profile-icon' onClick={handleLogout}/>
            </div>
        </div>
        {isEditPopupOpen && (
          <>
            <div className='popup-blurred-background' />
            <div className='popup'>
              <div className='popup-header'>
                <h3 className='popup-title'>Edit Profile</h3>
                <button className='close-button' onClick={handlePopupClose}>Close</button>
              </div>
              <div className='popup-content'>
                <form>
                <div className='change-profile'>
                  <img src={Profile} alt="" />
                </div>

                <div className="first-row">
                <div className="input-box">
                  <label>First Name <input type='text' name='first_name' /></label>
                </div>
                <div className='input-box'>
                  <label>Last Name <input type='text' name='last_name' /></label>
                </div>
              </div>

              <div className='second-row'>
                <div className='input-box'>
                  <label>Username <input type='text' name='username' /></label>
                </div>
                <div className='input-box'>
                  <label>Password <input type='text' name='password' /></label>
                </div>
              </div>

              <div class='buttons'>
                <button type="submit" class="btn-box" name="add" id="add">Done</button>
              </div>
              
              </form>
              </div>

            </div>
          </>
        )}
        {isModalOpen.show && (
          <div className='modalOverlay' onClick={handleClose} />
        )}
        {isModalOpen.show && (
          <div className='modal-logout'>
            <div className='modalHeader'>
              <h3 className='modalTitle'>Log out</h3>
              <button className='modalCloseButton' onClick={handleClose}>Close</button>
            </div>
            <div className='modalBody'>
              <p>{isModalOpen.message}</p>
              <div class='buttons'>
                <button type="submit" class="btn-box" name="add" id="add" onClick={handleConfirmLogout}>Log out</button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Finance_ProfileHeader
