import React, { useState, useEffect } from "react";
import "./Admin_Profile.css";
import Admin_ProfileHeader from "./Admin_ProfileHeader";
import Profile from "../../../../../img/Profile/ProfileSample.jpg";

const Admin_Profile = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="admin-profile">
      <Admin_ProfileHeader />

      <div className="user-profile">
        <div className="user-details">
          <img src={Profile} alt="" />
          <h3 className="admin-fullname">Juan Dela Cruz</h3>
          <span className="position">Admin</span>
        </div>

        <div className="calendar">
          <h4>{formatDate(currentTime)}</h4>
          <p>{formatTime(currentTime)}</p>
        </div>
      </div>
    </div>
  );
};

export default Admin_Profile;