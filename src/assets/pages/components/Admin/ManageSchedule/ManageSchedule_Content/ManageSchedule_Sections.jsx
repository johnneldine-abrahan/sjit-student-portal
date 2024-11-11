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

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const selectAllRef = useRef();

  useEffect(() => {
    setSelectedSections(selectedIds);
  }, [selectedIds, setSelectedSections]);

  const handlePopup = (record) => {
    setPopup({
      show: true,
      record: record,
    });
  };

  const handleEditPopup = async (record) => {
    console.log("Editing record:", record); // Verify this is being called
    setEditPopup({
      show: true,
      record: record,
    });

    try {
      const response = await fetch(`http://localhost:3000/getSection/${record.section_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch section data");
      }
      const data = await response.json();

      setFormData({
        gradeLevel: data.section.grade_level,
        strand: data.section.strand,
        subjectName: record.subject_name,
        subjectId: data.section.subject_id,
        facultyName: data.section.faculty_name,
        facultyId: data.teachingLoads.length > 0 ? data.teachingLoads[0].faculty_id : "",
        semester: data.section.semester,
        slot: data.section.slot,
        schoolyear: data.section.school_year,
        program: data.section.program,
        section: data.section.section_name,
      });

      console.log("Updated formData:", formData);

      const schedules = data.schedules.map(schedule => ({
        day: schedule.day,
        startTime: schedule.start_time,
        endTime: schedule.end_time,
        room: schedule.room,
      }));

      setTableData(schedules);
    } catch (error) {
      console.error("Error fetching section data:", error);
    }
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
                    checked={selectedIds.includes(record.section_id)}
                    onChange={() => handleCheckboxChange(record.section_id)}
                  />
                </td>
                <td>{record.section_id}</td>
                <td>Grade {record.grade_level}</td>
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
                        <option value="7">Grade 7</option>
                        <option value="8">Grade 8</option>
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                      </select>
                    ) : formData.program === "Senior Highschool" ? (
                      <select
                        name="gradeLevel"
                        value={formData.gradeLevel}
                        onChange={handleFormDataChange}
                      >
                        <option value=""></option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12</option>
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
                      <option value="TVL - Information Communications Technology (TVL-ICT)">
                        TVL - Information Communications Technology (TVL-ICT)
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
                    <input
                      type="text"
                      name="subjectName"
                      value={formData.subjectName} // Display selected subject's name
                      onChange={handleFormDataChange}
                      placeholder="Subject Name"
                    />
                  </div>

                  <div className="input-box">
                    <label>Subject ID</label>
                    <input
                      type="text"
                      name="subjectId"
                      value={formData.subjectId}
                      onChange={handleFormDataChange}
                      placeholder="Subject ID"
                      readOnly
                    />
                  </div>
                </div>

                <div className="second-row">
                  <div className="input-box">
                    <label>Faculty</label>
                    <input
                      type="text"
                      name="facultyName"
                      value={formData.facultyName} // Display selected instructor's name
                      onChange={handleFormDataChange}
                      placeholder="Faculty Name"
                      readOnly
                    />
                  </div>
                  <div className="input-box">
                  <label>Faculty ID</label>
                  <input
                      type="text"
                      name="facultyId"
                      value={formData.facultyId} // Display selected instructor's ID
                      onChange={handleFormDataChange}
                      placeholder="Faculty ID"
                      readOnly
                    />
                  </div>
                </div>

                <div style={{ marginTop: 20 }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>
                          Day
                        </th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>
                          Start Time
                        </th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>
                          End Time
                        </th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>
                          Room
                        </th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          <td style={{ border: "1px solid black", padding: "8px" }}>
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
                          <td style={{ border: "1px solid black", padding: "8px" }}>
                            <input
                              type="time"
                              name="startTime"
                              value={row.startTime}
                              onChange={(e) => handleScheduleChange(e, index)}
                            />
                          </td>
                          <td style={{ border: "1px solid black", padding: "8px" }}>
                            <input
                              type="time"
                              name="endTime"
                              value={row.endTime}
                              onChange={(e) => handleScheduleChange(e, index)}
                            />
                          </td>
                          <td style={{ border: "1px solid black", padding: "8px" }}>
                            <input
                              type="text"
                              name="room"
                              value={row.room}
                              onChange={(e) => handleScheduleChange(e, index)}
                            />
                          </td>
                          <td style={{ border: "1px solid black", padding: "8px" }}>
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

                <div className="third-row">
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

                <div className="buttons">
                  <button type="submit" className="btn-box" name="add" id="add">
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