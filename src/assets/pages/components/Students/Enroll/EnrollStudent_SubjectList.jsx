import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import "./Enroll.css";

const EnrollStudent_SubjectsList = ({ gradeLevel, strand, studentId, semester, schoolYear }) => {
  const [subjects, setSubjects] = useState([]);
  const [originalSubjects, setOriginalSubjects] = useState([]);
  const [addedSubjects, setAddedSubjects] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [popup, setPopup] = useState({
    show: false,
    record: null,
    sectionsAndSchedules: [],
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `https://san-juan-institute-of-technology-backend.onrender.com/subjectsPreview?gradeLevel=${gradeLevel}&strand=${strand}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSubjects(data || []);
        setOriginalSubjects(data || []);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    if (gradeLevel) {
      fetchSubjects();
    }
  }, [gradeLevel, strand]);

  const handlePopup = async (record) => {
    try {
      const response = await fetch(
        `https://san-juan-institute-of-technology-backend.onrender.com/getSectionsAndSchedules/${record.subject_id}?semester=${semester}&school_year=${schoolYear}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPopup({
        show: true,
        record: record,
        sectionsAndSchedules: data || [],
      });
    } catch (error) {
      console.error("Error fetching sections and schedules:", error);
    }
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

  const handleQueueEnrollment = async () => {
    try {
      const section_ids = addedSubjects.map(
        (subject) => subject.sectionAndSchedule.section_id
      );
      console.log({
        student_id: studentId,
        section_ids: section_ids,
      });

      if (!studentId || section_ids.length === 0) {
        alert("Student ID or section IDs are missing.");
        return;
      }

      const response = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/enroll-student-ver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: studentId,
          section_ids: section_ids,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error during enrollment:", error);
      alert("Enrollment failed. Please try again.");
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
        <table className="subject-added">
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
                addedSubjects.map((addedSubject) => (
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
                onClick={handleQueueEnrollment}
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
  gradeLevel: PropTypes.number.isRequired,
  strand: PropTypes.string.isRequired,
  studentId: PropTypes.number.isRequired,
  semester: PropTypes.string.isRequired,
  schoolYear: PropTypes.string.isRequired,
};

export default EnrollStudent_SubjectsList;