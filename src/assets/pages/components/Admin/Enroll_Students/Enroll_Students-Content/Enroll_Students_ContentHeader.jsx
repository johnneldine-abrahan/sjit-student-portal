import React, { useState, useEffect } from "react";
import "./Enroll_Students_Content.css";
import axios from "axios";

const Enroll_Students_ContentHeader = (props) => {
  const [popup, setPopup] = useState({
    show: false,
    record: null,
  });

  const handleSelectStudentClick = (record) => {
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

  const [juniorHighschoolChecked, setJuniorHighschoolChecked] = useState(false);
  const [seniorHighschoolChecked, setSeniorHighschoolChecked] = useState(false);
  const [gradeLevel, setGradeLevel] = useState("");
  const [strand, setStrand] = useState("");
  const [formData, setFormData] = useState({
    program: "",
    gradeLevel: "",
    strand: "",
  });
  const [students, setStudents] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "program") {
      setFormData({ ...formData, [name]: value });

      if (value === "Junior Highschool") {
        setJuniorHighschoolChecked(true);
        setSeniorHighschoolChecked(false);
        setGradeLevel("");
        setStrand("");
      } else if (value === "Senior Highschool") {
        setJuniorHighschoolChecked(false);
        setSeniorHighschoolChecked(true);
        setGradeLevel("");
        setStrand("");
      }
    } else if (name === "gradeLevel") {
      setFormData({ ...formData, gradeLevel: value });
      setGradeLevel(value); // Make sure to update gradeLevel state here
      fetchStudents(value, strand);
    } else if (name === "strand") {
      setFormData({ ...formData, strand: value });
      setStrand(value);
      fetchStudents(gradeLevel, value);
    } else if (name === "select-student") {
      setSelectedStudent(value);
      setFormData({ ...formData, [name]: value });
    }

    if (name === "select-student") {
      setSelectedStudent(value);
      console.log("Selected Student:", selectedStudent); // Add this line to verify the selected student
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDoneClick = async () => {
    if (!selectedStudent) {
      console.error("No student selected.");
      return; // Exit early if no student is selected
    }

    try {
      const response = await axios.get(`http://localhost:3000/students/details`, {
        params: {
          fullName: selectedStudent,
        },
      });
      const studentDetails = response.data;
      // Pass the student details to the parent component
      props.onStudentSelected(studentDetails);
      handleClose();
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleProgramChange = (e) => {
    const { value } = e.target;

    if (value === "Junior Highschool") {
      setJuniorHighschoolChecked(true);
      setSeniorHighschoolChecked(false);
      setGradeLevel("");
      setStrand("");
    } else if (value === "Senior Highschool") {
      setJuniorHighschoolChecked(false);
      setSeniorHighschoolChecked(true);
      setGradeLevel("");
      setStrand("");
    }
  };

  const fetchStudents = async (gradeLevel, strand) => {
    try {
      const response = await axios.get(`http://localhost:3000/students/not-enrolled`, {
        params: {
          grade_level: gradeLevel,
          strand: strand,
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
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

  return (
    <div className="admin-enroll-header">
      <h1 className="header-title">Enroll Students</h1>
      <div className="admin-enroll-activity">
        <button
          type="submit"
          className="select-btn"
          onClick={() => handleSelectStudentClick(null)}
        >
          Select Student
        </button>

        {popup.show && (
          <>
            <div className="popup-blurred-background" onClick={handleClose} />
            <div className="popup-enroll">
              <div className="popup-header">
                <h3>Select Student</h3>
                <button onClick={handleClose}>Close</button>
              </div>
              <div className="popup-content">
                <div className="grade-level">
                  <label>
                    Select Program
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="program"
                      value="Junior Highschool"
                      checked={juniorHighschoolChecked}
                      onChange={(e) => {
                        setJuniorHighschoolChecked(e.target.checked);
                        if (e.target.checked) {
                          setSeniorHighschoolChecked(false);
                          setGradeLevel("");
                          setStrand("");
                        }
                      }}
                    />
                    Junior Highschool
                  </label>
 <label>
                    <input
                      type="checkbox"
                      name="program"
                      value="Senior Highschool"
                      checked={seniorHighschoolChecked}
                      onChange={(e) => {
                        setSeniorHighschoolChecked(e.target.checked);
                        if (e.target.checked) {
                          setJuniorHighschoolChecked(false);
                          setGradeLevel("");
                          setStrand("");
                        }
                      }}
                    />
                    Senior Highschool
                  </label>
                </div>
                <div className="GradeLevel">
                  <label>
                    Grade Level
                    <select
                      name="gradeLevel"
                      value={formData.gradeLevel}
                      onChange={handleChange}
                    >
                      <option value=""></option>
                      {juniorHighschoolChecked && (
                        <>
                          <option value="7">Grade 7</option>
                          <option value="8">Grade 8</option>
                          <option value="9">Grade 9</option>
                          <option value="10">Grade 10</option>
                        </>
                      )}
                      {seniorHighschoolChecked && (
                        <>
                          <option value="11">Grade 11</option>
                          <option value="12">Grade 12</option>
                        </>
                      )}
                    </select>
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Strand
                    <select
                      name="strand"
                      value={formData.strand}
                      onChange={handleChange}
                      disabled={juniorHighschoolChecked}
                    >
                      <option value=""></option>
                      <option value="Science, Technology, Engineering and Mathematics (STEM)">
                        Science, Technology, Engineering and Mathematics (STEM)
                      </option>
                      <option value="Accountancy, Business and Management (ABM)">
                        Accountancy, Business and Management (ABM)
                      </option>
                      <option value="Humanities and Social Sciences (HUMSS)">
                        Humanities and Social Sciences (HUMSS)
                      </option>
                      <option value="TVL - Industrial Arts (TVL-IA)">
                        TVL - Industrial Arts (TVL-IA)
                      </option>
                      <option value="TVL - Home Economics (TVL-HE)">
                        TVL - Home Economics (TVL-HE)
                      </option>
                      <option value="TVL - Internet Communications Technology (TVL-ICT)">
                        TVL - Internet Communications Technology (TVL-ICT)
                      </option>
                    </select>
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Select Student
                    <select
                      name="select-student"
                      value={selectedStudent} // Use selectedStudent here
                      onChange={handleChange}
                    >
                      <option value=""></option>
                      {students && students.length > 0 ? (
                        students.map((student) => (
                          <option key={student.full_name} value={student.full_name}>
                            {student.full_name}
                          </option>
                        ))
                      ) : (
                        <option value="">No students available</option> // Fallback in case the array is empty
                      )}
                    </select>
                  </label>
                </div>
                <div class="buttons">
                  <button type="submit" class="btn-box" name="add" id="add" onClick={handleDoneClick}>
                    Done
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Enroll_Students_ContentHeader;