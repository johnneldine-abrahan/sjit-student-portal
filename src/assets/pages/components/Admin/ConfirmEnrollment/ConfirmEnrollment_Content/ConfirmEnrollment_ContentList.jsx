import React, { useState, useEffect } from "react";
import "./ConfirmEnrollment_Content.css";

const ConfirmEnrollment_ContentList = () => {
  const [students, setStudents] = useState([]); // State to hold student data
  const [viewPopup, setViewPopup] = useState({ show: false, record: null }); // State for popup
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error messages
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const recordsPerPage = 7; // Number of records to display per page

  const handleViewPopup = (record) => {
    setViewPopup({ show: true, record: record }); // Show the popup with selected record
  };

  const handleClose = () => {
    setViewPopup({ show: false, record: null }); // Close the popup
  };

  const handleDone = async () => {
    try {
      const studentId = viewPopup.record.student_id; // Get the student ID
      const response = await fetch(`https://san-juan-institute-of-technology-backend.onrender.com/students/${studentId}/enroll`, {
        method: 'PUT', // HTTP method for updating
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update student status');
      }

      const data = await response.json();
      console.log(data.message); // Log success message
      fetchStudents(); // Refresh the student list
    } catch (error) {
      setError(error.message); // Set error message
      console.error('Error confirming enrollment:', error);
    } finally {
      handleClose(); // Close the popup
    }
  };

  // Fetch student data from the back-end API
  const fetchStudents = async () => {
    try {
      const response = await fetch('https://san-juan-institute-of-technology-backend.onrender.com/students/paid'); // Ensure the API URL is correct
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStudents(data); // Update state with fetched data
    } catch (error) {
      setError(error.message); // Set error message
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchStudents(); // Fetch students when the component mounts
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there is an error
  }

  // Calculate total pages
  const totalPages = Math.ceil(students.length / recordsPerPage);

  // Get current records to display
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = students.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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
            {currentRecords.map((record, index) => (
              <tr key={index}>
                <td >{record.student_id}</td>
                <td>{record.last_name}</td>
                <td>{record.first_name}</td>
                <td>{record.middle_name}</td>
                <td>Grade {record.grade_level}</td>
                <td>{record.payment_status}</td>
                <td>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: "blue",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                    onClick={() => handleViewPopup(record)}
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {viewPopup.show && (
          <div className="popup-blurred-background" onClick={handleClose}>
            <div className="popup-view-student">
              <div className="popup-header">
                <h3>Confirm Payment</h3>
                <button onClick={handleClose}>Close</button>
              </div>
              <div className="popup-content">
                <p>
                  Do you want to confirm the enrollment of{" "}
                  <strong>{viewPopup.record.first_name}</strong> <strong>{viewPopup.record.last_name}</strong>?
                </p>
                <div className="buttons">
                  <button
                    type="button"
                    className="btn-box"
                    onClick={handleDone}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="button-container-pagination-student">
        <div className="pagination-controls">
          <button
            className="btn-box-pagination-student"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn-box-pagination-student"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEnrollment_ContentList;