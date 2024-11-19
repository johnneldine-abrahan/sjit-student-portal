import React, { useEffect, useState } from "react"; // Import useEffect and useState from React
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "axios"; // Import Axios for making HTTP requests
import "./Student_Reports.css";
import { IoMdArrowRoundBack } from "react-icons/io"; // Import the icons
import logo from "/src/assets/img/LandingPage/NavBar/logo.png";
import StudentGradesChart from "/src/assets/pages/components/Students/Student_Reports/StudentGradesChart.jsx"; // Import the new chart component

const Student_Reports = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [semester, setSemester] = useState(""); // State for semester
  const [quarter, setQuarter] = useState(""); // State for quarter
  const [selectedGrade, setSelectedGrade] = useState(""); // State for selected grade
  const [schoolYears, setSchoolYears] = useState([]); // State for school years

  const handleBackButtonClick = () => {
    navigate("/student/dashboard"); // Navigate to the specified route
  };

  // Fetch school years from the backend
  useEffect(() => {
    const fetchSchoolYears = async () => {
      try {
        const response = await axios.get('http://localhost:3000/school_years/dropdown');
        setSchoolYears(response.data); // Set the fetched school years to state
      } catch (error) {
        console.error('Error fetching school years:', error);
      }
    };

    fetchSchoolYears(); // Call the function to fetch school years
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []); // Empty dependency array means this runs once on mount

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
          <h1>Student Reports</h1>
          <div className="dropdowns-container">
            <select className="report-dropdownstudent" key={0}>
              <option value="">School Year</option>
              {schoolYears.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
            <select className="report-dropdownstudent" key={1} onChange={(e) => setSemester(e.target.value)}>
              <option value="">Semester</option>
              <option value="FIRST">FIRST</option>
              <option value="SECOND">SECOND</option>
            </select>

            <select className="report-dropdownstudent" key={2} value={quarter} onChange={(e) => setQuarter(e.target.value)}>
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

            <select className="report-dropdownstudent" key={3} onChange={(e) => setSelectedGrade(e.target.value)}>
              <option value="">Grade Level</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade  11</option>
              <option value="12">Grade 12</option>
            </select>

            <select className="report-dropdownstudent" key={4} disabled={selectedGrade && (selectedGrade < 11)}>
              <option value="">Strand</option>
              <option value="7">STEM</option>
              <option value="8">ABM</option>
              <option value="9">HUMSS</option>
              <option value="10">TVL-IA</option>
              <option value="11">TVL-HE</option>
              <option value="12">TVL-ICT</option>
            </select>

          </div>
        </div>

        <div className="reports-container">
          <div className="left-side">
            {/* Title for the first table */}
            <h2>My Grades</h2>
            <table className="report-table-mygrades">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Grades</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                {/* Repeat rows as needed */}
              </tbody>
            </table>
          </div>

          <div className="right-side">
            <div className="grid-item">
              <StudentGradesChart />
            </div>
            <div className="grid-item-container-student">
              <div className="grid-item-insights-student">
                <h3>Insights</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="grid-item-reco-student">
                <h3>Recommendations</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student_Reports;