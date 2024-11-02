import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentList.css';

const StudentList = () => {
  const [subjects, setSubjects] = useState([]); // State to hold the subjects data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages

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

  // Handle popup for viewing details (example function)
  const handlePopup = (record) => {
    // Implement your popup logic here
    console.log('Viewing details for:', record);
  };

  // Render loading state or error message if necessary
  if (loading) {
    return <div>Loading subjects...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <table className="student-table">
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Subject Name</th>
            <th>Grade Level</th>
            <th>Strand</th>
            <th>Subject</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index}>
              <td>{subject.subject_id}</td>
              <td>{subject.subject_name}</td>
              <td>Grade {subject.grade_level}</td>
              <td>{subject.strand}</td>
              <td>{subject.section_name}</td>
              <td>
                <span className='view-details-link' onClick={() => handlePopup(subject)}>View Student List</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;