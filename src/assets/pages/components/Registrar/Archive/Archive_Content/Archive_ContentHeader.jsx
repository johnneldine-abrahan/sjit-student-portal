import React, { useState } from "react";
import "./Archive_Content.css";
import { BiSearch } from "react-icons/bi";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";

const Archive_ContentHeader = () => {
  const [showUnarchivePopup, setShowUnarchivePopup] = useState(false);
  const [showArchiveFilter, setShowArchiveFilter] = useState(false);
  const [formData, setFormData] = useState({ student_status: "" }); // Initialize formData state

  const handleUnarchive = () => {
    setShowUnarchivePopup(true);
  };

  const handleArchiveFilter = () => {
    setShowArchiveFilter(true);
  };

  const handleClose = () => {
    setShowUnarchivePopup(false);
    setShowArchiveFilter(false);
  };

  const handleConfirmUnarchive = () => {
    setShowUnarchivePopup(false);
    // Add navigation to login page here
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="archive-header">
      <h1 className="header-title">Archive</h1>
      <div className="archive-activity">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <BiSearch className="search-icon" />
        </div>
        <div className="buttons-header">
          <div className="buttons-act">
            <FiFilter className="buttons-icon" onClick={handleArchiveFilter} />
          </div>
          <div className="buttons-act">
            <RiInboxUnarchiveLine
              className="buttons-icon"
              onClick={handleUnarchive}
            />
            {showArchiveFilter && (
              <>
                <div className="popup-blurred-background" />
                <div className="modal-logout">
                  <div className="modalHeader">
                    <h3 className="modalTitle">Filter</h3>
                    <button className="modalCloseButton" onClick={handleClose}>
                      Close
                    </button>
                  </div>
                  <div className="popup-content">
                    <p>
                      Please select the archive type of the student(s) to filter
                    </p>
                    <div className="buttons">
                      <select
                        className="form-select"
                        aria-label="Select Archive Type"
                        name="student_status"
                        value={formData.student_status}
                        onChange={handleChange}
                      >
                        <option value=""></option>
                        <option value="Dropped">Dropped</option>
                        <option value="Transferred">Transferred</option>
                        <option value="Graduated">Graduated</option>
                        <option value="Completer">Completer</option>
                      </select>
                      <button
                        type="button"
                        className="btn-box-archive"
                        name="archive"
                        id="archive"
                        onClick={handleArchiveFilter}
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {showUnarchivePopup && (
              <>
                <div className="popup-blurred-background" />
                <div className="modal-logout">
                  <div className="modalHeader">
                    <h3 className="modalTitle">Unarchive</h3>
                    <button className="modalCloseButton" onClick={handleClose}>
                      Close
                    </button>
                  </div>
                  <div className="popup-content">
                    <p>Do you want to unarchive the selected Student?</p>
                    <div className="buttons">
                      <button
                        type="submit"
                        className="btn-box"
                        name="add"
                        id="add"
                        onClick={handleConfirmUnarchive}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archive_ContentHeader;