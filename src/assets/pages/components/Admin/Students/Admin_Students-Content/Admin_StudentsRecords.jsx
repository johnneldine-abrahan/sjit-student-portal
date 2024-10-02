import React, { useState } from "react";
import "./Admin_Students-Content.css";
import { BiEditAlt } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";

const Admin_StudentsRecords = ({
  onSelectStudent,
  selectedStudentIds,
  studentRecords,
}) => {
  const [popup, setPopup] = useState({ show: false, record: null });
  const [editPopup, setEditPopup] = useState({ show: false, record: null });

  const handlePopup = (record) => {
    setPopup({
      show: true,
      record: record,
    });
  };

  const handleEditPopup = (record) => {
    setEditPopup({
      show: true,
      record: record,
    });
  };

  const handleClose = () => {
    setPopup({
      show: false,
      record: null,
    });
    setEditPopup({
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
                    <FaRegEye />
                  </span>
                  <button
                    className="edit-button"
                    onClick={() => handleEditPopup(record)}
                    style={{ marginLeft: "10px" }}
                  >
                    <BiEditAlt size={20} />
                  </button>
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

      {editPopup.show && (
        <div className="popup-blurred-background" onClick={handleClose} />
      )}
      {editPopup.show && (
        <div className="popup">
          <div className="popup-header">
            <h3>Edit Student</h3>
            <button onClick={handleClose}>Close</button>
          </div>
          <div className="popup-content">
            <form>
              <div className="input-box">
                <label>Student ID:</label>
                <input type="text" value={editPopup.record.student_id} />
              </div>
              <div className="input-box">
                <label>Last Name:</label>
                <input type="text" value={editPopup.record.last_name} />
              </div>
              <div className="input-box">
                <label>First Name:</label>
                <input type="text" value={editPopup.record.first_name} />
              </div>
              <div className="input-box">
                <label>Middle Name:</label>
                <input type="text" value={editPopup.record.middle_name} />
              </div>
              <div className="input-box">
                <label>Program:</label>
                <input type="text" value={editPopup.record.program} />
              </div>
              <div className="input-box">
                <label>Grade Level:</label>
                <input type="text" value={editPopup.record.grade_level} />
              </div>
              <div class='buttons'>
                      <button type="submit" class="btn-box" name="add" id="add">Done</button>
                    </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_StudentsRecords;
