import React, { useState, useEffect } from "react";
import "./StudentRecords_Content.css";
import { FaRegEye } from "react-icons/fa"; // Make sure to import this if you're using the icon
import axios from "axios"; // Make sure to install axios

const StudentRecords = () => {
  const [students, setStudents] = useState([]); // Ensure this is an array
  const [viewPopup, setViewPopup] = useState({ show: false, record: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
          const response = await axios.get("http://localhost:3000/students-finance-list");
          console.log("API Response:", response); // Log the entire response object
  
          // Adjust this based on the actual structure of the response
          if (Array.isArray(response.data)) {
              setStudents(response.data);
          } else if (Array.isArray(response.data.data)) { // Example for nested data
              setStudents(response.data.data);
          } else {
              throw new Error("Unexpected response format");
          }
      } catch (err) {
          setError(err.message);
      } finally {
          setLoading(false);
      }
  };

    fetchStudents();
  }, []);

  const handleViewPopup = (record) => {
    setViewPopup({ show: true, record: record });
  };

  const handleClose = () => {
    setViewPopup({ show: false, record: null });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
             
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRecords;