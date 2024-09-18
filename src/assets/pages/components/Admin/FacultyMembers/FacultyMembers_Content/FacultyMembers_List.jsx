import React, { useState } from "react";
import "./FacultyMembers_Content.css";

const FacultyList = [
  {
    facultyID: "21-05298",
    LastName: "Sanchez",
    FirstName: "Kim William",
    MiddleName: "Bacsa",
    viewRecords: "View Details",
  },
  {
    facultyID: "21-05298",
    LastName: "Sanchez",
    FirstName: "Kim William",
    MiddleName: "Bacsa",
    viewRecords: "View Details",
  },
  {
    facultyID: "21-05298",
    LastName: "Sanchez",
    FirstName: "Kim William",
    MiddleName: "Bacsa",
    viewRecords: "View Details",
  },
  {
    facultyID: "21-05298",
    LastName: "Sanchez",
    FirstName: "Kim William",
    MiddleName: "Bacsa",
    viewRecords: "View Details",
  },
];

const FacultyMembers_List = () => {
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
              <th>Faculty ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {FacultyList.map((records) => (
              <tr key={records.facultyID}>
                <td>{records.facultyID}</td>
                <td>{records.LastName}</td>
                <td>{records.FirstName}</td>
                <td>{records.MiddleName}</td>
                <td>
                  <span
                    className="view-details-link"
                    onClick={() => handlePopup(records)}
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
                <p>Faculty ID: {popup.faculty.facultyID}</p>
                <p>Last Name: {popup.faculty.LastName}</p>
                <p>First Name: {popup.faculty.FirstName}</p>
                <p>Middle Name: {popup.faculty.MiddleName}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyMembers_List;