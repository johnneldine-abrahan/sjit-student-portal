import React, { useEffect, useState } from 'react';
import '../../Faculty/Faculty_module.css'; // Import the CSS file
import Notifications_Faculty from './Notifications_Faculty';
import { BiEditAlt } from "react-icons/bi";
import defaultProfilePic from '../../../img/Profile/default_profile.png'; // Adjust the path as necessary

const ProfileSidebar_Faculty = () => {
  const [facultyData, setFacultyData] = useState({ 
    fullName: '', 
    role: '', 
    schoolYear: '', 
    semester: '', 
    profile: defaultProfilePic // Set default profile picture
  });
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setFacultyData({
        fullName: decodedToken.fullName,
        role: decodedToken.role,
        schoolYear: decodedToken.schoolYear,
        semester: decodedToken.semester,
        profile: decodedToken.profile && decodedToken.profile.trim() !== '' ? decodedToken.profile : defaultProfilePic // Use default if profile is null or empty
      });
      setFormData({
        firstName: decodedToken.firstName || '',
        lastName: decodedToken.lastName || '',
        username: decodedToken.username || '',
        password: '',
      });
    }
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showPopup]);

  const handleEditProfile = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    setShowPopup(false);
  };

  return (
    <aside className='profileSidebar'>
      <div className='profileCard'>
        <div className='profileHeader'>
          <h2 className='profileTitle'>Profile</h2>
          <BiEditAlt className='profile-icon' onClick={() => setShowPopup(true)} />
        </div>
        <div className='profileImage'>
          <img src={facultyData.profile} alt="Profile" className="profile-picture" /> {/* Display profile picture */}
        </div>
        <div className='faculty-details'>
          <h2 className='facultyName'>{facultyData.fullName}</h2>
          <div className='sub-details'>
            <p className='facultyPosition'>{facultyData.role}</p>
            <p className='academicYear'>{facultyData.schoolYear}, {facultyData.semester}</p>
          </div>
        </div>
      </div>
      <Notifications_Faculty />

      {showPopup && (
        <>
          <div className="popup-blurred-background" />
          <div className="popup">
            <div className="popup-header">
              <h3 className="popup-title">Edit Profile</h3>
              <button className="close-button" onClick={() => setShowPopup(false)}>Close</button>
            </div>
            <div className="popup-content">
              <form onSubmit={handleEditProfile}>
                <div className='change-profile'>
                  <div className='profileImage'>
                    <img src={facultyData.profile} alt="Profile" className="profile-picture" /> {/* Display profile picture in popup */}
                  </div>
                </div>
                <div className="first-row">
                  <div className="input-box">
                    <label>First Name <input type='text' name='first_name' value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} /></label>
                  </div>
                  <div className='input-box'>
                    <label>Last Name <input type='text' name='last_name' value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} /></label>
                  </div>
                </div>

                <div className='second-row'>
                  <div className='input-box'>
                    <label>Username <input type='text' name='username ' value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} /></label>
                  </div>
                  <div className='input-box'>
                    <label>Password <input type='text' name='password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} /></label>
                  </div>
                </div>

                <div className='buttons '>
                  <button type="submit" className="btn-box" name="add" id="add">Done</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

export default ProfileSidebar_Faculty;