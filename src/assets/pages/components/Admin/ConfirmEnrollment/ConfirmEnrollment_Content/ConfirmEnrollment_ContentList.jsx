import React, { useState } from "react";
import "./ConfirmEnrollment_Content.css";

const studentRecords = [
  {
    student_id: "21-05298",
    last_name: "Sanchez",
    first_name: "Kim William",
    middle_name: "Bacsa",
    grade_level: "12",
    payment_status: "Pending",
  },
  {
    student_id: "21-05299",
    last_name: "Doe",
    first_name: "John",
    middle_name: "A.",
    grade_level: "11",
    payment_status: "Confirmed",
  },
  {
    student_id: "21-05300",
    last_name: "Smith",
    first_name: "Jane",
    middle_name: "B.",
    grade_level: "10",
    payment_status: "Pending",
  },
  {
    student_id: "21-05301",
    last_name: "Brown",
    first_name: "Chris",
    middle_name: "C.",
    grade_level: "12",
    payment_status: "Pending",
  },
];

const ConfirmEnrollment_ContentList = () => {
  const [students] = useState(studentRecords); // State to hold student data
  const [viewPopup, setViewPopup] = useState({ show: false, record: null }); // State for popup

  const handleViewPopup = (record) => {
    setViewPopup({ show: true, record: record }); // Show the popup with selected record
  };

  const handleClose = () => {
    setViewPopup({ show: false, record: null }); // Close the popup
  };

  const handleDone = () => {
    console.log(
      `Payment confirmed for ${viewPopup.record.first_name} ${viewPopup.record.last_name}`
    );
    handleClose();
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
                <td>{record.grade_level}</td>
                <td>{record.payment_status}</td>
                <td>
                  <button
                    className="view-details"
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
                  {viewPopup.record.first_name} {viewPopup.record.last_name}?
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
    </div>
  );
};

export default ConfirmEnrollment_ContentList;