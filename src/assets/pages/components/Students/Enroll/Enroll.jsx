import React, { useEffect, useState } from "react";
import "./Enroll.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/img/LandingPage/NavBar/logo.png";
import defaultProfile from "/src/assets/img/Profile/default_profile.png";
import EnrollStudent_SubjectsList from "./EnrollStudent_SubjectList";
import axios from "axios";

const Enroll = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null); // Student data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Set document title and scroll to top on component mount
    document.title = "Student - Enroll";
    window.scrollTo(0, 0);

    // Fetch student details from the API
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const response = await axios.get("http://localhost:3000/students-enroll", config);
        setStudentData(response.data);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div className="error">{error}</div>; // Display error state
  }

  if (!studentData) {
    // Display fallback when no data is available
    return (
      <div className="student-profile-preview">
        <div className="preview-details">
          <div className="user-profile-preview">
            <img src={defaultProfile} className="profile-pic" alt="Profile" />
          </div>
          <div className="student-enroll-info">
            <h2>No data available</h2>
          </div>
        </div>
      </div>
    );
  }

  // Destructure data for easier access
  const {
    full_name,
    student_id,
    program,
    school_year,
    semester,
    grade_level,
    strand,
    profile,
  } = studentData;

  const profileUrl = profile ? `data:image/jpeg;base64,${profile}` : defaultProfile;

  return (
    <div>
      <header className="headerFaculty-report">
        <button
          className="back-button-faculty-report"
          onClick={() => navigate("/student/dashboard")}
        >
          <IoMdArrowRoundBack />
        </button>
        <img src={logo} className="logo-faculty-report" alt="Logo" />
      </header>

      <div className="enroll-student-main-content">
        <div className="student-profile-preview">
          <div className="preview-details">
            <div className="user-profile-preview">
              <img src={profileUrl} className="profile-pic" alt="Profile" />
            </div>
            <div className="student-enroll-info">
              <h3>{student_id}</h3>
              <h2>{full_name}</h2>
              <h3>{program}</h3>
              <h3>
                {school_year}, {semester}
              </h3>
              <h3 >Grade {grade_level}</h3>
              <h3>{strand}</h3>
              <h3 className="status">Not Enrolled</h3>
            </div>
          </div>
        </div>
        <EnrollStudent_SubjectsList 
          gradeLevel={grade_level} 
          strand={strand} 
          semester={semester} 
          studentId={student_id}
          schoolYear={school_year}
        />
      </div>
    </div>
  );
};

export default Enroll;