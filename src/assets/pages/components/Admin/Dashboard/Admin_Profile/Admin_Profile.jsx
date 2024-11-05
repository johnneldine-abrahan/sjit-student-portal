import React, { useState, useEffect } from "react";
import "./Admin_Profile.css";
import Admin_ProfileHeader from "./Admin_ProfileHeader";
import defaultProfilePic from '../../../../../img/Profile/default_profile.png';

const Admin_Profile = () => {
  const [dateTime, setDateTime] = useState(new Date());

  // Update dateTime every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  const [userData, setUserData] = useState({ firstName: '', lastName: '', role: '', profile: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserData({
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        role: decodedToken.role,
        profile: decodedToken.profile || defaultProfilePic // Default if profile is missing
      });
    }
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="admin-profile">
      <Admin_ProfileHeader />

      <div className="user-profile">
        <div className="user-details">
          <img src={userData.profile || defaultProfilePic} alt="User Profile" />
          <h3 className="admin-fullname">{userData.firstName} {userData.lastName}</h3>
          <span className="position">{userData.role}</span>
        </div>

        <div className="calendar">
          <h4>{formatDate(dateTime)}</h4>
          <p>{formatTime(dateTime)}</p>
        </div>
      </div>
    </div>
  );
};

export default Admin_Profile;
