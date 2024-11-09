import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdArrowRoundBack, IoMdPrint } from "react-icons/io"; // Import the icons
import "./StudentList.css";

const StudentList = ({ schoolYear, semester }) => {
  const [subjects, setSubjects] = useState([]); // State to hold the subjects data
  const [maleStudents, setMaleStudents] = useState([]); // State to hold the male students data
  const [femaleStudents, setFemaleStudents] = useState([]); // State to hold the female students data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages
  const [viewingStudents, setViewingStudents] = useState(false); // State to manage viewing students
  const [currentGradeLevel, setCurrentGradeLevel] = useState(""); // State to hold the current grade level
  const [currentSectionName, setCurrentSectionName] = useState(""); // State to hold the current section name
  const [currentSubjectName, setCurrentSubjectName] = useState(""); // State to hold the current subject name

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!schoolYear || !semester) {
        setError("Select a school year and semester to view sections and student list.");
        setLoading(false);
        return; // Exit if parameters are not provided
      }
  
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/teacher/subjects",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              modalSchoolYear: schoolYear, // Correct parameter names
              modalSemester: semester
            },
          }
        );
  
        setSubjects(response.data); // Update state with fetched subjects
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError("Failed to fetch subjects."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
  
    fetchSubjects();
  }, [schoolYear, semester]); // Re-fetch when filters change

  const handleViewStudents = async (subject) => {
    try {
      setLoading(true); // Set loading to true while fetching students
      const response = await axios.get(
        `http://localhost:3000/teacher/students/${subject.section_id}/${subject.subject_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMaleStudents(response.data.male); // Update state with fetched male students
      setFemaleStudents(response.data.female); // Update state with fetched female students
      setCurrentGradeLevel(`Grade ${subject.grade_level}`); // Set current grade level
      setCurrentSectionName(subject.section_name); // Set current section name
      setCurrentSubjectName(subject.subject_name); // Set current subject name
      setViewingStudents(true); // Set viewingStudents to true to show students table
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to fetch students."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handlePrint = () => {
    window.print(); // Trigger the browser's print dialog
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {viewingStudents ? (
        <div>
          <div className="header-container-list">
            <button
              className="back-button"
              onClick={() => setViewingStudents(false)}
            >
              <IoMdArrowRoundBack /> {/* Use the icon here */}
            </button>
            <h2 className="header-title-list">{`${currentGradeLevel} - ${currentSectionName} / ${currentSubjectName}`}</h2>
          </div>
          <h3>Male Students</ h3>
          <table className="student-table student-table-margin">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
              </tr>
            </thead>
            <tbody>
              {maleStudents.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.full_name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Female Students</h3>
          <table className="student-table student-table-margin">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
              </tr>
            </thead>
            <tbody>
              {femaleStudents.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.full_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button className="btn-box" onClick={handlePrint}>
              <span className="print-icon">
                <IoMdPrint />
              </span>
              Print
            </button>
          </div>
        </div>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Subject ID</th>
              <th>Subject Name</th>
              <th>Grade Level</th>
              <th>Strand</th>
              <th>Section</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.subject_id}>
                <td>{subject.subject_id}</td>
                <td>{subject.subject_name}</td>
                <td>Grade {subject.grade_level}</td>
                <td>{subject.strand}</td>
                <td>{subject.section_name}</td>
                <td>
                  <span
                    className="view-details-link"
                    onClick={() => handleViewStudents(subject)}
                  >
                    View Student List
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;