import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Faculty_Reports.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import logo from "/src/assets/img/LandingPage/NavBar/logo.png";
import GradeDistributionChart from "./GradeDistributionChart";
import RatingDistributionChart from "./RatingDistributionChart";
import axios from "axios";

const Faculty_Reports = () => {
  const navigate = useNavigate();
  const [dropdownData, setDropdownData] = useState({});
  const [selectedSchoolYear, setSelectedSchoolYear] = useState("");
  const [semester, setSemester] = useState("");
  const [quarter, setQuarter] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [allStudents, setAllStudents] = useState([]);
  const [gradeDistributionData, setGradeDistributionData] = useState([]);
  const [ratingDistributionData, setRatingDistributionData] = useState([]); // New state for rating distribution data
  const [averageGrade, setAverageGrade] = useState(null);
  const [insights, setInsights] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [selectedFullName, setSelectedFullName] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleBackButtonClick = () => {
    navigate("/faculty/dashboard");
  };

  useEffect(() => {
    document.title = "Faculty - Reports";
    window.scrollTo(0, 0);

    const fetchDropdownData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get('https://san-juan-institute-of-technology-backend.onrender.com/reports/dropdowns', config);
        setDropdownData(response.data);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
        setErrorMessage("Failed to load dropdown data.");
      }
    };

    fetchDropdownData();
  }, []);

  const fetchAllStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get('https://san-juan-institute-of-technology-backend.onrender.com/reports/grades', {
        ...config,
        params: {
          school_year: selectedSchoolYear,
          semester,
          quarter,
          grade_level: gradeLevel,
          section,
          subject
        }
      });

      setAllStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      setErrorMessage("Failed to load student data.");
    }
  };

  const fetchInsights = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get('https://san-juan-institute-of-technology-backend.onrender.com/class-insights', {
        ...config,
        params: {
          school_year: selectedSchoolYear,
          semester,
          quarter,
          grade_level: gradeLevel,
          section_name: section,
          subject_name: subject
        }
      });

      setInsights(response.data.insights);
    } catch (error) {
      console.error('Error fetching insights:', error);
      setErrorMessage("Failed to load insights.");
    }
  };

  const fetchGradeDistribution = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
 };

      const response = await axios.get('https://san-juan-institute-of-technology-backend.onrender.com/reports/grades/distribution', {
        ...config,
        params: {
          school_year: selectedSchoolYear,
          semester,
          quarter,
          grade_level: gradeLevel,
          section,
          subject
        }
      });

      setGradeDistributionData(response.data);
    } catch (error) {
      console.error('Error fetching grade distribution:', error);
      setErrorMessage("Failed to load grade distribution data.");
    }
  };

  const fetchRatingDistribution = async () => { // New function to fetch rating distribution
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get('https://san-juan-institute-of-technology-backend.onrender.com/reports/grades/rating', {
        ...config,
        params: {
          school_year: selectedSchoolYear,
          semester,
          quarter,
          grade_level: gradeLevel,
          section,
          subject
        }
      });

      setRatingDistributionData(response.data); // Set the rating distribution data
    } catch (error) {
      console.error('Error fetching rating distribution:', error);
      setErrorMessage("Failed to load rating distribution data.");
    }
  };

  const fetchRemarks = async (fullName) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get('https://san-juan-institute-of-technology-backend.onrender.com/student-recommendations', {
        ...config,
        params: {
          full_name: fullName,
          school_year: selectedSchoolYear,
          semester,
          quarter,
          grade_level: gradeLevel,
          section_name: section,
          subject_name: subject
        }
      });

      setRemarks(response.data.recommendations.join('\n'));
    } catch (error) {
      console.error('Error fetching remarks:', error);
      setErrorMessage("Failed to load remarks.");
    }
  };

  useEffect(() => {
    setAllStudents([]);
    setGradeDistributionData([]);
    setRatingDistributionData([]); // Reset rating distribution data
    setAverageGrade(null);
    setInsights(null);
    setErrorMessage(""); // Reset error message

    if (selectedSchoolYear && semester && gradeLevel && section && subject && quarter) {
      fetchAllStudents();
      fetchGradeDistribution();
      fetchInsights();
      fetchRatingDistribution(); // Call the new fetch function
    }
  }, [selectedSchoolYear, semester, gradeLevel, section, subject, quarter]);

  useEffect(() => {
    const calculateAverageGrade = async () => {
      if (allStudents.length > 0) {
        const totalGrades = allStudents.reduce((acc, student) => acc + student.grade, 0);
        const average = totalGrades / allStudents.length;
        setAverageGrade(average.toFixed(2));
      } else {
        setAverageGrade(null);
      }
    };

    if (allStudents.length > 0) {
      calculateAverageGrade();
    }
  }, [allStudents]);

  const handleViewRemarks = (fullName) => {
    setShowPopup(true);
    setSelectedFullName(fullName); 
    fetchRemarks(fullName);
    
    // Disable scrolling
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setShowPopup(false);
    setRemarks("");
    
    // Enable scrolling
    document.body.style.overflow = 'auto';
  };

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

      <div className="faculty-report-main-content">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="header-with-dropdowns">
          <h1>Faculty Reports</h1>
          <div className="dropdowns-container">
            <select className="report-dropdown" key={0} onChange={(e) => setSelectedSchoolYear(e.target.value)}>
              <option value="">School Year</option>
              {dropdownData.school_year && dropdownData.school_year.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select className="report-dropdown" key={1} onChange={(e) => setSemester(e.target.value)}>
              <option value="">Semester</option>
              < option value="FIRST">FIRST</option>
              <option value="SECOND">SECOND</option>
            </select>

            <select className="report-dropdown" key={2} value={quarter} onChange={(e) => setQuarter(e.target.value)}>
              <option value="">Quarter</option>
              {semester === "FIRST" && (
                <>
                  <option value="1st">1st Quarter</option>
                  <option value="2nd">2nd Quarter</option>
                </>
              )}
              {semester === "SECOND" && (
                <>
                  <option value="3rd">3rd Quarter</option>
                  <option value="4th">4th Quarter</option>
                </>
              )}
            </select>

            <select className="report-dropdown" key={3} onChange={(e) => setGradeLevel(e.target.value)}>
              <option value="">Grade Level</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>

            <select className="report-dropdown" key={4} onChange={(e) => setSection(e.target.value)}>
              <option value="">Section</option>
              {dropdownData.sections && dropdownData.sections.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
            </select>

            <select className="report-dropdown" key={5} onChange={(e) => setSubject(e.target.value)}>
              <option value="">Subject</option>
              {dropdownData.subjects && dropdownData.subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="reports-container">
          <div className="left-side">
            <h2>All Students</h2>
            <table className="report-table-top">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Student Name</th>
                  <th>Grade</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {allStudents.length > 0 ? (
                  allStudents.map((student, index) => (
                    <tr key={index} style={{ backgroundColor: index < 10 ? '#d1e7dd' : 'transparent' }}>
                      <td style={{ fontWeight: index < 10 ? 'bold' : 'normal' }}>{index + 1}</td>
                      <td style={{ fontWeight: index < 10 ? 'bold' : 'normal' }}>{student.full_name}</td>
                      <td style={{ fontWeight: index < 10 ? 'bold' : 'normal' }}>{student.grade}</td>
                      <td style={{ fontWeight: index < 10 ? 'bold' : 'normal' }}>
                        <button 
                          onClick={() => handleViewRemarks(student.full_name)} 
                          style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', color: 'Blue' }}
                        >
                          View Remarks
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="grid-item-container-faculty">
              <div className="grid-item-insights-faculty">
                <h3 className="analytics">Insights and Recommendations</h3>
                {insights ? (
                  <div>
                    <p className="left-align">The average grade of the class is <strong>{insights.averageGrade}</strong></p>
                    <p className="left-align">The highest performing student in this class is <strong>{insights.highestGrade.student}</strong></p>
                    <p className="left-align">The lowest performing student in this class is <strong>{insights.lowestGrade.student}</strong></p>
                    
                    <div className="recommendations">
                      <h4>Recommendations:</h4>
                      <ul>
                        {insights.recommendations.map((recommendation, index) => (
                          <li key={index}>{recommendation}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p>No insights and recommendations available.</ p>
                )}
              </div>
            </div>  
          </div>

          <div className="right-side">
            <div className="grid-item">
              <h2>Grade Distribution</h2>
              <GradeDistributionChart data={gradeDistributionData} />
            </div>
            <div className="grid-item">
              <h2>Rating Distribution</h2>
              <RatingDistributionChart data={ratingDistributionData} /> {/* Pass the rating distribution data */}
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="modalOverlay">
          <div className="modal">
            <div className="modalHeader">
              <span className="modalTitle">Remarks for {selectedFullName}</span>
              <button
                className="modalCloseButton"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
            <div className="modalBody">
              <ul className="recommendations-list">
                {remarks.split('\n').map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculty_Reports;