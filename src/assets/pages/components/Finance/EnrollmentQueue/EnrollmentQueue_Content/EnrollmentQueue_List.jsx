import React, { useState } from "react";
import "./EnrollmentQueue_Content.css";
import { FaRegEye } from "react-icons/fa"; // Make sure to import this if you're using the icon

const Studentlist = [
  {
    studentID: "21-05298",
    LastName: "Sanchez",
    FirstName: "Kim William",
    MiddleName: "Bacsa",
    yearGraduated: "2025",
    viewRecords: "!",
    program: "Computer Science", // Added for demonstration
    gradeLevel: "Senior", // Added for demonstration
  },
  // You can add more student records here
];

const EnrollmentQueue_List = () => {
  const [viewPopup, setViewPopup] = useState({ show: false, record: null });

  const handleViewPopup = (record) => {
    // Function to handle view button click
    setViewPopup({ show: true, record: record });
  };

  const handleClose = () => {
    // Function to close the popup
    setViewPopup({ show: false, record: null });
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
              <th>Strand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Studentlist.map((record, index) => (
              <tr key={index}>
                <td>{record.studentID}</td>
                <td>{record.LastName}</td>
                <td>{record.FirstName}</td>
                <td>{record.MiddleName}</td>
                <td>{record.gradeLevel}</td>
                <td>{record.Strand}</td>
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
              <p>Student ID: {viewPopup.record.studentID}</p>
              <p>Last Name: {viewPopup.record.LastName}</p>
              <p>First Name: {viewPopup.record.FirstName}</p>
              <p>Middle Name: {viewPopup.record.MiddleName}</p>
              <p>Year Graduated: {viewPopup.record.yearGraduated}</p>
              <p>Program: {viewPopup.record.program}</p>
              <p>Grade Level: {viewPopup.record.gradeLevel}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollmentQueue_List;