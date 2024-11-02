import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentList.css';

const StudentList = () => {
  const [subjects, setSubjects] = useState([]); // State to hold the subjects data
  const [students, setStudents] = useState([]); // State to hold the students data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages
  const [viewingStudents, setViewingStudents] = useState(false); // State to manage viewing students

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/teacher/subjects', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
          }
        });
        setSubjects(response.data); // Update state with fetched subjects
      } catch (err) {
        console.error('Error fetching subjects:', err);
        setError('Failed to fetch subjects.'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchSubjects(); // Call the function to fetch subjects
  }, []); // Empty dependency array to run once on mount

  // Fetch students when the user clicks "View Student List"
  const handleViewStudents = async (subject) => {
    try {
      setLoading(true); // Set loading to true while fetching students
      const response = await axios.get(`http://localhost:3000/teacher/students/${subject.section_id}/${subject.subject_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setStudents(response.data); // Update state with fetched students
      setViewingStudents(true); // Set viewingStudents to true to show students table
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to fetch students.'); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Render loading state or error message if necessary
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Render subjects or students based on the state
  return (
    <div>
      {viewingStudents ? (
        <table className="student-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.full_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Subject ID</th>
              <th>Subject Name</th>
              <th>Grade Level</th>
              <th>Strand</th>
              <th>Section</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.subject_id}>
                <td>{subject.subject_id}</td>
                <td>{subject.subject_name}</td>
                <td>Grade {subject.grade_level}</td>
                <td>{subject.strand}</td>
                <td>{subject.section_name}</td>
                <td>
                  <span className='view-details-link' onClick={() => handleViewStudents(subject)}>View Student List</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {viewingStudents && (
        <button onClick={() => setViewingStudents(false)}>Back to Subjects</button>
      )}
    </div>
  );
};

export default StudentList;