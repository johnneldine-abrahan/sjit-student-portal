import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import "./ManageSchedule_Content.css";
import axios from "axios";

const ManageSchedule_ContentHeader = ({
  selectedSections,
  handleDeleteSections,
  refreshSections,
}) => {
  const [popup, setPopup] = useState({
    show: false,
    message: null,
  });

  const [popupDelete, setPopupDelete] = useState({
    show: false,
    message: null,
  });

  const [popupArchive, setPopupArchive] = useState({
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
    facultyName: "",
    facultyId: "",
    semester: "",
    slot: "",
    schoolyear: "",
    program: "",
    section: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [facultyName, setFacultyName] = useState([]); // Assuming you also need instructors

  const [tableData, setTableData] = useState([
    {
      day: "",
      startTime: "",
      endTime: "",
      room: "",
    },
  ]);

  const validateForm = (formData, tableData) => {
    const requiredFields = [
      "gradeLevel",
      "subjectName",
      "facultyName",
      "semester",
      "slot",
      "schoolyear",
      "program",
      "section",
    ];

    let isValid = true;
    let errorMessage = "";
    let firstErrorInput = null;

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field] === "") {
        document.querySelector(`[name="${field}"]`).classList.add("error");
        isValid = false;
        errorMessage += `${field} is required\n`;
        if (!firstErrorInput) {
          firstErrorInput = document.querySelector(`[name="${field}"]`);
        }
      } else {
        document.querySelector(`[name="${field}"]`).classList.remove("error");
      }
    });

    // Validate table data
    tableData.forEach((row, index) => {
      if (!row.day || row.day === "") {
        document.querySelector(`[name="day"]`).classList.add("error");
        isValid = false;
        errorMessage += `Day is required for row ${index + 1}\n`;
        if (!firstErrorInput) {
          firstErrorInput = document.querySelector(`[name="day"]`);
        }
      } else {
        document.querySelector(`[name="day"]`).classList.remove("error");
      }

      if (!row.startTime || row.startTime === "") {
        document.querySelector(`[name="startTime"]`).classList.add("error");
        isValid = false;
        errorMessage += `Start Time is required for row ${index + 1}\n`;
        if (!firstErrorInput) {
          firstErrorInput = document.querySelector(`[name="startTime"]`);
        }
      } else {
        document.querySelector(`[name="startTime"]`).classList.remove("error");
      }

      if (!row.endTime || row.endTime === "") {
        document.querySelector(`[name="endTime"]`).classList.add("error");
        isValid = false;
        errorMessage += `End Time is required for row ${index + 1}\n`;
        if (!firstErrorInput) {
          firstErrorInput = document.querySelector(`[name="endTime"]`);
        }
      } else {
        document.querySelector(`[name="endTime"]`).classList.remove("error");
      }

      if (!row.room || row.room === "") {
        document.querySelector(`[name="room"]`).classList.add("error");
        isValid = false;
        errorMessage += `Room is required for row ${index + 1}\n`;
        if (!firstErrorInput) {
          firstErrorInput = document.querySelector(`[name="room"]`);
        }
      } else {
        document.querySelector(`[name="room"]`).classList.remove("error");
      }
    });

    if (!isValid) {
      firstErrorInput.focus();
      //setErrorMessage(errorMessage);
      return false;
    }

    return true;
  };

  const handlePopup = (message) => {
    setPopup({
      show: true,
      message: message,
    });
  };

  const handlePopupDelete = () => {
    if (selectedSections.length === 0) {
      setPopupDelete({
        show: true,
        message:
          "No selected section. Please select at least one section to delete.",
      });
    } else {
      setPopupDelete({
        show: true,
        message:
          "Are you sure you want to delete the selected section? This action cannot be undone.",
      });
    }
  };
  const handleArchiveSections = async (sections) => {
    try {
      const response = await axios.post(
        "https://san-juan-institute-of-technology-backend.onrender.com/archiveSections",
        {
          selectedSections: sections,
        }
      );
      alert(response.data.message); // Show success message
      refreshSections(); // Refresh the sections data after archiving
    } catch (error) {
      console.error("Error archiving sections:", error);
      alert("Error archiving sections. Please try again.");
    }
  };

  const handleArchiveClick = async () => {
    if (selectedSections.length === 0) {
      alert("Please select at least one section to archive.");
      return;
    }

    try {
      await handleArchiveSections(selectedSections);
      handleArchiveClose();
      refreshSections(); // Refresh the sections after archiving
    } catch (error) {
      console.error("Error archiving sections:", error);
    }
  };
  const handlePopupArchive = () => {
    if (selectedSections.length === 0) {
      setPopupArchive({
        show: true,
        message:
          "No selected section. Please select at least one section to archive.",
      });
    } else {
      setPopupArchive({
        show: true,
        message: "Are you sure you want to archive the selected section?",
      });
    }
  };

  const handleClose = () => {
    setPopup({
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

  const handleArchiveClose = () => {
    setPopupArchive({
      show: false,
      message: null,
    });
  };

  const handleDeleteClick = async () => {
    if (selectedSections.length === 0) {
      alert("Please select at least one section to delete.");
      return;
    }

    try {
      await handleDeleteSections(selectedSections);
      handleDeleteClose();
      window.location.reload();
      refreshSections(); // Refresh the sections after deletion
      // Reset the selectedSections state
    } catch (error) {
      console.error("Error deleting sections:", error);
      //alert("Failed to delete sections. Please try again.");
    }
  };

  const handleSubjectChange = async (event) => {
    const selectedSubjectId = event.target.value; // Ensure this is the correct subject ID from the dropdown

    try {
      const response = await axios.get("https://san-juan-institute-of-technology-backend.onrender.com/getSubjects", {
        params: {
          subjectId: selectedSubjectId,
        },
      });

      const subject = response.data.find(
        (subject) => subject.subject_id === selectedSubjectId
      );
      if (subject) {
        setFormData({
          ...formData,
          subjectName: subject.subject_name, // Set the subject name from the response
          subjectId: subject.subject_id, // Set the subject ID from the response
        });
      } else {
        console.error(`Subject not found: ${selectedSubjectId}`);
      }
    } catch (error) {
      console.error("Error fetching subject:", error);
    }
  };

  const handlefacultyNameChange = (e) => {
    const selectedFacultyId = e.target.value; // Assuming this gets the selected faculty ID
    const selectedFaculty = facultyName.find(
      (faculty) => faculty.faculty_id === selectedFacultyId
    );

    if (selectedFaculty) {
      console.log("Constructed full name:", selectedFaculty.full_name); // Use the already constructed full_name

      setFormData((prevData) => ({
        ...prevData,
        facultyId: selectedFacultyId,
        facultyName: selectedFaculty.full_name, // Use full_name directly
      }));
    } else {
      console.warn("Faculty not found for ID:", selectedFacultyId);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form data
    if (!validateForm(formData, tableData)) {
      return;
    }

    // Collect schedules from the table data
    const schedules = tableData.map((row) => ({
      day: row.day,
      start_time: row.startTime,
      end_time: row.endTime,
      room: row.room,
    }));

    // Create the payload to send to the server
    const payload = {
      subject_id: formData.subjectId,
      grade_level: formData.gradeLevel,
      strand: formData.strand,
      section_name: formData.section,
      semester: formData.semester,
      school_year: formData.schoolyear,
      program: formData.program,
      faculty_name: formData.facultyName,
      faculty_id: formData.facultyId,
      schedules,
      slot: formData.slot,
    };

    try {
      const response = await axios.post(
        "https://san-juan-institute-of-technology-backend.onrender.com/addSection",
        payload
      );
      alert(response.data.message);
      handleClose();
      // Optionally reset the form or clear the table data
      setFormData({
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
      setTableData([]);
      refreshSections();
      window.location.reload();
    } catch (error) {
      console.error(
        "Error adding section:",
        error.response ? error.response.data : error.message
      );
      alert("Error adding section. Please try again.");
    }
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setChecked({
      program: value,
    });
    setFormData((prevData) => ({
      ...prevData,
      program: value, // Update program in formData
    }));
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
        room: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    setTableData(tableData.filter((row, i) => i !== index));
  };

  // Sample fetching data for subjects and instructors
  useEffect(() => {
    const fetchSubjects = async () => {
      if (formData.gradeLevel) {
        const response = await fetch(
          `https://san-juan-institute-of-technology-backend.onrender.com/getSubjects?gradeLevel=${formData.gradeLevel}`
        );
        const data = await response.json();
        setSubjects(data);
      } else {
        setSubjects([]);
      }
    };

    const fetchFacultyName = async () => {
      const response = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/getFaculty");
      const data = await response.json();

      console.log("Faculty data fetched from API:", data); // Log the data structure
      setFacultyName(data);
    };

    fetchSubjects();
    fetchFacultyName();
  }, [formData.gradeLevel]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get(`https://san-juan-institute-of-technology-backend.onrender.com/getSubjects`, {
        params: {
          gradeLevel: formData.gradeLevel,
          strand: formData.strand,
        },
      });
      const data = response.data;
      setSubjects(data);
    };

    fetchSubjects();
  }, [formData.gradeLevel, formData.strand]);

  useEffect(() => {
    // Disable scroll when popups are open
    if (popup.show || popupDelete.show || popupArchive.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [popup, popupDelete, popupArchive]);

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
          <div className="buttons-act">
            <RiInboxUnarchiveLine
              className="buttons-icon"
              onClick={handlePopupArchive}
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
                      <input
                        type="checkbox"
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
                          value="SECOND"
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
                    {checked.program === "Junior Highschool" ? (
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
                    ) : checked.program === "Senior Highschool" ? (
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
                    <div style={{ display: "flex" }}>
                      <select name="subjectName" onChange={handleSubjectChange}>
                        <option value=""></option>
                        {subjects.map((subject) => (
                          <option
                            key={subject.subject_id}
                            value={subject.subject_id}
                          >
                            {subject.subject_name}
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
                        name="facultyName"
                        value={formData.facultyId}
                        onChange={handlefacultyNameChange} // Handle instructor selection
                      >
                        <option value=""></option>
                        {facultyName.map((faculty) => (
                          <option
                            key={faculty.faculty_id}
                            value={faculty.faculty_id}
                          >
                            {faculty.full_name}
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
        </>
      )}

      {popupDelete.show && (
        <>
          <div
            className="popup-blurred-background"
            onClick={handleDeleteClose}
          />
          <div className="popup">
            <div className="popup-header">
              <h3>Delete Section</h3>
              <button onClick={handleDeleteClose}>Close</button>
            </div>
            <div className="popup-content">
              <p>{popupDelete.message}</p>
              <div className="buttons">
                {selectedSections.length > 0 && (
                  <button
                    type="submit"
                    class="btn-box"
                    name="delete"
                    id="delete"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {popupArchive.show && (
        <>
          <div
            className="popup-blurred-background"
            onClick={handleArchiveClose}
          />
          <div className="popup">
            <div className="popup-header">
              <h3>Archive Section</h3>
              <button onClick={handleArchiveClose}>Close</button>
            </div>
            <div className="popup-content">
              <p>{popupArchive.message}</p>
              <div className="buttons">
                {selectedSections.length > 0 && (
                  <button
                    type="submit"
                    className="btn-box"
                    name="archive"
                    id="archive"
                    onClick={handleArchiveClick}
                  >
                    Archive
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageSchedule_ContentHeader;