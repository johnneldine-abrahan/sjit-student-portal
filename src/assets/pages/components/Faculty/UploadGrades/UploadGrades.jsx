import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./UploadGrades.css";
import { FaSave } from "react-icons/fa";

const UploadGrades = ({ schoolYear, semester, quarter }) => {
  const [subjects, setSubjects] = useState([]);
  const [maleStudents, setMaleStudents] = useState([]);
  const [femaleStudents, setFemaleStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewingStudents, setViewingStudents] = useState(false);
  const [currentGradeLevel, setCurrentGradeLevel] = useState("");
  const [currentSectionName, setCurrentSectionName] = useState("");
  const [currentSubjectName, setCurrentSubjectName] = useState("");

  const [grades, setGrades] = useState({
    male: {},
    female: {},
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!schoolYear || !semester) {
        setError("Select a school year and semester to view subjects and students' grades.");
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
  }, [schoolYear, semester, quarter]);

  const handleViewStudents = async (subject) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/grades/${subject.section_id}/${subject.subject_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            quarter: quarter,
          },
        }
      );

      setMaleStudents(response.data.male);
      setFemaleStudents(response.data.female);
      setCurrentGradeLevel(`Grade ${subject.grade_level}`);
      setCurrentSectionName(subject.section_name);
      setCurrentSubjectName(subject.subject_name);

      const initialGrades = {
        male: {},
        female: {},
      };

      response.data.male.forEach(student => {
        initialGrades.male[student.student_id] = student.grade || "";
      });

      response.data.female.forEach(student => {
        initialGrades.female[student.student_id] = student.grade || "";
      });

      setGrades(initialGrades);
      setViewingStudents(true);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  const handleGradeChange = (studentId, gender, value) => {
    setGrades(prevGrades => ({
      ...prevGrades,
      [gender]: {
        ...prevGrades[gender],
        [studentId]: value,
      },
    }));
  };

  const handleSaveGrades = async () => {
    const gradesArray = [
      ...Object.entries(grades.male).map(([studentId, grade]) => ({
        studentId,
        grade: grade === "" ? null : grade,
      })),
      ...Object.entries(grades.female).map(([studentId, grade]) => ({
        studentId,
        grade: grade === "" ? null : grade,
      })),
    ];

    try {
      const response = await axios.post(
        "http://localhost:3000/add-grade",
        { grades: gradesArray },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            quarter: quarter,
          },
        }
      );

      alert(response.data.message);
    } catch (err) {
      console.error("Error saving grades:", err);
      alert("Failed to save grades.");
    }
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
              <IoMdArrowRoundBack />
            </button>
            <h2 className="header-title-list">{`${currentGradeLevel} - ${currentSectionName} / ${currentSubjectName} [${quarter} Quarter]`}</h2>
          </div>
          <h3>Male Students</h3>
          <table className="student-table student-table-margin">
            <thead>
              <tr>
                <th className="studentidfemale">Student ID</th>
                <th>Student Name</th>
                <th className="centered">Grade</th>
              </tr>
            </thead>
            <tbody>
              {maleStudents.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.full_name}</td>
                  <td className="centered-input">
                    <input
                      type="number"
                      max="100"
                      value={grades.male[student.student_id] || ""}
                      onChange={(e) => handleGradeChange(student.student_id, 'male', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Female Students</h3>
          <table className="student-table student-table-margin">
            <thead>
              <tr>
                <th className="studentidfemale">Student ID</th>
                <th className="studentnamefemale">Student Name</th>
                <th className="centered">Grade</th>
              </tr>
            </thead>
            <tbody>
              {femaleStudents.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.full_name}</td>
                  <td className="centered-input">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={grades.female[student.student_id] || ""}
                      onChange={(e) => handleGradeChange(student.student_id, 'female', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button className="btn-box" onClick={handleSaveGrades}>
              <span className="save-icon">
                <FaSave />
              </span>
              Save
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
                    Upload Grades
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

export default UploadGrades;