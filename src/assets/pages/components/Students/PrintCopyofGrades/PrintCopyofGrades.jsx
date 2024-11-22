"use client";

import React, { useEffect, useState } from "react";
import "./PrintCopyofGrades.css";

export default function GradeReport({ schoolYear, semester, quarter }) {
  const [grades, setGrades] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    fullName: '',
    studentId: '',
    academicYear: '',
    program: '',
    semester: '',
    yearLevel: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generalAverage, setGeneralAverage] = useState(null);

  useEffect(() => {
    const fetchGrades = async () => {
      // Check if any of the required parameters are null or undefined
      if (!schoolYear || !semester || !quarter) {
        setError("No grades available.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://san-juan-institute-of-technology-backend.onrender.com/copy-of-grades?modalSchoolYear=${schoolYear}&modalSemester=${semester}&quarterState=${quarter}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('No grades available');
        }
        const data = await response.json();
        
        if (data.length > 0) {
          // Set student info from the first item in the response
          const firstGrade = data[0];
          setStudentInfo({
            fullName: firstGrade.full_name,
            studentId: firstGrade.student_id,
            academicYear: firstGrade.school_year,
            program: firstGrade.program,
            semester: firstGrade.semester,
            yearLevel: firstGrade.grade_level
          });
          setGrades(data);
          calculateGeneralAverage(data); // Calculate average after fetching grades
        } else {
          setError('No grades found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [schoolYear, semester, quarter]);

  const calculateGeneralAverage = (grades) => {
    const totalGrades = grades.reduce((acc, grade) => acc + parseFloat(grade.grade), 0);
    const average = totalGrades / grades.length;
    setGeneralAverage(average.toFixed(2)); // Set average to state with 2 decimal places
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!grades || !studentInfo || grades.length == 0 || studentInfo.length == 0){
    return <div>No grades available.</div>;
  }

  return (
    <div className="container">
      <div className="card-grade">
        <div className="card-header">
          <h1>SAN JUAN INSTITUTE OF TECHNOLOGY</h1>
          <h3>Student's Copy of Grades</h3>
        </div>

        <div className="card-content">
          <div className="student-info">
            <div>
              <span className="label">Full Name:</span> {studentInfo.fullName || 'N/A'}
            </div>
            <div>
              <span className="label">Student ID:</span> {studentInfo.studentId || 'N/A'}
            </div>
            <div>
              <span className="label">Academic Year:</span> {studentInfo.academicYear || 'N/A'}
            </div>
            <div>
              <span className="label">Program:</span> {studentInfo.program || 'N/A'}
            </div>
            <div>
              <span className="label">Semester:</span> {studentInfo.semester || 'N/A'}
            </div>
            <div>
              <span className="label">Year Level:</span> {studentInfo.yearLevel || 'N/A'}
            </div>
          </div>

          {grades.length > 0 ? (
            <>
              <table className="grades-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Course Code</th>
                    <th>Course Title</th>
                    <th>Units</th>
                    <th>Grade</th>
                    <th>Section</th>
                    <th>Instructor</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{grade.subject_id}</td>
                      <td>{grade.subject_name}</td>
                      <td>1</td>
                      <td>{grade.grade}</td>
                      <td>{grade.grade_level}</td>
                      <td>{grade.faculty_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="summary">
                <div></div>
                <div>
                  <span className="label">General Average:</span> {generalAverage !== null ? generalAverage : 'N/A'}
                </div>
              </div>
            </>
          ) : (
            <div>No grades available.</div>
          )}

          <div className="footer"></div>
          <div className="button-container">
            <button onClick={handlePrint} className="btn-box">
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}