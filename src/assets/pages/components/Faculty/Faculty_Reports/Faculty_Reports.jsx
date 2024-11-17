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
  const [semester, setSemester] = useState(""); // State to hold selected semester
  const [quarterOptions, setQuarterOptions] = useState([]); // State to hold quarter options
  const [gradeLevel, setGradeLevel] = useState(""); // State to hold selected grade level

  const handleBackButtonClick = () => {
    navigate("/faculty/dashboard"); // Navigate to the specified route
  };

  useEffect(() => {
    document.title = "Faculty - Reports";
    window.scrollTo(0, 0);

    // Fetch dropdown data from the API
    const fetchDropdownData = async () => {
        try {
            // Get the token from local storage
            const token = localStorage.getItem('token'); // Adjust the key as necessary

            // Set the authorization header
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

  // Update quarter options based on selected semester
  useEffect(() => {
    if (semester === "FIRST") {
      setQuarterOptions(["1st Quarter", "2nd Quarter"]);
    } else if (semester === "SECOND") {
      setQuarterOptions(["3rd Quarter", "4th Quarter"]);
    } else {
      setQuarterOptions([]); // Reset options if no valid semester is selected
    }
  }, [semester]);

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
            <select className="report-dropdown" key={0}>
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

            <select className="report-dropdown" key={2}>
              <option value=""></option>
              { quarterOptions. map((quarter, index) => (
                <option key={index} value={quarter}>
                  {quarter}
                </option>
              ))}
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

            <select className="report-dropdown" key={4}>
              <option value="">Section</option>
              {dropdownData.sections && dropdownData.sections.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
            </select>

            <select className="report-dropdown" key={5}>
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
                <tr>
                  <td>1</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
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
                <tr>
                  <td>1</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
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