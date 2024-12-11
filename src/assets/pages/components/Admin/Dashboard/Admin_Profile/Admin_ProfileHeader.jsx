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
  const [profileImage, setProfileImage] = useState(Profile);
  const [userProfile, setUserProfile] = useState({ first_name: '', last_name: '', user_id: '', password: '' });
  const fileInputRef = useRef(null);

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
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isModalOpen.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen.show]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://san-juan-institute-of-technology-backend.onrender.com/user/profile/fetch', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (showPopup) {
      fetchUserProfile();
    }
  }, [showPopup]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
      };

      // Only include password if it's not empty
      if (userProfile.password) {
        body.password = userProfile.password;
      }

      const response = await fetch('https://san-juan-institute-of-technology-backend.onrender.com/user/profile/update', {
        method:
        'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await response.json();
      alert(result.message); // Show success message as an alert
      setShowPopup(false); // Close the popup after successful update
    } catch (error) {
      console.error('Error updating user profile:', error);
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
              <form onSubmit={handleSubmit}>
                <div className='change-profile' onClick={handleProfilePictureClick}>
                  <img src={profileImage} alt="Profile" className="profile-image" />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
                <div className="first-row">
                  <div className="input-box">
                    <label>First Name <input type='text' name='first_name' value={userProfile.first_name} onChange={handleInputChange} /></label>
                  </div>
                  <div className='input-box'>
                    <label>Last Name <input type='text' name='last_name' value={userProfile.last_name} onChange={handleInputChange} /></label>
                  </div>
                </div>
                <div className='second-row'>
                  <div className='input-box'>
                    <label>User ID <input disabled type='text' name='user_id' value={userProfile.user_id} /></label>
                  </div>
                  <div className='input-box'>
                    <label>Password <input type='password' name='password' value={userProfile.password} onChange={handleInputChange} /></label>
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
              <button type="submit" className="btn-box" name="add" id="add" onClick={handleConfirmLogout}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin_ProfileHeader;