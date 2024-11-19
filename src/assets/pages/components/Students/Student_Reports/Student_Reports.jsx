import React, { useEffect, useState } from "react"; // Import useEffect and useState from React
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./Student_Reports.css";
import { IoMdArrowRoundBack } from "react-icons/io"; // Import the icons
import logo from "/src/assets/img/LandingPage/NavBar/logo.png";
import StudentGradesChart from "/src/assets/pages/components/Students/Student_Reports/StudentGradesChart.jsx"; // Import the new chart component

const Student_Reports = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedSemester, setSelectedSemester] = useState(""); // State for selected semester
  const [quarterOptions, setQuarterOptions] = useState([]); // State for quarter options
  const [schoolYears, setSchoolYears] = useState([]); // State for school years

  const handleBackButtonClick = () => {
    navigate("/student/dashboard"); // Navigate to the specified route
  };

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array means this runs once on mount

  // Fetch school years from the backend
  useEffect(() => {
    const fetchSchoolYears = async () => {
      try {
        const response = await fetch('http://localhost:3000/school_years');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSchoolYears(data.map(item => item.school_year)); // Extract school_year from results
      } catch (error) {
        console.error('Error fetching school years:', error);
      }
    };

    fetchSchoolYears();
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle semester change
  const handleSemesterChange = (event) => {
    const semester = event.target.value;
    setSelectedSemester(semester);

    // Update quarter options based on selected semester
    if (semester === "option1") { // 1st Semester
      setQuarterOptions(["1st", "2nd"]);
    } else if (semester === "option2") { // 2nd Semester
      setQuarterOptions(["3rd", "4th"]);
    } else {
      setQuarterOptions([]); // Reset if no semester is selected
    }
  };

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
            <select className="report-dropdownstudent" key={1} onChange={handleSemesterChange}>
              <option value="">Semester</option>
              <option value="option1">1st Semester</option>
              <option value="option2">2nd Semester</option>
            </select>

            <select className="report-dropdownstudent" key={2}>
              <option value="">Quarter</option>
              {quarterOptions.map((quarter, index) => (
                <option key={index} value={quarter}>{quarter}</option>
              ))}
            </select>

            <select className="report-dropdownstudent" key={3}>
              <option value="">Grade Level</option>
              <option value="option 1">7</option>
              <option value="option2">8</option>
              <option value="option3">9</option>
              <option value="option4">10</option>
              <option value="option5">11</option>
              <option value="option6">12</option>
            </select>

            <select className="report-dropdownstudent" key={4}>
              <option value="">Subject</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
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
                <tr>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>Kim William</td>
                  <td>69</td>
                </tr>
                <tr>
                  <td>Kim William</td>
                  <td>69</td>
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