import React, { useState, useEffect } from "react";
import "./Enroll_Students_Content.css";

const studentData = [
  {
    studentID: "S-001",
    studentName: "John Doe",
    gradeLevel: "9",
    section: "A",
  },
  {
    studentID: "S-002",
    studentName: "Jane Doe",
    gradeLevel: "9",
    section: "B",
  },
  {
    studentID: "S-003",
    studentName: "Bob Smith",
    gradeLevel: "9",
    section: "C",
  },
];

const Enroll_Students_ContentHeader = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "program") {
      if (value === "Junior Highschool") {
        setJuniorHighschoolChecked(true);
        setSeniorHighschoolChecked(false);
      } else if (value === "Senior Highschool") {
        setJuniorHighschoolChecked(false);
        setSeniorHighschoolChecked(true);
      }
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
        <button type="submit" className="setyr-btn" onClick={() => hands(null)}>
          Set School Year
        </button>
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
                    <label>
                      <input
                        type="checkbox"
                        name="program"
                        value="Junior Highschool"
                      />
                      Junior Highschool
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="program"
                        value="Senior Highschool"
                      />
                      Senior Highschool
                    </label>
                  </label>
                </div>
                <div className="GradeLevel">
                  <label>
                    Grade Level
                    <select name="gradeLevel">
                      <option value="">Select Grade Level</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Strand
                    <select name="strand">
                      <>
                        <option value=""></option>
                        <option value="Science, Technology, Engineering and Mathematics (STEM)">
                          Science, Technology, Engineering and Mathematics
                          (STEM)
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
                      </>
                    </select>
                  </label>
                </div>
                <table className="enrollment-table">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Student Name</th>
                      <th>Grade Level</th>
                      <th>Section</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.map((data, index) => (
                      <tr key={index}>
                        <td>{data.studentID}</td>
                        <td>{data.studentName}</td>
                        <td>{data.gradeLevel}</td>
                        <td>{data.section}</td>
                        <td>
                          <span className="view-details-link">Select</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Enroll_Students_ContentHeader;