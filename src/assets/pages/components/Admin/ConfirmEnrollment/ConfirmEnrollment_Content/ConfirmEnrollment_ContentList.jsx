import React, { useState, useEffect } from "react";
import "./ConfirmEnrollment_Content.css";

const ConfirmEnrollment_ContentList = () => {
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

  const handleDone = () => {
    // Placeholder for Done button functionality
    console.log(`Payment confirmed for ${viewPopup.record.first_name} ${viewPopup.record.last_name}`);
    handleClose(); // Close the popup after clicking Done
  };

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
                    Confirm Enrollment {/* Replace the icon with text */}
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
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <p>Do you want to confirm the enrollment of {viewPopup.record.first_name} {viewPopup.record.last_name}?</p>
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

export default ConfirmEnrollment_ContentList;