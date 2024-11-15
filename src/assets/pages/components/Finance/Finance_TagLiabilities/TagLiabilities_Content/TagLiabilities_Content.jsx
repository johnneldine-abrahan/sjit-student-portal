import React, { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import "./TagLiabilities_Content.css";
import TagLiabilities_ContentHeader from "./TagLiabilities_ContentHeader";

const TagLiabilities_Content = () => {
  const [studentLiabRecords, setStudentLiabRecords] = useState([]);
  const [popup, setPopup] = useState({
    type: null,
    record: null,
  });
  const [formData, setFormData] = useState({
    schoolYear: "",
    semester: "",
    studentIDInput: "",
    studentName: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [schoolYears, setSchoolYears] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handlePopup = (type, record) => {
    if (type === "edit" && record) {
      setFormData({
        schoolYear: record.school_year,
        semester: record.semester,
        studentIDInput: record.student_id,
        studentName: record.student_name,
        description: record.liability_description,
      });
    }
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
    setErrorMessage("");
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

  const fetchSchoolYears = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-school-years");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSchoolYears(data);
    } catch (error) {
      console.error("Error fetching school years:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/update-liability/${popup.record.liability_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update liability");
      }

      const result = await response.json();
      alert(result.message);
      fetchLiabilities();
      handleClose();
    } catch (error) {
      console.error("Error updating liability:", error);
      setErrorMessage("Failed to update liability. Please try again.");
    }
  };

  const handleConfirmStatusUpdate = async (record) => {
    // Implement the logic for confirming the status update
  };

  const handleDelete = async (record) => {
    // Implement the logic for deleting a liability
  };

  const handleSearch = () => {
    // Implement the search functionality if needed
  };

  useEffect(() => {
    fetchLiabilities();
    fetchSchoolYears();
  }, []);

  useEffect(() => {
    if (popup.type) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [popup]);

  // Calculate total pages
  const totalPages = Math.ceil(studentLiabRecords.length / recordsPerPage);

  // Get current records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = studentLiabRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
              {currentRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.liability_id}</td>
                  <td>{record.student_id}</td>
                  <td>{record.student_name}</td>
                  <td>{record.liability_description}</td>
                  <td>{record.school_year}</td>
                  <td>{record.semester}</td>
                  <td>{record.status}</td>
                  <td>
                    <button
                      className="edit-button-filter"
                      onClick={() => handlePopup("edit", record)}
                    >
                      <BiEditAlt size={20} />
                    </button>
                    <button
                      className="edit-button-filter"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handlePopup("check", record)}
                    >
                      <FaCheck size={20} />
                    </button>
                    <button
                      className="edit-button-filter"
                      style={{ marginLeft: "10px" }}
                      onClick={() => handlePopup("delete", record)}
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

      {/* Popup for Edit Liability */}
      {popup.type === "edit" && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup">
            <div className="popup-header">
              <h3>Edit Liability</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <form onSubmit={handleSubmit}>
                <div className="first-row">
                  <div className="input-box">
                    <label htmlFor="schoolYear">School Year:</label>
                    <input
                      disabled
                      type="text"
                      id="schoolYear"
                      name="schoolYear"
                      value={formData.schoolYear}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter school year"
                    />
                  </div>

                  <div className="input-box">
                    <label htmlFor="semester">Semester:</label>
                    <select
                      disabled
                      id="semester"
                      name="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      required
                    >
                      <option value=""></option>
                      <option value="FIRST">FIRST</option>
                      <option value="SECOND">SECOND</option>
                    </select>
                  </div>
                </div>

                <div className="third-row">
                  <div className="input-box">
                    <label htmlFor="studentIDInput">Search:</label>
                    <div className="search-container">
                      <input
                        disabled
                        type="text"
                        id="studentIDInput"
                        name="studentIDInput"
                        value={formData.studentIDInput}
                        onChange={handleInputChange}
                        placeholder="Search here..."
                      />
                      <BiSearch
                        className="search-icon-filter"
                        size={"22px"}
                        onClick={handleSearch}
                      />
                    </div>
                  </div>

                  <div className="input-box">
                    <label htmlFor="studentName">Student Name:</label>
                    <input
                      disabled
                      type="text"
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                    />
                  </div>
                </div>

                <div className="fourth-row">
                  <div className="input-box">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter the description of the liability"
                      rows="4"
                    />
                  </div>
                </div>
                <div className="button-container">
                  <button className="btn-box" type="submit">
                    Submit
                  </button>
                </div>
              </form>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
          </div>
        </>
      )}

      {/* Popup for Confirm Status Update */}
      {popup.type === "check" && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup">
            <div className="popup-header">
              <h3>Confirm Liability Status Update</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <p>
                Do you want to update the liability status to "Paid" for{" "}
                {popup.record.student_name}?
              </p>
              <div className="button-container">
                <button
                  className="btn-box"
                  onClick={() => handleConfirmStatusUpdate(popup.record)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Popup for Delete Confirmation */}
      {popup.type === "delete" && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup">
            <div className="popup-header">
              <h3>Confirm Deletion</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <p>
                Are you sure you want to delete the liability for{" "}
                {popup.record.student_name}?
              </p>
              <div className="button-container">
                <button
                  className="btn-box"
                  onClick={() => handleDelete(popup.record)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="button-container-pagination-student">
        <div className="pagination-controls">
          <button
            className="btn-box-pagination-student"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn-box-pagination-student"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagLiabilities_Content;
