import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Faculty_Reports.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import logo from "/src/assets/img/LandingPage/NavBar/logo.png";
import GradeDistributionChart from "./GradeDistributionChart";
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
  const [topPerformingStudents, setTopPerformingStudents] = useState([]);
  const [lowPerformingStudents, setLowPerformingStudents] = useState([]);
  const [gradeDistributionData, setGradeDistributionData] = useState([]);
  const [averageGrade, setAverageGrade] = useState(null);
  const [insights, setInsights] = useState(null);

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
      }
    };

    fetchDropdownData();
  }, []);

  // Fetch top-performing students based on selected filters
  const fetchTopPerformingStudents = async () => {
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

      setTopPerformingStudents(response.data);
    } catch (error) {
      console.error('Error fetching top-performing students:', error);
    }
  };

  // Fetch low-performing students based on selected filters
  const fetchLowPerformingStudents = async () => {
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

      const reversedData = [...response.data].reverse();
      const lowPerformers = reversedData.slice(0, 5).map((student, index) => ({
        ...student,
        rank: reversedData.length - index
      }));

      setLowPerformingStudents(lowPerformers);
    } catch (error){
      console.error('Error fetching low-performing students:', error);
    }
  };

  // Fetch insights based on selected filters
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
    }
  };

  // Fetch grade distribution based on selected filters
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
    }
  };

  useEffect(() => {
    setTopPerformingStudents([]);
    setLowPerformingStudents([]);
    setGradeDistributionData([]);
    setAverageGrade(null);
    setInsights(null);

    if (selectedSchoolYear && semester && gradeLevel && section && subject && quarter) {
      fetchTopPerformingStudents();
      fetchLowPerformingStudents();
      fetchGradeDistribution();
      fetchInsights();
    }
  }, [selectedSchoolYear, semester, gradeLevel, section, subject, quarter]);

  useEffect(() => {
    const calculateAverageGrade = async () => {
      const allStudents = await fetchAllStudents(); // Fetch all students
      if (allStudents.length > 0) {
        const totalGrades = allStudents.reduce((acc, student) => acc + student.grade, 0);
        const average = totalGrades / allStudents.length;
        setAverageGrade(average.toFixed(2));
      } else {
        setAverageGrade(null); // Reset if no students are found
      }
    };
  
    if (selectedSchoolYear && semester && gradeLevel && section && subject && quarter) {
      calculateAverageGrade(); // Call the function to calculate average
    }
  }, [selectedSchoolYear, semester, gradeLevel, section, subject, quarter]);
  
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
              <option value="FIRST">FIRST</option>
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
            <h2>Top Performing Students</h2>
            <table className="report-table-top">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Student Name</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingStudents.length > 0 ? (
                  topPerformingStudents.slice(0, 10).map((student, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{student.full_name}</td>
                      <td>{student.grade}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>

            <h2>Low Performing Students</h2>
            <table className="report-table-bottom">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Student Name</th>
                  <th>Grades</th>
                </tr>
              </thead>
              <tbody>
                {lowPerformingStudents.length > 0 ? (
                  lowPerformingStudents.map((student, index) => (
                    <tr key={index} style={{ fontWeight: student.grade <= 80 ? 'bold' : 'normal', color: student.grade <= 80 ? 'red' : 'black' }}>
                      <td>{student.rank}</td>
                      <td>{student.full_name}</td>
                      <td>{student.grade}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No data available</td>
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
                  <p>No insights and recommendations available.</p>
                )}
              </div>
            </div>  
          </div>

          <div className="right-side">
            <div className="grid-item">
              <h2>Grade Distribution</h2>
              <GradeDistributionChart data={gradeDistributionData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faculty_Reports;
