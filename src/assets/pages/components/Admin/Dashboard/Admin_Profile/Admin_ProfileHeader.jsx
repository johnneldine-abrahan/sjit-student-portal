import React, { useState, useEffect, useRef } from 'react';
import './Admin_Profile.css';
import { BiEditAlt } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import Profile from '../../../../../img/Profile/ProfileSample.jpg';

const Admin_ProfileHeader = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({ show: false, message: '' });
  const [profileImage, setProfileImage] = useState(Profile); // State for profile image
  const fileInputRef = useRef(null); // Ref for the file input

  const handleLogout = () => {
    setIsModalOpen({ show: true, message: 'Are you sure you want to log out?' });
  };

  const handleClose = () => {
    setIsModalOpen({ show: false, message: '' });
  };

  const handleConfirmLogout = () => {
    console.log('Logging out...');
    setIsModalOpen({ show: false, message: '' });
    localStorage.clear('token');
    navigate('/login');
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Update the profile image state
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  useEffect(() => {
    if (isModalOpen.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset'; // Reset overflow when modal is closed
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen.show]);

  return (
    <div className="admin-p_header">
      <h2 className='profile-title'>Profile</h2>
      <div className='buttons-header'>
        <div className='profile-act'>
          <BiEditAlt className='profile-icon' onClick={() => setShowPopup(true)} />
        </div>
        <div className='profile-act'>
          <LuLogOut className='profile-icon' onClick={handleLogout} />
        </div>
      </div>
      {showPopup && (
        <>
          <div className="popup-blurred-background" />
          <div className="popup">
            <div className="popup-header">
              <h3 className="popup-title">Edit Profile</h3>
              <button className="close-button" onClick={() => setShowPopup(false)}>Close</button>
            </div>
            <div className="popup-content">
              <form onSubmit={(e) => {
                e.preventDefault();
                console.log('Form submitted:');
                setShowPopup(false); // Close the popup after submitting
              }}>
                <div className='change-profile' onClick={handleProfilePictureClick}>
                  <img src={profileImage} alt="Profile" className="profile-image" />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }} // Hide the file input
                    onChange={handleFileChange}
                    accept="image/*" // Accept only image files
                  />
                </div>
                <div className="first-row">
                  <div className="input-box">
                    <label>First Name <input disabled type='text' name='first_name' /></label>
                  </div>
                  <div className='input-box'>
                    <label>Last Name <input disabled type='text' name='last_name' /></label>
                  </div>
                </div>
                <div className='second-row'>
                  <div className='input-box'>
                    <label>Username <input disabled type='text' name='username' /></label>
                  </div>
                  <div className='input-box'>
                    <label>Password <input type='text' name='password' /></label>
                  </div>
                </div>
                <div className='buttons'>
                  <button type="submit" className="btn-box " name="add" id="add">Done</button>
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
            <div className='buttons'>
              <button type="submit" className="btn-box" name="add" id="add" onClick={handleConfirmLogout}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin_ProfileHeader;