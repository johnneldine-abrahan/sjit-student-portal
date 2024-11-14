import React, { useState } from "react";
import "./TagLiabilities_Content.css";
import { BiSearch } from "react-icons/bi";
import { RiAddLargeFill } from "react-icons/ri";

const TagLiabilities_ContentHeader = () => {
  const [popup, setPopup] = useState({
    add: false,
    edit: false,
    delete: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    schoolYear: "",
    semester: "",
    studentIDInput: "",
    additionalInput: "", // New input field
    comments: "",
    studentName: "", // Initialize studentName
    description: "", // Initialize description
  });

  // Sample student IDs for searching
  const studentIDs = ["12345", "67890", "54321", "09876", "11223"];
  const [filteredStudentIDs, setFilteredStudentIDs] = useState([]);

  const handlePopup = (type) => {
    setPopup({ add: false, edit: false, delete: false, [type]: !popup[type] });
  };

  const handleClose = () => {
    setPopup({ add: false, edit: false, delete: false });
    setErrorMessage("");
    setFormData({
      schoolYear: "",
      semester: "",
      studentIDInput: "",
      additionalInput: "",
      comments: "",
      studentName: "", // Reset studentName
      description: "", // Reset description
    });
    setFilteredStudentIDs([]); // Clear filtered results on close
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = () => {
    const searchTerm = formData.studentIDInput.trim();
    if (searchTerm) {
      const results = studentIDs.filter((id) => id.includes(searchTerm));
      setFilteredStudentIDs(results);
    } else {
      setFilteredStudentIDs([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleClose();
  };

  return (
    <>
      <div className="tagliabilities-header">
        <h1 className="header-title">Tag Liabilities</h1>
        <div className="tagliabilities-activity">
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <BiSearch className="search-icon" />
          </div>
          <div className="buttons-header">
            <div className="buttons-act">
              <RiAddLargeFill
                className="buttons-icon"
                onClick={() => handlePopup("add")}
              />
            </div>
          </div>
        </div>
      </div>

      {popup.add && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup">
            <div className="popup-header">
              <h3>Add Liabilities</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <form onSubmit={handleSubmit}>
                <div className="first-row">
                  <div className="input-box">
                    <label htmlFor="schoolYear">School Year:</label>
                    <select
                      name="schoolYear"
                      value={formData.schoolYear}
                      onChange={handleInputChange}
                      required
                    >
                      <option value=""></option>
                      <option value="2023-2024">2023-2024</option>
                      <option value="2024-2025">2024-2025</option>
                    </select>
                  </div>

                  <div className="input-box">
                    <label htmlFor="semester">Semester:</label>
                    <select
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
                    <label htmlFor="searchBox">Search:</label>
                    <div className="search-container">
                      <input type="text" placeholder="Search here..." />
                      <BiSearch className="search-icon-filter" size={"22px"}/>
                    </div>
                  </div>

                  <div className="input-box">
                    <label htmlFor="studentName">Student Name:</label>
                    <input
                      type="text"
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TagLiabilities_ContentHeader;