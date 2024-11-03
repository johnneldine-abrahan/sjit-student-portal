import React, { useEffect, useState } from 'react';
import '../../Faculty/Faculty_module.css'; // Import the CSS file
import Notifications_Faculty from './Notifications_Faculty';
import { BiEditAlt } from "react-icons/bi";

const ProfileSidebar_Faculty = () => {
  const [facultyData, setFacultyData] = useState({ fullName: '', role: '', schoolYear: '', semester: '' });
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
          {/* Profile image can go here */}
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
                    {/* Profile image can go here */}
                  </div>
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