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

// Example data for grade levels, sections, instructors, etc.
const enrollmentData = [
  {
    gradeLevel: "9",
    section: "A",
    subject: "Mathematics 9",
    instructor: "Mr. Smith",
    schedule: "Monday, 9:00 AM - 10:30 AM",
  },
  {
    gradeLevel: "9",
    section: "B",
    subject: "Science 9",
    instructor: "Ms. Johnson",
    schedule: "Wednesday, 11:00 AM - 12:30 PM",
  },
  {
    gradeLevel: "9",
    section: "C",
    subject: "Filipino 9",
    instructor: "Mr. Reyes",
    schedule: "Friday, 2:00 PM - 3:30 PM",
  },
];

const Enroll_SubjectsList = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'table'
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
    if (popup.show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset"; // Reset overflow when modal is closed
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [popup]);

  const handleAddSubject = (data) => {
    // Add the subject to the queue or perform any other necessary action
    console.log("Add subject:", data);
  };

  return (
    <div className="subject-list">
      <div className="view-toggle">
        <button className="left" onClick={() => setViewMode('list')}>Subjects to Enroll</button>
        <button className="right" onClick={() => setViewMode('table')}>Subjects Added</button>
      </div>

      {viewMode === 'list' ? (
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
      ) : (
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
      )}

      {popup.show && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup-enroll">
            <div className="popup-header">
              <h3>Add Subject</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              {/* New table inside the popup */}
              <table className="enrollment-table">
                <thead>
                  <tr>
                    <th>Grade Level</th>
                    <th>Section</th>
                    <th>Subject</th>
                    <th>Instructor</th>
                    <th>Schedule</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollmentData
                    .filter((data) => data.subject === popup.record.subjectName)
                    .map((data, index) => (
                      <tr key={index}>
                        <td>{data.gradeLevel}</td>
                        <td>{data.section}</td>
                        <td>{data.subject}</td>
                        <td>{data.instructor}</td>
                        <td>{data.schedule}</td>
                        <td>
                          <span
                            className="view-details-link"
                            onClick={() => handleAddSubject(data)}
                          >
                            Add Subject
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="onQueue-section">
        {viewMode === 'table' && (
          <button type='submit' className='queue'>Queue</button>
        )}
      </div>

    </div>
  );
};

export default Enroll_SubjectsList;