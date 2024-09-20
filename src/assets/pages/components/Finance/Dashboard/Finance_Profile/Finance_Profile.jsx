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
          <img src={Profile} alt="Profile" />
          <h3 className="finance-fullname">Juan Dela Cruz</h3>
          <span className="position">Finance</span>
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