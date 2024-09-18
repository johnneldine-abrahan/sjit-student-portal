import React, { useState, useEffect } from "react";
import "./Enroll_Students_Content.css";

const subjectList = [
  {
    subjectID: "FILI-9",
    subjectName: "Filipino 9",
    semester: "FIRST",
  },
  {
    subjectID: "ENG-9",
    subjectName: "English 9",
    semester: "FIRST",
  },
  {
    subjectID: "MATH-9",
    subjectName: "Mathematics 9",
    semester: "FIRST",
  },
  {
    subjectID: "SCI-9",
    subjectName: "Science 9",
    semester: "FIRST",
  },
  {
    subjectID: "AP-9",
    subjectName: "Araling Panlipunan 9",
    semester: "FIRST",
  },
];

const Enroll_SubjectsList = () => {
  const [popup, setPopup] = useState({
    show: false,
    record: null,
  });

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

   // Disable scrolling when modal is open
   useEffect(() => {
    if (popup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset'; // Reset overflow when modal is closed
    }

    // Clean up the effect when the component unmounts or modal closes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [popup]);

  return (
    <div className="subject-list">
      <table>
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Subject Name</th>
            <th>Semester</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjectList.map((records) => (
            <tr key={records.subjectID}>
              <td>{records.subjectID}</td>
              <td>{records.subjectName}</td>
              <td>{records.semester}</td>
              <td>
                <span
                  className="view-details-link"
                  onClick={() => handlePopup(records)}
                >
                  Add Subject
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popup.show && (
        <div className="popup-blurred-background" onClick={handleClose} />
      )}
      {popup.show && (
        <div className="popup-enroll">
          <div className="popup-header">
            <h3>Add Subject</h3>
            <button onClick={handleClose}>Close</button>
          </div>
          <div className="popup-content">
            <p>Subject ID: {popup.record.subjectID}</p>
            <p>Subject Name: {popup.record.subjectName}</p>
            <p>Semester: {popup.record.semester}</p>
            <button onClick={() => {
              // Add subject logic here
              console.log("Add subject logic here");
            }}>
              Add Subject
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enroll_SubjectsList;
