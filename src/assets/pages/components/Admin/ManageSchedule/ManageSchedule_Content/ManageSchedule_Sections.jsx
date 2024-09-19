import React, { useState, useEffect} from "react";
import "./ManageSchedule_Content.css";


const SectionList = [
  {
    GradeLevel: "Grade 7",
    section: "Masikap",
    subject: "0/9",
    Instructor: "Bossing",
    semester: "FIRST",
    slots: "35",
    view: "View Details",
  },
  {
    GradeLevel: "Grade 8",
    section: "Milflores",
    subject: "0/9",
    Instructor: "Bossing",
    semester: "FIRST",
    slots: "35",
    view: "View Details",
  },
  {
    GradeLevel: "Grade 9",
    section: "Luna",
    subject: "0/9",
    Instructor: "Bossing",
    semester: "FIRST",
    slots: "35",
    view: "View Details",
  },
  {
    GradeLevel: "Grade 10",
    section: "Guijo",
    subject: "0/9",
    Instructor: "Bossing",
    semester: "FIRST",
    slots: "35",
    view: "View Details",
  },
];

const ManageSchedule_Sections = () => {
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
    <div className="section-list">
      <div className="recordslist-container">
          <table>
            <thead>
              <tr>
                <th>Select</th> {/* New column for checkbox */}
                <th>Grade Level</th>
                <th>Section</th>
                <th>Subject</th>
                <th>Instructor</th>
                <th>Semester</th>
                <th>Slots</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {SectionList.map((records) => (
                <tr key={records.section}>
                  <td>
                    <input type="checkbox" name={`select-${records.section}`} /> {/* Checkbox */}
                  </td>
                  <td>{records.GradeLevel}</td>
                  <td>{records.section}</td>
                  <td>{records.subject}</td>
                  <td>{records.Instructor}</td>
                  <td>{records.semester}</td>
                  <td>{records.slots}</td>
                  <td>
                    <span
                      className="add-subject-link"
                      onClick={() => handlePopup(records)}
                    >
                      {records.view}
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
          <div className="popup-manage-schedule">
            <div className="popup-header">
              <h3>View Details</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <p>Grade Level: {popup.record.GradeLevel}</p>
              <p>Section: {popup.record.section}</p>
              <p>Subject: {popup.record.subject}</p>
              <p>Instructor: {popup.record.Instructor}</p>
              <p>Slots: {popup.record.slots}</p>
              
              
              <button
                onClick={() => {
                  // Add subject logic here
                  console.log("Add subject logic here");
                }}
              >
                View Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSchedule_Sections;
