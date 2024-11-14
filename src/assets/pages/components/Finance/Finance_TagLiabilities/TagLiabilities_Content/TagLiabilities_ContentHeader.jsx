import React, { useState, useEffect } from "react";
import "./TagLiabilities_Content.css";
import { BiSearch } from "react-icons/bi";
import { RiAddLargeFill } from "react-icons/ri";
import axios from "axios";

const TagLiabilities_ContentHeader = ({ refreshData }) => {
  const [popup, setPopup] = useState({
    add: false,
    edit: false,
    delete: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [schoolYears, setSchoolYears] = useState([]);
  const [formData, setFormData] = useState({
    schoolYear: "",
    semester: "",
    studentIDInput: "",
    additionalInput: "",
    comments: "",
    studentName: "",
    description: "",
  });

  useEffect(() => {
    const fetchSchoolYears = async () => {
      try {
        const response = await axios.get('http://localhost:3000/liab/school_years');
        setSchoolYears(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching school years:', error);
        setErrorMessage("Failed to load school years.");
      }
    };

    fetchSchoolYears();
  }, []);

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
      studentName: "",
      description: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async () => {
    const studentID = formData.studentIDInput.trim();
    if (studentID) {
      try {
        const response = await axios.get(`http://localhost:3000/search-student/${studentID}`);
        setFormData({ ...formData, studentName: response.data.full_name });
      } catch (error) {
        console.error('Error fetching student:', error);
        setErrorMessage("Student not found or not enrolled.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/add-liability', {
        liability_description: formData.description,
        student_id: formData.studentIDInput,
        student_name: formData.studentName,
        school_year: formData.schoolYear,
        semester: formData.semester,
      });

      console.log('Liability added:', response.data);
      handleClose(); // Close the popup after successful submission
      refreshData(); // Refresh the liability list after adding a new liability
    } catch (error) {
      console.error('Error adding liability:', error);
      setErrorMessage("Failed to add liability. Please try again.");
    }
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
                      id="schoolYear"
                      name="schoolYear"
                      value={formData.schoolYear}
                      onChange={handleInputChange}
                      required
                    >
                      <option value=""></option>
                      {schoolYears.map((year) => (
                        <option key={year.school_year} value={year.school_year}>
                          {year.school_year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-box">
                    <label htmlFor="semester">Semester:</label>
                    <select
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
                        type="text"
                        id="studentIDInput"
                        name="studentIDInput"
                        value={formData.studentIDInput}
                        onChange={handleInputChange}
                        placeholder="Search here..."
                      />
                      <BiSearch className="search-icon-filter" size={"22px"} onClick={handleSearch} />
                    </div>
                  </div>

                  <div className="input-box">
                    <label htmlFor="studentName">Student Name:</label>
                    <input
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
    </>
  );
};

export default TagLiabilities_ContentHeader;