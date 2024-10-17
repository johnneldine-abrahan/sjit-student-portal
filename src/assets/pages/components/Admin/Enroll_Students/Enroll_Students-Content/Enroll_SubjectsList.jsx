import React, { useState, useEffect } from "react";
import "./Enroll_Students_Content.css";

const Enroll_SubjectsList = ({ gradeLevel, studentId }) => {
  const [subjects, setSubjects] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [popup, setPopup] = useState({
    show: false,
    record: null,
    sectionsAndSchedules: [],
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

  const handlePopup = async (record) => {
    try {
      const response = await fetch(`http://localhost:3000/getSectionsAndSchedules/${record.subject_id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const sectionsAndSchedules = data || [];
      setPopup({
        show: true,
        record: record,
        sectionsAndSchedules: sectionsAndSchedules,
      });
    } catch (error) {
      console.error('Error fetching sections and schedules:', error);
    }
  };

  const handleClose = () => {
    setPopup({
      show: false,
      record: null,
      sectionsAndSchedules: [],
    });
  };

  const handleAddSubject = async (sectionAndSchedule) => {
    try {
      const response = await fetch('http://localhost:3000/addSubject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: studentId,
          subject_id: popup.record.subject_id,
          section_name: sectionAndSchedule.section_name,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Subject added successfully:', data);
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  useEffect(() => {
    if (popup.show) {
      document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
      document.body.style.overflow = 'unset'; // Enable scroll
    }

    return () => {
      document.body.style.overflow = 'unset'; // Cleanup on unmount
    };
  }, [popup.show]);

  return (
    <div className="subject-list">
      <div className="view-toggle">
        <button className="left" onClick={() => setViewMode("list")}>
          Subjects to Enroll
        </button>
        <button className="right" onClick={() => setViewMode("table")}>
          Subjects Added
        </button>
      </div>

      {viewMode === "list" ? (
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
                <th >Subject Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Similar rendering for the table view can go here */}
            </tbody>
          </table>
          <div className="onQueue-section">
            {viewMode === "table" && (
              <button type="submit" className="queue">
                Queue
              </button>
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
                  {Array.isArray(popup.sectionsAndSchedules) &&
                  popup.sectionsAndSchedules.length > 0 ? (
                    popup.sectionsAndSchedules.map((sectionAndSchedule) => (
                      <tr key={sectionAndSchedule.section_name}>
                        <td>Grade {sectionAndSchedule.grade_level}</td>
                        <td>{sectionAndSchedule.section_name}</td>
                        <td>
                          {Array.isArray(sectionAndSchedule.schedules) &&
                          sectionAndSchedule.schedules.length > 0 ? (
                            sectionAndSchedule.schedules.map((schedule) => (
                              <div key={schedule.day}>
                                {schedule.day} / {formatTime(schedule.start_time)} -{" "}
                                {formatTime(schedule.end_time)} / {schedule.room}
                              </div>
                            ))
                          ) : (
                            <div>No schedule available</div>
                          )}
                        </td>
                        <td>{sectionAndSchedule.faculty_name}</td>
                        <td>
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              color: "blue",
                              cursor: "pointer",
                            }}
                            onClick={() => handleAddSubject(sectionAndSchedule)}
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No sections or schedules found.</td>
                    </tr>
                  )}
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