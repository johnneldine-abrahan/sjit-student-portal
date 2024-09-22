import React, { useState, useEffect } from "react";
import "./Finance_Profile.css";
import Finance_ProfileHeader from "./Finance_ProfileHeader";
import Profile from "../../../../../img/Profile/ProfileSample.jpg";

const Finance_Profile = () => {
  const [dateTime, setDateTime] = useState(new Date());

  // Update dateTime every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const [userData, setUserData] = useState({ firstName: '', lastName: '', role: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Decode JWT token to extract user info
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserData({
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        role: decodedToken.role
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
    <div className="finance-profile">
      <Finance_ProfileHeader />

      <div className="user-profile">
        <div className="user-details">
          <img src={Profile} alt="" />
          <h3 className="admin-fullname">{userData.firstName} {userData.lastName}</h3>
          <span className="position">{userData.role}</span>
        </div>

        <div className="calendar-container">
          <div className="date-time-widget">
            <h4>{formatDate(dateTime)}</h4>
            <p>{formatTime(dateTime)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance_Profile;