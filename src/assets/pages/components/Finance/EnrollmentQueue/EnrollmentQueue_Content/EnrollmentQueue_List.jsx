import React, { useState, useEffect } from "react";
import "./EnrollmentQueue_Content.css";
import { FaCheck } from "react-icons/fa6"; // Import the new check icon

const EnrollmentQueue_List = () => {
  const [students, setStudents] = useState([]); // State to hold fetched student data
  const [viewPopup, setViewPopup] = useState({ show: false, record: null });
  const [error, setError] = useState(null); // State to hold error messages
  const [successMessage, setSuccessMessage] = useState(null); // State to hold success messages

  const handleViewPopup = (record) => {
    setViewPopup({ show: true, record: record });
  };

  const handleClose = () => {
    setViewPopup({ show: false, record: null });
    setError(null); // Clear error on close
    setSuccessMessage(null); // Clear success message on close
  };

  // Fetch student data from the back-end API
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

  useEffect(() => {
    fetchStudents(); // Fetch students when the component mounts
  }, []); // Empty dependency array means this runs once on component mount

  const handleDone = async () => {
    const studentId = viewPopup.record.student_id; // Get the student ID from the record

    try {
      const response = await fetch(`http://localhost:3000/students/${studentId}/payment-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update payment status');
      }

      const result = await response.json();
      setSuccessMessage(result.message); // Set success message
      handleClose(); // Close the popup after clicking Done
      
      // Re-fetch students to reflect changes
      fetchStudents();
    } catch (error) {
      setError(error.message); // Set error message
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <div className="student-record-list">
      <div className="recordslist-container">
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
        {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
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
                    <FaCheck size={20} /> {/* Replace the icon here */}
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
              <h3>Confirm Payment</h3>
              <button onClick={ handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <p>Do you want to confirm the payment of {viewPopup.record.first_name} {viewPopup.record.last_name}?</p>
              <div className="buttons">
                <button type="submit" className="btn-box" name="add" id="add" onClick={handleDone}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollmentQueue_List;