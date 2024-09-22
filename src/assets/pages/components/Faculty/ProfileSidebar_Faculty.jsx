import React, { useEffect, useState } from 'react';
import '../../Faculty/Faculty_module.css';
import Notifications_Faculty from './Notifications_Faculty';

const ProfileSidebar_Faculty = () => {
  const [facultyData, setFacultyData] = useState({ fullName: '', role: '', schoolYear: '', semester: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      // Decode the JWT token to extract faculty info
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setFacultyData({
        fullName: decodedToken.fullName,
        role: decodedToken.role,
        schoolYear: decodedToken.schoolYear,  // Ensure this field is available
        semester: decodedToken.semester,      // Ensure this field is available
      });
    }
  }, []);
  

  return (
    <aside className='profileSidebar'>
      <div className='profileCard'>
        <div className='profileHeader'>
          <h2 className='profileTitle'>Profile</h2>
        </div>
        <div className='profileImage' />
          <div className='faculty-details'>
            <h2 className='facultyName'>{facultyData.fullName}</h2>
            <div className='sub-details'>
              <p className='facultyPosition'>{facultyData.role}</p>
              <p className='academicYear'>{facultyData.schoolYear}, {facultyData.semester}</p>
            </div>
          </div>
      </div>
      <Notifications_Faculty />
    </aside>
  );
};

export default ProfileSidebar_Faculty;
