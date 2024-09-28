import React, { useState } from "react";
import "./FacultyMembers_Content.css";

const FacultyMembers_List = ({ facultyList }) => {
  const [popup, setPopup] = useState({
    show: false,
    faculty: null,
  });

  const handlePopup = (faculty) => {
    setPopup({
      show: true,
      faculty: faculty,
    });
  };

  const handleClose = () => {
    setPopup({
      show: false,
      faculty: null,
    });
  };

  return (
    <div className="faculty-list">
      <div className="recordslist-container">
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Faculty ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {facultyList.map((faculty) => (
              <tr key={faculty.faculty_id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{faculty.faculty_id}</td>
                <td>{faculty.last_name}</td>
                <td>{faculty.first_name}</td>
                <td>{faculty.middle_name}</td>
                <td>
                  <span
                    className="view-details-link"
                    onClick={() => handlePopup(faculty)}
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
        <div className="popup-blurred-background" onClick={handleClose}>
          <div className="popup-container">
            <div className="popup">
              <div className="popup-header">
                <h3>Faculty Details</h3>
                <button onClick={handleClose}>Close</button>
              </div>
              <div className="popup-content">
                <p>Faculty ID: {popup.faculty.faculty_id}</p>
                <p>Last Name: {popup.faculty.last_name}</p>
                <p>First Name: {popup.faculty.first_name}</p>
                <p>Middle Name: {popup.faculty.middle_name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyMembers_List;
