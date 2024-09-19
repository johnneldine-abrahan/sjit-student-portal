import React, { useState, useEffect} from "react";
import "./ManageSchedule_Content.css";

const SectionList = [
  {
    yearLevel: "Grade 7",
    section: "Masikap",
    slots: "35",
    semester: "FIRST",
    subject: "0/9",
    add: "Add Subjects",
  },
  {
    yearLevel: "Grade 8",
    section: "Milflores",
    slots: "35",
    semester: "FIRST",
    subject: "0/9",
    add: "Add Subjects",
  },
  {
    yearLevel: "Grade 9",
    section: "Luna",
    slots: "35",
    semester: "FIRST",
    subject: "0/9",
    add: "Add Subjects",
  },
  {
    yearLevel: "Grade 10",
    section: "Guijo",
    slots: "35",
    semester: "FIRST",
    subject: "0/9",
    add: "Add Subjects",
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
              <th>Year Level</th>
              <th>Section</th>
              <th>Slots</th>
              <th>Semester</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {SectionList.map((records) => (
              <tr key={records.section}>
                <td>{records.yearLevel}</td>
                <td>{records.section}</td>
                <td>{records.slots}</td>
                <td>{records.semester}</td>
                <td>{records.subject}</td>
                <td>
                  <span
                    className="add-subject-link"
                    onClick={() => handlePopup(records)}
                  >
                    {records.add}
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
              <h3>Add Subject</h3>
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

export default ManageSchedule_Sections;