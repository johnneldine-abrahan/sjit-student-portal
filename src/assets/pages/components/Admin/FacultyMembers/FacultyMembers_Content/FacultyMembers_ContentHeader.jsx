import React, { useState } from "react";
import "./FacultyMembers_Content.css";
import { BiSearch } from "react-icons/bi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";
import { RiInboxUnarchiveLine } from "react-icons/ri";

const FacultyMembers_ContentHeader = ({
  updateFacultyRecords,
  onDelete,
  selectedFacultyIds,
}) => {
  const [popup, setPopup] = useState({
    add: false,
    edit: false,
    delete: false,
    archive: false,
  });

  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    middle_name: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (formData) => {
    const requiredFields = ["last_name", "first_name"];

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

    if (!isValid) {
      firstErrorInput.focus();
      //setErrorMessage(errorMessage);
      return false;
    }

    return true;
  };

  const handlePopup = (type) => {
    setPopup((prevPopup) => ({ ...prevPopup, [type]: !prevPopup[type] }));
  };

  const handleClose = () => {
    setPopup({
      add: false,
      edit: false,
      delete: false,
      archive: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    const adjustedData = { ...formData };

    try {
      const response = await fetch("http://localhost:3000/registerFaculty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adjustedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Failed to register faculty: ${errorText || "Unknown error"}`);
        return;
      }

      alert("Faculty successfully registered!");

      const updatedResponse = await fetch("http://localhost:3000/faculties");
      const updatedRecords = await updatedResponse.json();
      await updateFacultyRecords(updatedRecords); // Call the passed function to refresh the faculty list

      setFormData({
        last_name: "",
        first_name: "",
        middle_name: "",
      });

      setPopup({ add: false });
    } catch (error) {
      alert("Network error: Failed to reach the server.");
    }
  };

  return (
    <div className="facultymembers-header">
      <h1 className="header-title">Faculty Members</h1>
      <div className="facultymembers-activity">
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
          <div className="buttons-act">
            <RiDeleteBin6Line
              className="buttons-icon"
              onClick={() => handlePopup("delete")}
            />
          </div>
          <div className="buttons-act">
            <RiInboxUnarchiveLine
              className="buttons-icon"
              onClick={() => handlePopup("archive")}
            />
          </div>

          {/* Add Pop-up */}
          {popup.add && (
            <>
              <div className="popup-blurred-background" onClick={handleClose} />
              <div className="popup">
                <div className="popup-header">
                  <h3>Add Teacher</h3>
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

                    {errorMessage && (
                      <div className="error-message">{errorMessage}</div>
                    )}

                    <div className="buttons">
                      <button type="submit" class="btn-box" name="add" id="add">
                        Done
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}

          {/* Delete Pop-up */}
          {popup.delete && (
            <>
              <div className="popup-blurred-background" onClick={handleClose} />
              <div className="popup">
                <div className="popup-header">
                  <h3>Delete Teacher</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className="popup-content">
                  {selectedFacultyIds.length > 0 ? (
                    <p>
                      Are you sure you want to delete the selected teacher? This
                      action is cannot be undone.
                    </p>
                  ) : (
                    <p>
                      No selected faculty member. Please select at least one
                      faculty member to delete.
                    </p>
                  )}
                  <div className="buttons">
                    {selectedFacultyIds.length > 0 && (
                      <button
                        type="submit"
                        class="btn-box"
                        name="delete"
                        id="delete"
                        onClick={() => {
                          onDelete();
                          handleClose();
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Archive Pop-up */}
          {popup.archive && (
            <>
              <div className="popup-blurred-background" onClick={handleClose} />
              <div className="popup">
                <div className="popup-header">
                  <h3>Archive Teacher</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className="popup-content">
                  {selectedFacultyIds.length > 0 ? (
                    <p>Do you want to archive the selected teacher?</p>
                  ) : (
                    <p>
                      No selected faculty member. Please select at least one
                      faculty member to archive.
                    </p>
                  )}

                  <div className="buttons">
                    {selectedFacultyIds.length > 0 && (
                      <button
                        type="submit"
                        class="btn-box"
                        name="archive"
                        id="archive"
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
      </div>
    </div>
  );
};

export default FacultyMembers_ContentHeader;