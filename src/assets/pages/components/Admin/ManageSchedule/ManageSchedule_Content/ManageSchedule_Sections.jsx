import React, { useState, useEffect } from "react";
import "./ManageSchedule_Content.css";
import { BiEditAlt } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";

const ManageSchedule_Sections = () => {
  const [popup, setPopup] = useState({
    show: false,
    record: null,
  });

  const [editPopup, setEditPopup] = useState({
    show: false,
    record: null,
  });

  const [sectionsData, setSectionsData] = useState([]); // State to store sections data

  // Fetch data from backend API
  useEffect(() => {
    fetch("http://localhost:3000/getSections") // This assumes the back-end server is running on the same host
      .then((response) => response.json())
      .then((data) => {
        setSectionsData(data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error("Error fetching sections data:", error);
      });
  }, []);

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

  // Disable scrolling when modal is open
  useEffect(() => {
    if (popup.show || editPopup.show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset"; // Reset overflow when modal is closed
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [popup, editPopup]);

  return (
    <div className="section-list">
      <div className="recordslist-container">
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Section ID</th>
              <th>Section Name</th>
              <th>Subject</th>
              <th>Semester</th>
              <th>School Year</th>
              <th>Strand</th>
              <th>Instructor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sectionsData.map((record) => (
              <tr key={record.section_id}>
                <td>
                  <input type="checkbox" name={`select-${record.section_id}`} />{" "}
                  {/* Checkbox */}
                </td>
                <td>{record.section_id}</td>
                <td>{record.section_name}</td>
                <td>{record.subject_name}</td>
                <td>{record.semester}</td>
                <td>{record.school_year}</td>
                <td>{record.strand}</td>
                <td>{record.faculty_name}</td>
                <td>
                  <span
                    className="add-subject-link"
                    onClick={() => handlePopup(record)}
                  >
                    <FaRegEye size={20}/>
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
                <div className="input-box">
                  <label>Section Name:</label>
                  <input type="text" value={editPopup.record.section_name} />
                </div>
                <div className="input-box">
                  <label>Subject:</label>
                  <input type="text" value={editPopup.record.subject_name} />
                </div>
                <div className="input-box">
                  <label>Semester:</label>
                  <input type="text" value={editPopup.record.semester} />
                </div>
                <div className="input-box">
                  <label>School Year:</label>
                  <input type="text" value={editPopup.record.school_year} />
                </div>
                <div className="input-box">
                  <label>Strand:</label>
                  <input type="text" value={editPopup.record.strand} />
                </div>
                <div className="input-box">
                  <label>Instructor:</label>
                  <input type="text" value={editPopup.record.faculty_name} />
                </div>
                <div class="buttons">
                  <button type="submit" class="btn-box" name="add" id="add">Done</button>
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
