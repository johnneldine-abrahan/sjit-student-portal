import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./Faculty_Reports.css";
import { IoMdArrowRoundBack } from "react-icons/io"; // Import the icons
import logo from "/src/assets/img/LandingPage/NavBar/logo.png";

const Faculty_Reports = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBackButtonClick = () => {
    navigate("/faculty/dashboard"); // Navigate to the specified route
  };

  return (
    <div>
      <header className="headerFaculty-report">
        <img src={logo} className="logo-faculty-report" alt="Logo" />
      </header>

      <div className="faculty-report-main-content">
        <button
          className="back-button-faculty-report"
          onClick={handleBackButtonClick} // Use the function to handle back button click
        >
          <IoMdArrowRoundBack /> {/* Use the icon here */}
        </button>
        <h1>Faculty Reports</h1>
      </div>
    </div>
  );
};

export default Faculty_Reports;