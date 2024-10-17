import React, { useState, useEffect } from "react";
import "./Enroll_Students_Content.css";

const Enroll_SubjectsList = ({ gradeLevel }) => {
  const [subjects, setSubjects] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [popup, setPopup] = useState({
    show: false,
    record: null,
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`http://localhost:3000/subjects/${gradeLevel}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const subjects = data.rows || [];
        setSubjects(subjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    if (gradeLevel) {
      fetchSubjects();
    }
  }, [gradeLevel]);

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(subjects) && subjects.length > 0 ? (
              subjects.map((subject) => (
                <tr key={subject.subject_id}>
                  <td>{subject.subject_id}</td>
                  <td>{subject.subject_name}</td>
                  <td>
                    <span
                      className="view-details-link"
                      onClick={() => handlePopup(subject)}
                    >
                      Add Subject
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No subjects found</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Subject ID</th>
                <th>Subject Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Similar rendering for the table view can go here */}
            </tbody>
          </table>
          <div className="onQueue-section">
            {viewMode === 'table' && (
              <button type='submit' className='queue'>Queue</button>
            )}
          </div>
        </div>
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
              <table>
                <thead>
                  <tr>
                    <th>Grade Level</th>
                    <th>Section</th>
                    <th>Schedule</th>
                    <th>Professor</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* You can populate this with actual data if available */}
                  <tr>
                    <td>10</td>
                    <td>A</td>
                    <td>MWF 10-11 AM</td>
                    <td>Dr. Smith</td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>B</td>
                    <td>TR 1-2 PM</td>
                    <td>Prof. Johnson</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Enroll_SubjectsList;