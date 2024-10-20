import React, { useState, useEffect } from "react";
import "./EnrollmentQueue_Content.css";
import { FaRegEye } from "react-icons/fa"; // Make sure to import this if you're using the icon

const EnrollmentQueue_List = () => {
  const [students, setStudents] = useState([]); // State to hold fetched student data
  const [viewPopup, setViewPopup] = useState({ show: false, record: null });

  const handleViewPopup = (record) => {
    setViewPopup({ show: true, record: record });
  };

  const handleClose = () => {
    setViewPopup({ show: false, record: null });
  };

  // Fetch student data from the back-end API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/students/pending'); // Ensure the API URL is correct
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudents(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="student-record-list">
      <div className="recordslist-container">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Grade Level</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((record, index) => (
              <tr key={index}>
                <td>{record.student_id}</td>
                <td>{record.last_name}</td>
                <td>{record.first_name}</td>
                <td>{record.middle_name}</td>
                <td>Grade {record.grade_level}</td>
                <td>{record.payment_status}</td>
                <td>
                  <button
                    className="view-details"
                    onClick={() => handleViewPopup(record)}
                  >
                    <FaRegEye size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {viewPopup.show && (
          <div className="popup-blurred-background" onClick={handleClose} />
        )}
        {viewPopup.show && (
          <div className="popup-view-student">
            <div className="popup-header">
              <h3>View Student</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <p>Student ID: {viewPopup.record.student_id}</p>
              <p>Last Name: {viewPopup.record.last_name}</p>
              <p>First Name: {viewPopup.record.first_name}</p>
              <p>Middle Name: {viewPopup.record.middle_name}</p>
              <p>Grade Level: {viewPopup.record.grade_level}</p>
              <p>Payment Status: {viewPopup.record.payment_status}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollmentQueue_List;