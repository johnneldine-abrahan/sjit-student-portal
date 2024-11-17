import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./Faculty_Reports.css";
import { IoMdArrowRoundBack } from "react-icons/io"; // Import the icons
import logo from "/src/assets/img/LandingPage/NavBar/logo.png";
import GradeDistributionChart from "/src/assets/pages/components/Faculty/Faculty_Reports/GradeDistributionChart.jsx"; // Adjust the path as necessary

const Faculty_Reports = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBackButtonClick = () => {
    navigate("/faculty/dashboard"); // Navigate to the specified route
  };

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  
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
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>

            <select className="report-dropdown" key={1}>
              <option value="">Semester</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>

            <select className="report-dropdown" key={1}>
              <option value="">Quarter</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>

            <select className="report-dropdown" key={2}>
              <option value="">Grade Level</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>

            <select className="report-dropdown" key={3}>
              <option value="">Strand</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>

            <select className="report-dropdown" key={4}>
              <option value="">Section</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <select className="report-dropdown" key={5}>
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

            {/* Title for the second table */}
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
              <GradeDistributionChart />{" "}
              {/* Insert the GradeDistributionChart here */}
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