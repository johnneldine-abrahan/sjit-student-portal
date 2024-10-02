import React, { useState } from "react";
import "./Admin_Students-Content.css";

const Admin_StudentsRecords = ({
  onSelectStudent,
  selectedStudentIds,
  studentRecords,
}) => {
  const [popup, setPopup] = useState({ show: false, record: null });

  const handlePopup = (record) => {
    setPopup({
      show: true,
      record: record,
    });
  };

  const handleClose = () => {
    setPopup({
      show: false,
      record: null,
    });
  };

  return (
    <div className="student-records">
      <div className="recordslist-container">
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Student ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Program</th>
              <th>Grade Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentRecords.map((record) => (
              <tr
                key={record.student_id}
                className={
                  selectedStudentIds.includes(record.student_id)
                    ? "checked"
                    : ""
                }
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudentIds.includes(record.student_id)}
                    onChange={() => onSelectStudent(record.student_id)}
                  />
                </td>
                <td>{record.student_id}</td>
                <td>{record.last_name}</td>
                <td>{record.first_name}</td>
                <td>{record.middle_name}</td>
                <td>{record.program}</td>
                <td>{record.grade_level}</td>
                <td>
                  <span
                    className="view-details-link"
                    onClick={() => handlePopup(record)}
                  >
                    View Details
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {popup.show && (
        <div className="popup-blurred-background" onClick={handleClose} />
      )}
      {popup.show && (
        <div className="popup">
          <div className="popup-header">
            <h3>Student Details</h3>
            <button onClick={handleClose}>Close</button>
          </div>
          <div className="popup-content">
            <p>Student ID: {popup.record.student_id}</p>
            <p>Last Name: {popup.record.last_name}</p>
            <p>First Name: {popup.record.first_name}</p>
            <p>Middle Name: {popup.record.middle_name}</p>
            <p>Program: {popup.record.program}</p>
            <p>Grade Level: {popup.record.grade_level}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_StudentsRecords;