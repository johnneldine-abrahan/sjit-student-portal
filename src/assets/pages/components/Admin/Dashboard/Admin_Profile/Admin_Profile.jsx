import React, { useState, useEffect } from "react";
import "./Admin_Profile.css";
import Admin_ProfileHeader from "./Admin_ProfileHeader";
import Profile from "../../../../../img/Profile/ProfileSample.jpg";

const Admin_Profile = () => {
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

  return (
    <div className="admin-profile">
      <Admin_ProfileHeader />

      <div className="user-profile">
        <div className="user-details">
          <img src={Profile} alt="" />
          <h3 className="admin-fullname">{userData.firstName} {userData.lastName}</h3>
          <span className="position">{userData.role}</span>
        </div>

        <div className="calendar">
          <h4>{new Date().toLocaleDateString()}</h4>
          <p>{new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Admin_Profile;