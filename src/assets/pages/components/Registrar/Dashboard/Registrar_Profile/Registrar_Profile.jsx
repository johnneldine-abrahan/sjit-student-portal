import React, { useState, useEffect } from "react";
import "./Registrar_Profile.css";
import Registrar_ProfileHeader from "./Registrar_ProfileHeader";
import defaultProfilePic from "../../../../../img/Profile/default_profile.png"; // Adjust the path as necessary

const Registrar_Profile = () => {
  const [dateTime, setDateTime] = useState(new Date());

  // Update dateTime every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const [userData, setUserData] = useState({ firstName: '', lastName: '', role: '', profile: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Decode JWT token to extract user info
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserData({
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        role: decodedToken.role,
        profile: decodedToken.profile || defaultProfilePic // Use default if profile is not available
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
    <div className="Registrar-profile">
      <Registrar_ProfileHeader />

      <div className="user-profile">
        <div className="user-details">
          <img src={userData.profile} alt="Profile" /> {/* Use profile picture from userData */}
          <h3 className="Registrar-fullname">{userData.firstName} {userData.lastName}</h3>
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

export default Registrar_Profile;