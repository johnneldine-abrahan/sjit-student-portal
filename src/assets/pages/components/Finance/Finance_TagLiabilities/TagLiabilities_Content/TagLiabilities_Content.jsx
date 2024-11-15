import React, { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./TagLiabilities_Content.css";
import TagLiabilities_ContentHeader from "./TagLiabilities_ContentHeader";

const TagLiabilities_Content = () => {
  const [studentLiabRecords, setStudentLiabRecords] = useState([]);
  const [popup, setPopup] = useState({
    type: null, // 'edit', 'delete', 'check', 'confirm'
    record: null,
  });

  const handlePopup = (type, record) => {
    setPopup({
      type,
      record,
    });
  };

  const handleClose = () => {
    setPopup({
      type: null,
      record: null,
    });
  };

  const fetchLiabilities = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-liability");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStudentLiabRecords(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleConfirmStatusUpdate = async (record) => {
    try {
      const response = await fetch(`http://localhost:3000/update-liability-status/${record.liability_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update liability status");
      }

      const result = await response.json();
      alert(result.message); // Show success message
      fetchLiabilities(); // Refresh the list after updating status
    } catch (error) {
      console.error("Error updating liability status:", error);
    } finally {
      handleClose(); // Close the popup after updating status
    }
  };

  const handleDelete = async (record) => {
    try {
      const response = await fetch(`http://localhost:3000/delete-liability/${record.liability_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete liability");
      }

      const result = await response.json();
      alert(result.message); // Show success message
      fetchLiabilities(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting liability:", error);
    } finally {
      handleClose(); // Close the popup after deleting
    }
  };

  useEffect(() => {
    fetchLiabilities();
  }, []);

  useEffect(() => {
    if (popup.type) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Cleanup function to reset overflow when component unmounts or popup closes
    return () => {
      document.body.style.overflow = 'auto'; // Ensure scrolling is enabled
    };
  }, [popup]);

  return (
    <div className="tagliabilities-content">
      <TagLiabilities_ContentHeader refreshData={fetchLiabilities} />
      <div className="student-records">
        <div className="recordslist-container">
          <table>
            <thead>
              <tr>
                <th>Liability ID</th>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Liability</th>
                <th>School Year</th>
                <th>Semester</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentLiabRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.liability_id}</td>
                  <td>{record.student_id}</td>
                  <td>{record.student_name}</td>
                  <td>{record.liability_description}</td>
                  <td>{record.school_year}</td>
                  <td>{record.semester}</td>
                  <td>{record.status}</td>
                  <td>
                    <button className="edit-button-filter" onClick={() => handlePopup('edit', record)}>
                      <BiEditAlt size={20} />
                    </button>
                    <button
                      className="edit-button-filter"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handlePopup('check', record)}
                    >
                      <FaCheck size={20} />
                    </button>
                    <button
                      className="edit-button-filter"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handlePopup('delete', record)}
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup for Confirm Status Update */}
      {popup.type === 'check' && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup">
            <div className="popup-header">
              <h3>Confirm Liability Status Update</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <p>Do you want to update the liability status to "Paid" for {popup.record.student_name}?</p>
              <div className="button-container">
                <button className="btn-box" onClick={() => handleConfirmStatusUpdate(popup.record)}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Popup for Delete Confirmation */}
      {popup.type === 'delete' && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup">
            <div className="popup-header">
              <h3>Confirm Deletion</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <p>Are you sure you want to delete the liability for {popup.record.student_name}?</p>
              <div className="button-container">
                <button className="btn-box" onClick={() => handleDelete(popup.record)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TagLiabilities_Content;
