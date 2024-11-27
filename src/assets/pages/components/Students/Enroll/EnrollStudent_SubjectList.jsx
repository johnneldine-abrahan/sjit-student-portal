import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "./Enroll.css";

const EnrollStudent_SubjectsList = ({ gradeLevel, strand, studentId }) => {
  const [subjects, setSubjects] = useState([]); // Current subjects to enroll
  const [originalSubjects, setOriginalSubjects] = useState([]); // Original subjects for maintaining order
  const [addedSubjects, setAddedSubjects] = useState([]); // State for added subjects
  const [viewMode, setViewMode] = useState("list");
  const [popup, setPopup] = useState({
    show: false,
    record: null,
    sectionsAndSchedules: [],
  });

  // Sample subjects data for demonstration
  useEffect(() => {
    const sampleSubjects = [
      { subject_id: 1, subject_name: "Mathematics" },
      { subject_id: 2, subject_name: "Science" },
      { subject_id: 3, subject_name: "History" },
    ];
    setSubjects(sampleSubjects);
    setOriginalSubjects(sampleSubjects);
  }, []);

  const handlePopup = (record) => {
    // Sample sections and schedules data for demonstration
    const sampleSectionsAndSchedules = [
      {
        section_name: "A",
        grade_level: 10,
        schedules: [
          {
            day: "Monday",
            start_time: "08:00",
            end_time: "09:30",
            room: "101",
          },
          {
            day: "Wednesday",
            start_time: "08:00",
            end_time: "09:30",
            room: "101",
          },
        ],
        faculty_name: "Mr. Smith",
      },
      {
        section_name: "B",
        grade_level: 10,
        schedules: [
          {
            day: "Tuesday",
            start_time: "10:00",
            end_time: "11:30",
            room: "102",
          },
          {
            day: "Thursday",
            start_time: "10:00",
            end_time: "11:30",
            room: "102",
          },
        ],
        faculty_name: "Ms. Johnson",
      },
    ];
    setPopup({
      show: true,
      record: record,
      sectionsAndSchedules: sampleSectionsAndSchedules,
    });
  };

  const handleClose = () => {
    setPopup({
      show: false,
      record: null,
      sectionsAndSchedules: [],
    });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  useEffect(() => {
    if (popup.show) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "unset"; // Enable scroll
    }

    return () => {
      document.body.style.overflow = "unset"; // Cleanup on unmount
    };
  }, [popup.show]);

  const handleAddSubject = (subject, sectionAndSchedule) => {
    setAddedSubjects((prevAddedSubjects) => [
      ...prevAddedSubjects,
      { subject, sectionAndSchedule },
    ]);

    setSubjects((prevSubjects) =>
      prevSubjects.filter(
        (prevSubject) => prevSubject.subject_id !== subject.subject_id
      )
    );

    handleClose();
  };

  const handleRemoveSubject = (subjectId) => {
    const subjectToRemove = addedSubjects.find(
      (addedSubject) => addedSubject.subject.subject_id === subjectId
    );

    if (subjectToRemove) {
      setAddedSubjects((prevAddedSubjects) =>
        prevAddedSubjects.filter(
          (addedSubject) => addedSubject.subject.subject_id !== subjectId
        )
      );

      setSubjects((prevSubjects) => {
        const newSubjects = [...prevSubjects, subjectToRemove.subject];
        return originalSubjects.filter((originalSubject) =>
          newSubjects.some(
            (newSubject) => newSubject.subject_id === originalSubject.subject_id
          )
        );
      });
    }
  };

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
                <th>Subject Name</th>
                <th>Section</th>
                <th>Schedule</th>
                <th>Professor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(addedSubjects) && addedSubjects.length > 0 ? (
                addedSubjects.map((addedSubject, index) => (
                  <tr key={addedSubject.subject.subject_id}>
                    <td>{addedSubject.subject.subject_id}</td>
                    <td>{addedSubject.subject.subject_name}</td>
                    <td>{addedSubject.sectionAndSchedule.section_name}</td>
                    <td>
                      {Array.isArray(
                        addedSubject.sectionAndSchedule.schedules
                      ) &&
                      addedSubject.sectionAndSchedule.schedules.length > 0 ? (
                        addedSubject.sectionAndSchedule.schedules.map(
                          (schedule) => (
                            <div key={schedule.day}>
                              {schedule.day} / {formatTime(schedule.start_time)}{" "}
                              - {formatTime(schedule.end_time)} /{" "}
                              {schedule.room}
                            </div>
                          )
                        )
                      ) : (
                        <div>No schedule available</div>
                      )}
                    </td>
                    <td>{addedSubject.sectionAndSchedule.faculty_name}</td>
                    <td>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "blue",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                        onClick={() =>
                          handleRemoveSubject(addedSubject.subject.subject_id)
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No subjects added.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="onQueue-section">
            {viewMode === "table" && (
              <button
                type="submit"
                className="queue"
                onClick={() => alert("Queue functionality not implemented")}
              >
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
              <h3>
                {popup.record
                  ? `Add ${popup.record.subject_name}`
                  : "Add Subject"}
              </h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <table>
                <thead>
                  <tr>
                    <th>Grade Level</th>
                    <th>Section</th>
                    <th>Schedule</th>
                    <th>Faculty</th>
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
                                • {schedule.day} /{" "}
                                {formatTime(schedule.start_time)} -{" "}
                                {formatTime(schedule.end_time)} /{" "}
                                {schedule.room}
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
                              fontSize: "18px",
                            }}
                            onClick={() =>
                              handleAddSubject(popup.record, sectionAndSchedule)
                            }
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

EnrollStudent_SubjectsList.propTypes = {
  gradeLevel: PropTypes.number,
  strand: PropTypes.string,
  studentId: PropTypes.number,
};

export default EnrollStudent_SubjectsList;