import React, { useState, useRef } from "react";
import "./FacultyMembers_Content.css";
import { BiEditAlt } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";

const FacultyMembers_List = ({
  onSelectFaculty,
  selectedFacultyIds,
  facultyRecords,
  onSelectAll,
  selectAllRef,
  selectAllChecked,
}) => {
  const [popup, setPopup] = useState({ show: false, record: null });
  const [editPopup, setEditPopup] = useState({ show: false, record: null });
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    middle_name: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

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

  return (
    <div className="faculty-list">
      <div className="recordslist-container">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAllChecked}
                  ref={selectAllRef}
                  onChange={onSelectAll}
                />
              </th>
              <th>Faculty ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {facultyRecords.map((record) => (
              <tr
                key={record.faculty_id}
                className={
                  selectedFacultyIds.includes(record.faculty_id)
                    ? "checked"
                    : ""
                }
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedFacultyIds.includes(record.faculty_id)}
                    onChange={() => onSelectFaculty(record.faculty_id)}
                  />
                </td>
                <td>{record.faculty_id}</td>
                <td>{record.last_name}</td>
                <td>{record.first_name}</td>
                <td>{record.middle_name}</td>
                <td>
                  <button
                    className="view-details"
                    onClick={() => handlePopup(record)}
                  >
                    <FaRegEye size={20} />
                  </button>
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
      </div>

      {popup.show && (
        <div className="popup-blurred-background" onClick={handleClose} />
      )}
      {popup.show && (
        <div className="popup">
          <div className="popup-header">
            <h3>Faculty Details</h3>
            <button onClick={handleClose}>Close</button>
          </div>
          <div className="popup-content">
            <p>Faculty ID: {popup.record.faculty_id}</p>
            <p>Last Name: {popup.record.last_name}</p>
            <p>First Name: {popup.record.first_name}</p>
            <p>Middle Name: {popup.record.middle_name}</p>
          </div>
        </div>
      )}
      {editPopup.show && (
        <div className="popup-blurred-background" onClick={handleClose} />
      )}
      {editPopup.show && (
        <div className="popup">
          <div className="popup-header">
            <h3>Edit Faculty</h3>
            <button onClick={handleClose}>Close</button>
          </div>
          <div className="popup-content">
            <form onSubmit={handleSubmit}>
              <div className="first-row">
                <div className="input-box">
                  <label>
                    Last Name
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    First Name
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Middle Name
                    <input
                      type="text"
                      name="middle_name"
                      value={formData.middle_name}
                      onChange={handleChange}
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
  );
};

export default FacultyMembers_List;