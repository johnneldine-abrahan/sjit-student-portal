import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FiEdit, FiTrash } from "react-icons/fi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import "./ManageSchedule_Content.css";

const ManageSchedule_ContentHeader = () => {
  const [popup, setPopup] = useState({
    show: false,
    message: null,
  });

  const [popupEdit, setPopupEdit] = useState({
    show: false,
    message: null,
  });

  const [popupDelete, setPopupDelete] = useState({
    show: false,
    message: null,
  });

  const [checked, setChecked] = useState({
    program: "",
  });

  const [formData, setFormData] = useState({
    gradeLevel: "",
    strand: "",
    subjectName: "",
    subjectId: "",
    instructor: "",
    facultyId: "",
    semester: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [instructors, setInstructors] = useState([]); // Assuming you also need instructors

  const [schedule, setSchedule] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  const [tableData, setTableData] = useState([
    {
      day: "",
      startTime: "",
      endTime: "",
    },
  ]);

  const handlePopup = (message) => {
    setPopup({
      show: true,
      message: message,
    });
  };

  const handlePopupEdit = (message) => {
    setPopupEdit({
      show: true,
      message: message,
    });
  };

  const handlePopupDelete = (message) => {
    setPopupDelete({
      show: true,
      message: message,
    });
  };

  const handleClose = () => {
    setPopup({
      show: false,
      message: null,
    });
  };

  const handleEditClose = () => {
    setPopupEdit({
      show: false,
      message: null,
    });
  };

  const handleDeleteClose = () => {
    setPopupDelete({
      show: false,
      message: null,
    });
  };

  const handleSubjectChange = (event) => {
    const selectedSubjectId = event.target.value;
    const selectedSubject = subjects.find(
      (subject) => subject.subject_id === selectedSubjectId
    );
    setFormData({
      ...formData,
      subjectName: selectedSubject ? selectedSubject.subject_name : "",
      subjectId: selectedSubject ? selectedSubject.subject_id : "",
    });
  };

  const handleInstructorChange = (e) => {
    const selectedFacultyId = e.target.value;
    const selectedInstructor = instructors.find(
      (instructor) => instructor.faculty_id === selectedFacultyId
    );

    setFormData((prevData) => ({
      ...prevData,
      facultyId: selectedFacultyId,
      instructor: selectedInstructor ? `${selectedInstructor.last_name}, ${selectedInstructor.first_name} ${selectedInstructor.middle_initial || ""}.` : ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
    handleClose(); // Close the popup after submitting
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setChecked({
      program: value,
    });
  };

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleScheduleChange = (event, index) => {
    const { name, value } = event.target;
    const newTableData = [...tableData];
    newTableData[index][name] = value;
    setTableData(newTableData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      {
        day: "",
        startTime: "",
        endTime: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    setTableData(tableData.filter((row, i) => i !== index));
  };

  // Sample fetching data for subjects and instructors
  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await fetch('http://localhost:3000/getSubjects'); // Replace with your API endpoint
      const data = await response.json();
      setSubjects(data);
    };

    const fetchInstructors = async () => {
      const response = await fetch('http://localhost:3000/getFaculty'); // Replace with your API endpoint
      const data = await response.json();
      setInstructors(data);
    };

    fetchSubjects();
    fetchInstructors();
  }, []);


  return (
    <div className="manage-schedule-header">
      <h1 className="header-title">Manage Schedule</h1>
      <div className="admin-manage-schedule">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <BiSearch className="search-icon" />
        </div>
        <div className="buttons-header">
          <div className="buttons-act">
            <RiAddLargeFill
              className="buttons-icon"
              onClick={() => handlePopup("Add Subject and Section")}
            />
          </div>
          <div className="buttons-act">
            <RiDeleteBin6Line
              className="buttons-icon"
              onClick={() => handlePopupDelete("Delete Subject and Section")}
            />
          </div>
        </div>
      </div>

      {popup.show && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup-manage-schedule">
            <div className="popup-header">
              <h3>{popup.message}</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <form onSubmit={handleSubmit}>
                <div className="first-row">
                  <div className="grade-level">
                    <label>Select Program </label>
                    <label>
                      <input type="checkbox"
                        name="program"
                        value="Junior Highschool"
                        checked={checked.program === "Junior Highschool"}
                        onChange={handleCheckboxChange}
                      />
                      Junior Highschool
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="program"
                        value="Senior Highschool"
                        checked={checked.program === "Senior Highschool"}
                        onChange={handleCheckboxChange}
                      />
                      Senior Highschool
                    </label>
                  </div>
                </div>

                <div className="second-row">
                  <div className="grade-level">
                    <div className="second-row">
                      <label>Select Semester</label>
                      <label>
                        <input
                          type="radio"
                          name="semester"
                          value="FIRST"
                          checked={formData.semester === "FIRST"}
                          onChange={handleChange}
                        />
                        FIRST
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="semester"
                          value="FIRST"
                          checked={formData.semester === "SECOND"}
                          onChange={handleChange}
                        />
                        SECOND
                      </label>
                    </div>
                  </div>
                </div>

                <div className="first-row">
                  <div className="input-box">
                    <label>Grade Level</label>
                    {checked.program === "jhs" ? (
                      <select
                        name="gradeLevel"
                        value={formData.gradeLevel}
                        onChange={handleFormDataChange}
                      >
                        <option value=""></option>
                        <option value="Grade 7">Grade 7</option>
                        <option value="Grade 8">Grade 8</option>
                        <option value="Grade 9">Grade 9</option>
                        <option value="Grade 10">Grade 10</option>
                      </select>
                    ) : checked.program === "shs" ? (
                      <select
                        name="gradeLevel"
                        value={formData.gradeLevel}
                        onChange={handleFormDataChange}
                      >
                        <option value=""></option>
                        <option value="Grade 11">Grade 11</option>
                        <option value="Grade 12">Grade 12</option>
                      </select>
                    ) : (
                      <select
                        name="gradeLevel"
                        value={formData.gradeLevel}
                        onChange={handleFormDataChange}
                      >
                        <option value=""></option>
                      </select>
                    )}
                  </div>

                  <div className="input-box">
                    <label>Strand</label>
                    <select
                      name="strand"
                      value={formData.strand}
                      onChange={handleFormDataChange}
                      disabled={checked.program === "Junior Highschool"}
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
                  </div>
                </div>

                <div className="second-row">
                  <div className="input-box">
                    <label>
                      Section<input type="text" name="section" />
                    </label>
                  </div>

                  <div className="input-box">
                    <label>
                      School Year<input type="text" name="schoolyear" />
                    </label>
                  </div>
                </div>

                <div className="second-row">
                  <div className="input-box">
                    <label>Subject</label>
                    <div style={{ display: "flex" }}>
                      <select
                        name="subjectName"
                        onChange={handleSubjectChange} // Handle subject selection
                      >
                        <option value=""></option>
                        {subjects.map((subject) => (
                          <option key={subject.subject_id} value={subject.subject_id}>
                            {subject.subject_name} {/* Display subject name */}
                          </option>
                        ))}
                      </select>
                      {/* Input field to show the subject ID */}
                      <input
                        type="text"
                        name="subjectId"
                        value={formData.subjectId} // Display selected subject's id
                        onChange={handleFormDataChange}
                        placeholder="Subject ID"
                        style={{ marginLeft: 10 }}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="second-row">
                  <div className="input-box">
                    <label>Instructor</label>
                    <div style={{ display: "flex" }}>
                      <select
                        name="facultyName"
                        value={formData.facultyName}
                        onChange={handleInstructorChange} // Handle instructor selection
                      >
                        <option value=""></option>
                        {instructors.map((instructor) => (
                          <option key={instructor.faculty_id} value={instructor.faculty_id}>
                            {instructor.full_name}
                          </option>
                        ))}
                      </select>
                      {/* Input field to show the faculty ID */}
                      <input
                        type="text"
                        name="facultyId"
                        value={formData.facultyId} // Display selected instructor's ID
                        onChange={handleFormDataChange}
                        placeholder="Faculty ID"
                        style={{ marginLeft: 10 }}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 20 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          Day
                        </th>
                        <th
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          Start Time
                        </th>
                        <th
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          End Time
                        </th>
                        <th
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            <select
                              name="day"
                              value={row.day}
                              onChange={(e) => handleScheduleChange(e, index)}
                            >
                              <option value=""></option>
                              <option value="Monday">Monday</option>
                              <option value="Tuesday">Tuesday</option>
                              <option value="Wednesday">Wednesday</option>
                              <option value="Thursday">Thursday</option>
                              <option value="Friday">Friday</option>
                              <option value="Saturday">Saturday</option>
                              <option value="Sunday">Sunday</option>
                            </select>
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            <input
                              type="time"
                              name="startTime"
                              value={row.startTime}
                              onChange={(e) => handleScheduleChange(e, index)}
                            />
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            <input
                              type="time"
                              name="endTime"
                              value={row.endTime}
                              onChange={(e) => handleScheduleChange(e, index)}
                            />
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            <div className="actions">
                              <button
                                type="button"
                                className="delete-btn"
                                onClick={() => handleDeleteRow(index)}
                                disabled={index === 0}
                              >
                                <FiTrash className="actions-ico" />
                              </button>
                              <button
                                type="button"
                                className="add-btn"
                                onClick={handleAddRow}
                              >
                                <RiAddLargeFill className="actions-ico" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="thrid-row">
                  <div className="input-box">
                    <label>
                      Room Assignment <input type="text" name="room" />
                    </label>
                  </div>
                  <div className="input-box">
                    <label>
                      Slot
                      <input type="text" name="slot" />
                    </label>
                  </div>
                </div>

                <div class="buttons">
                  <button type="submit" class="btn-box" name="add" id="add">
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {popupDelete.show && (
        <>
          <div
            className="popup-blurred-background"
            onClick={handleDeleteClose}
          />
          <div className="popup-manage-schedule">
            <div className="popup-header">
              <h3>{popupDelete.message}</h3>
              <button onClick={handleDeleteClose}>Close</button>
            </div>
            <div className="popup-content">
              <p>
                Are you sure you want to delete the selected schedule? This
                action is cannot be undone.
              </p>
              <div class="buttons">
                <button type="submit" class="btn-box" name="add" id="add">
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageSchedule_ContentHeader;