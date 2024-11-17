import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./Faculty_Reports.css";
import { IoMdArrowRoundBack } from "react-icons/io"; // Import the icons
import logo from "/src/assets/img/LandingPage/NavBar/logo.png";
import GradeDistributionChart from "./GradeDistributionChart"; // Adjust the path as necessary
import axios from "axios"; // Import axios for making API calls

const Faculty_Reports = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [dropdownData, setDropdownData] = useState({}); // State to hold dropdown data
  const [selectedSchoolYear, setSelectedSchoolYear] = useState(""); // State to hold selected school year
  const [semester, setSemester] = useState(""); // State to hold selected semester
  const [quarter, setQuarter] = useState(""); // State to hold selected quarter
  const [gradeLevel, setGradeLevel] = useState(""); // State to hold selected grade level
  const [section, setSection] = useState(""); // State to hold selected section
  const [subject, setSubject] = useState(""); // State to hold selected subject
  const [topPerformingStudents, setTopPerformingStudents] = useState([]); // State to hold top-performing students
  const [lowPerformingStudents, setLowPerformingStudents] = useState([]); // State to hold low-performing students

  const handleBackButtonClick = () => {
    navigate("/faculty/dashboard"); // Navigate to the specified route
  };

  useEffect(() => {
    document.title = "Faculty - Reports";
    window.scrollTo(0, 0);

    // Fetch dropdown data from the API
    const fetchDropdownData = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust the key as necessary
        const config = {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the headers
          }
        };

        const response = await axios.get('http://localhost:3000/reports/dropdowns', config); // Make the API call
        setDropdownData(response.data); // Set the dropdown data in state
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchDropdownData(); // Call the function to fetch dropdown data
  }, []);

  // Fetch top-performing students based on selected filters
  const fetchTopPerformingStudents = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get('http://localhost:3000/reports/grades', {
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

      setTopPerformingStudents(response.data); // Set the top-performing students in state
    } catch (error) {
      console.error('Error fetching top-performing students:', error);
    }
  };

  // Fetch low-performing students based on selected filters
  const fetchLowPerformingStudents = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.get('http://localhost:3000/reports/grades', {
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

      // Reverse the list to get lowest grades first
      const reversedData = [...response.data].reverse();

      // Slice the last 5 entries
      const lowPerformers = reversedData.slice(0, 5).map((student, index) => ({
        ...student,
        rank: reversedData.length - index // Calculate rank from the bottom
      }));

      setLowPerformingStudents(lowPerformers); // Set the low-performing students in state
    } catch (error) {
      console.error(' Error fetching low-performing students:', error);
    }
  };

  useEffect(() => {
    // Reset the student data when any dropdown selection changes
    setTopPerformingStudents([]);
    setLowPerformingStudents([]);

    if (selectedSchoolYear && semester && gradeLevel && section && subject && quarter) {
      fetchTopPerformingStudents();
      fetchLowPerformingStudents(); // Fetch low-performing students as well
    }
  }, [selectedSchoolYear, semester, gradeLevel, section, subject, quarter]);

  return (
    <div>
      <header className="headerFaculty-report">
        <button
          className="back-button-faculty-report"
          onClick={handleBackButtonClick} // Use the function to handle back button click
        >
          <IoMdArrowRoundBack /> {/* Use the icon here */}
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
                      <td>{student.rank}</td> {/* Display calculated rank */}
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
          </div>

          <div className="right-side">
            <div className="grid-item">
              <h2>Grade Distribution</h2>
              <GradeDistributionChart /> {/* Insert the GradeDistributionChart here */}
            </div>
            <div className="grid-item">Grid Item 2</div>
            <div className="grid-item">Grid Item 3</div>
            <div className="grid-item">Grid Item 4</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faculty_Reports;