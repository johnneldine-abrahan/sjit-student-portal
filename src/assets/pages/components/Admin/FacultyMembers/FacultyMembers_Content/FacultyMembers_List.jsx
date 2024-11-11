import React, { useState, useEffect, useRef } from "react";
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
  updateFacultyRecords
}) => {
  const [popup, setPopup] = useState({ show: false, record: null });
  const [editPopup, setEditPopup] = useState({ show: false, record: null });
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    middle_name: "",
  });
  const [currentFacultyId, setCurrentFacultyId] = useState(null); // State to track the current faculty ID

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/faculty/${currentFacultyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Faculty updated:", data.faculty);
        
        alert("Faculty successfully updated!");
        handleClose();

        const updatedResponse = await fetch("http://localhost:3000/faculties");
        const updatedRecords = await updatedResponse.json();
        await updateFacultyRecords(updatedRecords); // Call the passed function to refresh the faculty list
  
      } else {
        const errorData = await response.json();
        console.error("Error updating faculty:", errorData.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handlePopup = (record) => {
    setPopup({
      show: true,
      record: record,
    });
  };

  const handleEditPopup = async (facultyId) => {
    setCurrentFacultyId(facultyId); // Set the current faculty ID
    try {
      const response = await fetch(`http://localhost:3000/faculty/${facultyId}`); // Fetch faculty data
      if (response.ok) {
        const data = await response.json();
        setFormData({
          last_name: data.last_name,
          first_name: data.first_name,
          middle_name: data.middle_name,
        });
        setEditPopup({
          show: true,
          record: data, // Save fetched data for potential use
        });
      } else {
        console.error('Faculty not found');
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
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
    setFormData({ last_name: "", first_name: "", middle_name: "" }); // Reset form data on close
    setCurrentFacultyId(null); // Reset current faculty ID on close
  };

  // Disable scrollbar when any popup is open
  useEffect(() => {
    const body = document.body;
    if (popup.show || editPopup.show) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      body.style.overflow = 'auto';
    };
  }, [popup, editPopup]);

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
              <th >First Name</th>
              <th>Middle Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {facultyRecords.map((record) => (
              <tr
                key={record.faculty_id}
                className={selectedFacultyIds.includes(record.faculty_id) ? "checked" : ""}
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
                <td>{record.faculty_status}</td>
                <td>
                  <button
                    className="view-details"
                    onClick={() => handlePopup(record)}
                  >
                    <FaRegEye size={20} />
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => handleEditPopup(record.faculty_id)} // Pass faculty_id here
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
                <button type="submit" className="btn-box">
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