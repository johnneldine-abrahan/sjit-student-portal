import React, { useState, useEffect, useRef } from "react";
import "./ManageSchedule_Content.css";
import { BiEditAlt } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { RiAddLargeFill } from "react-icons/ri";

const ManageSchedule_Sections = ({ setSelectedSections, sectionsData }) => {
  const [popup, setPopup] = useState({
    show: false,
    record: null,
  });

  const [editPopup, setEditPopup] = useState({
    show: false,
    record: null,
  });

  const [selectedIds, setSelectedIds] = useState([]); // State to track selected section IDs
  const [selectAllChecked, setSelectAllChecked] = useState(false); // Add this line
  const selectAllRef = useRef(); // Create a ref for the select-all checkbox

  useEffect(() => {
    // Update the selected sections in the parent component
    setSelectedSections(selectedIds);
  }, [selectedIds, setSelectedSections]);

  const handlePopup = (record) => {
    setPopup({
      show: true,
      record: record,
    });
  };

  const handleEditPopup = (record) => {
    setEditPopup({
      show: true,
      record: record,
    });
  };

  const handleClose = () => {
    setPopup({
      show: false,
      record: null,
    });
    setEditPopup({
      show: false,
      record: null,
    });
  };

  const handleCheckboxChange = (id, isSelectAll = false) => {
    if (isSelectAll) {
      setSelectAllChecked(!selectAllChecked);
      if (!selectAllChecked) {
        setSelectedIds(sectionsData.map((section) => section.section_id));
      } else {
        setSelectedIds([]);
      }
    } else {
      setSelectedIds((prevSelectedIds) => {
        if (prevSelectedIds.includes(id)) {
          return prevSelectedIds.filter((selectedId) => selectedId !== id);
        } else {
          return [...prevSelectedIds, id];
        }
      });
    }
  };

  const [formData, setFormData] = useState({
    gradeLevel: "",
    strand: "",
    subjectName: "",
    subjectId: "",
    facultyName: "",
    facultyId: "",
    semester: "",
    slot: "",
    schoolyear: "",
    program: "",
    section: "",
  });

  const [tableData, setTableData] = useState([
    {
      day: "",
      startTime: "",
      endTime: "",
      room: "",
    },
  ]);

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

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      {
        day: "",
        startTime: "",
        endTime: "",
        room: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    setTableData(tableData.filter((row, i) => i !== index));
  };

  const handleCheckboxChangeProgram = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      program: value,
    });
  };

  const handleSemesterChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubjectChange = (event) => {
    const selectedSubjectId = event.target.value;
    const selectedSubject = sectionsData.find(
      (subject) => subject.subject_id === selectedSubjectId
    );
    setFormData({
      ...formData,
      subjectName: selectedSubject ? selectedSubject.subject_name : "",
      subjectId: selectedSubject ? selectedSubject.subject_id : "",
    });
  };

  const handleFacultyChange = (event) => {
    const selectedFacultyId = event.target.value;
    const selectedFaculty = sectionsData.find(
      (faculty) => faculty.faculty_id === selectedFacultyId
    );
    setFormData({
      ...formData,
      facultyName: selectedFaculty ? selectedFaculty.faculty_name : "",
      facultyId: selectedFaculty ? selectedFaculty.faculty_id : "",
    });
  };

  return (
    <div className="section-list">
      <div className="recordslist-container">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  ref={selectAllRef}
                  checked={selectAllChecked}
                  onChange={() => handleCheckboxChange(null, true)}
                />
              </th>
              <th>Section ID</th>
              <th>Grade Level</th>
              <th>Section Name</th>
              <th>Strand</th>
              <th>Subject</th>
              <th>Semester</th>
              <th>School Year</th>
              <th>Instructor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sectionsData.map((record) => (
              <tr
                key={record.section_id}
                className={
                  selectedIds.includes(record.section_id) ? "checked" : ""
                }
              >
                <td>
                  <input
                    type="checkbox"
                    name={`select-${record.section_id}`}
                    checked={selectedIds.includes(record.section_id)} // Add this line
                    onChange={() => handleCheckboxChange(record.section_id)} // Update selection
                  />
                </td>
                <td>{record.section_id}</td>
                <td>{record.grade_level}</td>
                <td>{record.section_name}</td>
                <td>{record.strand}</td>
                <td>{record.subject_name}</td>
                <td>{record.semester}</td>
                <td>{record.school_year}</td>
                <td>{record.faculty_name}</td>
                <td>
                  <span
                    className="add-subject-link"
                    onClick={() => handlePopup(record)}
                  >
                    <FaRegEye size={20} />
                  </span>
                  <button
                    className="edit-button"
                    onClick={() => handleEditPopup(record)}
                    style={{ marginLeft: "10px" }}
                  >
                    <BiEditAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {popup.show && (
          <div className="popup-blurred-background" onClick={handleClose} />
        )}
        {popup.show && (
          <div className="popup-manage-schedule">
            <div className="popup-header">
              <h3>View Details</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <p>Section: {popup.record.section_name}</p>
              <p>Subject: {popup.record.subject_name}</p>
              <p>Semester: {popup.record.semester}</p>
              <p>School Year: {popup.record.school_year}</p>
              <p>Strand: {popup.record.strand}</p>
              <p>Instructor: {popup.record.faculty_name}</p>
            </div>
          </div>
        )}

        {editPopup.show && (
          <div className="popup-blurred-background" onClick={handleClose} />
        )}
        {editPopup.show && (
          <div className="popup-manage-schedule">
            <div className="popup-header">
              <h3>Edit Section</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <form>
                <div className="first-row">
                  <div className="grade-level">
                    <label>Select Program </label>
                    <label>
                      <input
                        type="checkbox"
                        name="program"
                        value="Junior Highschool"
                        checked={formData.program === "Junior Highschool"}
                        onChange={handleCheckboxChangeProgram}
                      />
                      Junior Highschool
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="program"
                        value="Senior Highschool"
                        checked={formData.program === "Senior Highschool"}
                        onChange={handleCheckboxChangeProgram}
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
                          onChange={handleSemesterChange}
                        />
                        FIRST
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="semester"
                          value="SECOND"
                          checked={formData.semester === "SECOND"}
                          onChange={handleSemesterChange}
                        />
                        SECOND
                      </label>
                    </div>
                  </div>
                </div>

                <div className="first-row">
                  <div className="input-box">
                    <label>Grade Level</label>
                    {formData.program === "Junior Highschool" ? (
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
                    ) : formData.program === "Senior Highschool" ? (
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
                      disabled={formData.program === "Junior Highschool"}
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
                      Section
                      <input
                        type="text"
                        value={formData.section}
                        name="section"
                        onChange={handleFormDataChange}
                      />
                    </label>
                  </div>

                  <div className="input-box">
                    <label>
                      School Year
                      <input
                        type="text"
                        value={formData.schoolyear}
                        name="schoolyear"
                        onChange={handleFormDataChange}
                      />
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
                        {sectionsData.map((subject) => (
                          <option
                            key={subject.subject_id}
                            value={subject.subject_id}
                          >
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
                    <label>Faculty</label>
                    <div style={{ display: "flex" }}>
                      <select
                        name=" facultyName"
                        value={formData.facultyId}
                        onChange={handleFacultyChange} // Handle instructor selection
                      >
                        <option value=""></option>
                        {sectionsData.map((faculty) => (
                          <option
                            key={faculty.faculty_id}
                            value={faculty.faculty_id}
                          >
                            {faculty.faculty_name}
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
                          Room
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
                            <input
                              type="text"
                              name="room"
                              value={row.room}
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
                      Slot
                      <input
                        type="text"
                        value={formData.slot}
                        name="slot"
                        onChange={handleFormDataChange}
                      />
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
        )}
      </div>
    </div>
  );
};

export default ManageSchedule_Sections;