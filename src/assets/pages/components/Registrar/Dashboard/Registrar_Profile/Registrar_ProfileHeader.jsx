import React, { useState, useEffect, useRef } from 'react';
import './Registrar_Profile.css';
import { BiEditAlt } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import Profile from '../../../../../img/Profile/ProfileSample.jpg';

const Registrar_ProfileHeader = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({
    show: false,
    message: '',
  });
  const [profileImage, setProfileImage] = useState(Profile); // Default profile image
  const fileInputRef = useRef(null); // Reference for file input
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    user_id: '',
    password: '',
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
    localStorage.clear('token');
    navigate('/login');
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

  const handleProfilePictureClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the new profile image
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch user profile data when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://san-juan-institute-of-technology-backend.onrender.com/gen/profile/fetch', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUserData({
          first_name: data.first_name,
          last_name: data.last_name,
          user_id: data.user_id,
          password: '', // Initialize password as empty
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://san-juan-institute-of-technology-backend.onrender.com/update-password', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ newPassword: userData.password }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      const result = await response.json();
      console.log(result.message); // Handle success message
      alert('Password updated successfully!'); // Show alert message
      setShowPopup(false); // Close the popup after submitting
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password. Please try again.'); // Show error alert
    }
  };

  useEffect(() => {
    // Disable scrollbar when either the popup or modal is open
    if (showPopup || isModalOpen.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset'; // Reset overflow when both are closed
    }

    return () => {
      document.body.style.overflow = 'unset'; // Cleanup on unmount
    };
  }, [showPopup, isModalOpen.show]);

  return (
    <div className="Registrar-p_header">
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
              <form onSubmit={handleSubmit}>
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
                    <label>First Name <input disabled type='text' name='first_name' value={userData.first_name} /></label>
                  </div>
                  <div className='input-box'>
                    <label>Last Name <input disabled type='text' name='last_name' value={userData.last_name} /></label>
                  </div>
                </div>

                <div className='second-row'>
                  <div className='input-box'>
                    <label>User ID <input disabled type='text' name='user_id' value={userData.user_id} /></label>
                  </div>
                  <div className='input-box'>
                    <label>Password <input type='password' name='password' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} /></label>
                  </div>
                </div>

                <div className='buttons'>
                  <button type="submit" className="btn-box" name="add" id="add">Done</button>
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
              <button type="button" className="btn-box" name="add" id="add" onClick={handleConfirmLogout}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registrar_ProfileHeader;