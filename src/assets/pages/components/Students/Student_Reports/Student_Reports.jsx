import React, { useEffect, useState } from "react"; // Import useEffect and useState from React
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "axios"; // Import Axios for making HTTP requests
import "./Student_Reports.css"; // Import CSS styles
import { IoMdArrowRoundBack } from "react-icons/io"; // Import the icons
import logo from "/src/assets/img/LandingPage/NavBar/logo.png"; // Import logo
import StudentGradesChart from "/src/assets/pages/components/Students/Student_Reports/StudentGradesChart.jsx"; // Import the new chart component

const Student_Reports = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [semester, setSemester] = useState(""); // State for semester
  const [quarter, setQuarter] = useState(""); // State for quarter
  const [selectedGrade, setSelectedGrade] = useState(""); // State for selected grade
  const [schoolYears, setSchoolYears] = useState([]); // State for school years
  const [gradesData, setGradesData] = useState([]); // State for grades data

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

  // Fetch grades data from the back-end
  useEffect(() => {
    const fetchGrades = async () => {
      if (selectedGrade && semester && quarter && schoolYears.length > 0) {
        const schoolYear = schoolYears[0]; // Assuming the first school year is selected
        try {
          const token = localStorage.getItem("token"); // Retrieve token from local storage
          const response = await axios.get(
            `http://localhost:3000/grades-reports-students?school_year=${schoolYear}&semester=${semester}&quarter=${quarter}&grade_level=${selectedGrade}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
              },
            }
          );

          // Check if the response data is empty
          if (response.data && response.data.length > 0) {
            setGradesData(response.data); // Set the grades data to state
          } else {
            setGradesData([]); // Set to empty array if no data is returned
          }
        } catch (error) {
          console.error("Error fetching grades:", error);
          setGradesData([]); // Optionally, set to empty if an error occurs
        }
      } else {
        setGradesData([]); // Reset grades data if dropdowns are not fully selected
      }
    };

    fetchGrades(); // Call the function to fetch grades
  }, [selectedGrade, semester, quarter, schoolYears]); // Dependencies for fetching grades

  // Calculate average grade
  const calculateAverageGrade = () => {
    if (gradesData.length === 0) return 0;
    const total = gradesData.reduce((sum, grade) => sum + Number(grade.grade), 0);
    return (total / gradesData.length).toFixed(2); // Return average with two decimal points
  };

  const averageGrade = calculateAverageGrade(); // Get the average grade

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
          <h1>Student Reports </h1>
          <div className="dropdowns-container">
            <select className ="report-dropdownstudent" key={0}>
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
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>

          </div>
        </div>

        <div className="reports-container">
          <div className="left-side">
            <h2>My Grades</h2>
            <table className="report-table-mygrades">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Grades</th>
                </tr>
              </thead>
              <tbody>
                {gradesData.length > 0 ? (
                  gradesData.map((grade) => (
                    <tr key={grade.subject_name}>
                      <td>{grade.subject_name}</td>
                      <td>{grade.grade}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center' }}>No data available</td>
                  </tr>
                )}
                <tr>
                  <td style={{ textAlign: 'right' }}><strong>General Average</strong></td>
                  <td><strong>{averageGrade}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="right-side">
            <div className="grid-item">
              <StudentGradesChart />
            </div>
            <div className="grid-item-container-student">
              <div className="grid-item-insights-student">
                <h3 className="analytics">Insights</h3>
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
                <h3 className="analytics">Recommendations</h3>
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