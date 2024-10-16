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
        console.log('Received data:', data); // Log the entire response

        // Access subjects from the 'rows' property
        const subjects = data.rows || [];
        console.log('Subjects:', subjects); // Log the extracted subjects

        // Update the subjects state
        setSubjects(subjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    if (gradeLevel) {
      fetchSubjects();
    } else {
      console.warn('Grade level is not set:', gradeLevel);
    }
  }, [gradeLevel]);

  useEffect(() => {
    console.log('Updated subjects state:', subjects);
  }, [subjects]);

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

  const handleAddSubject = (data) => {
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
              {/* Additional content can go here */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Enroll_SubjectsList;
