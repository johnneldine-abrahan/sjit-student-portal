import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Enroll.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import logo from "/src/assets/img/LandingPage/NavBar/logo.png";
import defaultProfile from "/src/assets/img/Profile/default_profile.png";
import EnrollStudent_SubjectsList from "./EnrollStudent_SubjectList";

import axios from "axios";

const Enroll = () => {
  const navigate = useNavigate();
  const [dropdownData, setDropdownData] = useState({});
  const [selectedSchoolYear, setSelectedSchoolYear] = useState("");
  const [semester, setSemester] = useState("");
  const [quarter, setQuarter] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [topPerformingStudents, setTopPerformingStudents] = useState([]);
  const [lowPerformingStudents, setLowPerformingStudents] = useState([]);

  const [insights, setInsights] = useState(null);

  const handleBackButtonClick = () => {
    navigate("/student/dashboard");
  };

  useEffect(() => {
    document.title = "Student - Enroll";
    window.scrollTo(0, 0);

    const fetchDropdownData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "https://san-juan-institute-of-technology-backend.onrender.com/reports/dropdowns",
          config
        );
        setDropdownData(response.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  return (
    <div>
      <header className="headerFaculty-report">
        <button
          className="back-button-faculty-report"
          onClick={handleBackButtonClick}
        >
          <IoMdArrowRoundBack />
        </button>
        <img src={logo} className="logo-faculty-report" alt="Logo" />
      </header>

      <div className="enroll-student-main-content">
        <div className="student-profile-preview">
          <div className="preview-details">
            <div className="user-profile-preview">
              <img src={defaultProfile} className="profile-pic" alt="Profile" />
            </div>
            <div className="student-enroll-info">
              <h3>24-00000</h3>
              <h2>Sanchez, Kim William B.</h2>
              <h3>BSIT</h3>
              <h3>2024-2025, 1st semester</h3>
              <h3>Grade 7</h3>
              <h3>no strand</h3>
              <h3 className="status">Not Enrolled</h3>
            </div>
          </div>
        </div>
        <EnrollStudent_SubjectsList />
      </div>
    </div>
  );
};

export default Enroll;