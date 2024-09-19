import React, { useState, useEffect } from 'react';
import './Enroll_Students_Content.css';

const studentData = [
  {
    studentID: "S-001",
    studentName: "John Doe",
    gradeLevel: "9",
    section: "A",
  },
  {
    studentID: "S-002",
    studentName: "Jane Doe",
    gradeLevel: "9",
    section: "B",
  },
  {
    studentID: "S-003",
    studentName: "Bob Smith",
    gradeLevel: "9",
    section: "C",
  },
];

const Enroll_Students_ContentHeader = () => {
  const [popup, setPopup] = useState({
    show: false,
    record: null,
  });

  const handleSelectStudentClick = (record) => {
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

  // Disable scrolling when modal is open
  useEffect(() => {
    if (popup.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset'; // Reset overflow when modal is closed
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [popup]);

  return (
    <div className='admin-enroll-header'>
      <h1 className='header-title'>Enroll Students</h1>
      <div className='admin-enroll-activity'>
        <button type='submit' className='select-btn' onClick={() => handleSelectStudentClick(null)}>
          Select Student
        </button>
        {popup.show && (
          <>
            <div className="popup-blurred-background" onClick={handleClose} />
            <div className="popup-enroll">
              <div className="popup-header">
                <h3>Select Student</h3>
                <button onClick={handleClose}>Close</button>
              </div>
              <div className="popup-content">
                <table className="enrollment-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Student Name</th>
                      <th>Grade Level</th>
                      <th>Section</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.map((data, index) => (
                      <tr key={index}>
                        <td>{data.studentID}</td>
                        <td>{data.studentName}</td>
                        <td>{data.gradeLevel}</td>
                        <td>{data.section}</td>
                        <td><span className='view-details-link'>Select</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Enroll_Students_ContentHeader;
