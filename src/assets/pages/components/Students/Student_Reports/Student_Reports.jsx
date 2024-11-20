import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Student_Reports.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import logo from "/src/assets/img/LandingPage/NavBar/logo.png";
import StudentGradesChart from "/src/assets/pages/components/Students/Student_Reports/StudentGradesChart.jsx";

const Student_Reports = () => {
  const navigate = useNavigate();
  const [semester, setSemester] = useState("");
  const [quarter, setQuarter] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [schoolYears, setSchoolYears] = useState([]);
  const [gradesData, setGradesData] = useState([]);
  const [insights, setInsights] = useState(null); // State to hold insights

  const handleBackButtonClick = () => {
    navigate("/student/dashboard");
  };

  // Fetch school years from the backend
  useEffect(() => {
    const fetchSchoolYears = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/school_years/dropdown"
        );
        setSchoolYears(response.data);
      } catch (error) {
        console.error("Error fetching school years:", error);
      }
    };

    fetchSchoolYears();
    window.scrollTo(0, 0);
  }, []);

  // Fetch grades data and insights from the back-end
  useEffect(() => {
    const fetchGrades = async () => {
      if (selectedGrade && semester && quarter && schoolYears.length > 0) {
        const schoolYear = schoolYears[0];
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:3000/grades-insights?school_year=${schoolYear}&semester=${semester}&quarter=${quarter}&grade_level=${selectedGrade}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Check if the response data is empty
          if (response.data) {
            setGradesData(response.data.gradesData);
            setInsights(response.data.insights); // Set insights data
          } else {
            setGradesData([]);
            setInsights(null); // Reset insights if no data
          }
        } catch (error) {
          console.error("Error fetching grades:", error);
          setGradesData([]);
          setInsights(null); // Reset insights on error
        }
      } else {
        setGradesData([]);
        setInsights(null); // Reset insights if dependencies are not met
      }
    };

    fetchGrades();
  }, [selectedGrade, semester, quarter, schoolYears]);

  // Calculate average grade
  const calculateAverageGrade = () => {
    if (gradesData.length === 0) return 0;
    const total = gradesData.reduce(
      (sum, grade) => sum + Number(grade.grade),
      0
    );
    return (total / gradesData.length).toFixed(2);
  };

  const averageGrade = calculateAverageGrade();

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
          <h1>Student Reports</h1>
          <div className="dropdowns-container">
            <select className="report-dropdownstudent" key={0}>
              <option value="">School Year</option>
              {schoolYears.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              className="report-dropdownstudent"
              key={1}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">Semester</option>
              <option value="FIRST">FIRST</option>
              <option value="SECOND">SECOND</option>
            </select>

            <select
              className="report-dropdownstudent"
              key={2}
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
            >
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

            <select
              className="report-dropdownstudent"
              key={3}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
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
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      No data available
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={{ textAlign: "right" }}>
                    <strong>General Average</strong>
                  </td>
                  <td>
                    <strong>{averageGrade}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="grid-item-container-student">
              <div className="grid-item-insights-student">
                <h3 className="analytics">Insights and Recommendations</h3>
                {insights ? (
                  <div>
                    <p className="left-align">
                      Your general average is{" "}
                      <strong>{insights.averageGrade}</strong>
                    </p>
                    <p className="left-align">
                      Your highest grade is{" "}
                      <strong>
                        {insights.highestGrade.value} -{" "}
                        {insights.highestGrade.subject}
                      </strong>
                    </p>
                    <p className="left-align">
                      Your lowest grade is{" "}
                      <strong>
                        {insights.lowestGrade.value} -{" "}
                        {insights.lowestGrade.subject}
                      </strong>
                    </p>

                    <div className="insights-2">
                      {insights.weakSubjects.length > 0 && (
                        <p className="left-align">
                          <strong>Weak Subjects:</strong>{" "}
                          {insights.weakSubjects
                            .map((ws) => `${ws.subject} (${ws.grade})`)
                            .join(", ")}
                        </p>
                      )}
                      {insights.strongSubjects.length > 0 && (
                        <p className="left-align">
                          <strong>Strong Subjects:</strong>{" "}
                          {insights.strongSubjects
                            .map((ss) => `${ss.subject} (${ss.grade})`)
                            .join(", ")}
                        </p>
                      )}
                    </div>

                    {insights.recommendations.length > 0 && (
                      <div className="recommendations">
                        <h4 className="center-align">Recommendations:</h4>
                        <ul>
                          {insights.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>No insights available</p>
                )}
              </div>
            </div>
          </div>

          <div className="right-side">
            <div className="grid-item">
              <StudentGradesChart gradesData={gradesData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student_Reports;
