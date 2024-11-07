import React, { useState } from "react";
import "./Archive_Content.css";
import { BiSearch } from "react-icons/bi";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";

const Archive_ContentHeader = () => {
  const [showUnarchivePopup, setShowUnarchivePopup] = useState(false);

  const handleUnarchive = () => {
    setShowUnarchivePopup(true);
  };

  const handleClose = () => {
    setShowUnarchivePopup(false);
  };

  const handleConfirmUnarchive = () => {
    console.log("Logging out...");
    setShowUnarchivePopup(false);
    // Add navigation to login page here
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
            <FiFilter className="buttons-icon" onClick={handleUnarchive} />
          </div>
          <div className="buttons-act">
            <RiInboxUnarchiveLine
              className="buttons-icon"
              onClick={handleUnarchive}
            />
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
                    <p>Do you want to unarchive this account?</p>
                    <div class="buttons">
                      <button
                        type="submit"
                        class="btn-box"
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