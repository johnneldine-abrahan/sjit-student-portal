import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Grades_Students.css';

const GradeItem = ({ subject, instructor, grade, quarter }) => {
  return (
    <div className="grade-item">
      <div className="grade-details">
        <h4>{subject} - {quarter} Quarter</h4> {/* Display quarter here */}
        <p>{instructor}</p>
      </div>
      <div className="grade-score">
        <span>{grade}</span>
        <span className="status">&#10003;</span> {/* Checkmark */}
      </div>
    </div>
  );
};

const GradeList = ({ grades }) => {
  return (
    <div className="grade-list">
      {grades.map((grade, index) => (
        <GradeItem
          key={index}
          subject={grade.subject_name} // Updated to match the API response
          instructor={grade.faculty_name} // Updated to match the API response
          grade={grade.grade}
          quarter={grade.quarter} // Include quarter information
        />
      ))}
    </div>
  );
};

const Grades_Students = ({ quarter, schoolYear, semester }) => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'table'
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get('https://san-juan-institute-of-technology-backend.onrender.com/grades', {
          params: {
            modalSchoolYear: schoolYear,
            modalSemester: semester,
            quarterState: quarter,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
          },
        });
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
        // Handle error (e.g., show a notification)
      }
    };

    // Fetch grades when the component mounts or filters change
    if (quarter && schoolYear && semester) {
      fetchGrades();
    }
  }, [quarter, schoolYear, semester]); // Dependency array

  return (
    <div className="grade-view-container">
      <div className="view-toggle">
        <button className="left" onClick={() => setViewMode('list')}>List View</button>
        <button className="right" onClick={() => setViewMode('table')}>Table View</button>
      </div>

      {viewMode === 'list' ? (
        <GradeList grades={grades} />
      ) : (
        <table className="grade-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Instructor</th>
              <th>Quarter</th> {/* Added Quarter column */}
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={index}>
                <td>{grade.subject_name}</td>
                <td>{grade.faculty_name}</td>
                <td>{grade.quarter} Quarter</td> {/* Display quarter here */}
                <td>{grade.grade}</td>
                <td>&#10003;</td> {/* Checkmark */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Grades_Students;