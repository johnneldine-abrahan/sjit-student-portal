import React, { useState } from "react";
import "./Archive_Content.css";
import { BiSearch } from "react-icons/bi";
import { RiInboxUnarchiveLine } from "react-icons/ri";

const Archive_ContentHeader = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const handleClose = () => {
    setShowLogoutPopup(false);
  };

  const handleConfirmLogout = () => {
    console.log('Logging out...');
    setShowLogoutPopup(false);
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
        <div className="buttons-act">
          <RiInboxUnarchiveLine
            className="buttons-icon"
            onClick={handleLogout}
          />
          {showLogoutPopup && (
            <>
              <div className="popup-blurred-background" />
              <div className='modal-logout'>
                <div className='modalHeader'>
                  <h3 className='modalTitle'>Unarchive</h3>
                  <button className='modalCloseButton' onClick={handleClose}>Close</button>
                </div>
                <div className='modalBody'>
                  <p></p>
                  <div class='buttons'>
                    <button type="submit" class="btn-box" name="add" id="add" onClick={handleConfirmLogout}>Done</button>
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

export default Archive_ContentHeader;