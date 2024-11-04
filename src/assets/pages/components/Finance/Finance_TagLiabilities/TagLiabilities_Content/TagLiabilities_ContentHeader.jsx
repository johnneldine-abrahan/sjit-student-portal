import React, { useState } from "react";
import "./TagLiabilities_Content.css";
import { BiSearch } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";

const TagLiabilities_ContentHeader = () => {
  const [popup, setPopup] = useState({
    add: false,
    edit: false,
    delete: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handlePopup = (type) => {
    setPopup({ add: false, edit: false, delete: false, [type]: !popup[type] });
  };

  const handleClose = () => {
    setPopup({ add: false, edit: false, delete: false });
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submission logic here
    // If there's an error, setErrorMessage("Your error message");
    handleClose(); // Close the popup after submission
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
            <div className="buttons-act">
              <BiEditAlt
                className="buttons-icon"
                onClick={() => handlePopup("edit")}
              />
            </div>
            <div className="buttons-act">
              <RiDeleteBin6Line
                className="buttons-icon"
                onClick={() => handlePopup("delete")}
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
            {/* Popup content for adding liabilities */}
            <div className="popup-content">
              {/* Add form fields or content here */}
            </div>
          </div>
        </>
      )}

      {popup.edit && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup">
            <div className="popup-header">
              <h3>Edit Liabilities</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            {/* Popup content for editing liabilities */}
            <div className="popup-content">
              {/* Add form fields or content here */}
            </div>
          </div>
        </>
      )}

      {popup.delete && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup">
            <div className="popup-header">
              <h3>Delete Liabilities</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            {/* Popup content for deleting liabilities */}
            <div className="popup-content">
              {/* Add confirmation message or content here */}
            </div>
          </div>
        </>
      )}

      {errorMessage && (
        <div className="error-message" style={{ color: "red" }}>
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default TagLiabilities_ContentHeader;