import React, { useState, useEffect } from "react";
import "./ManageAccounts_Content.css";
import { BiSearch } from "react-icons/bi";

import {
  RiAddLargeFill,
  RiDeleteBin6Line,
  RiInboxUnarchiveLine,
} from "react-icons/ri";

const ManageAccounts_ContentHeader = ({
  onNewAccount,
  onDelete,
  onArchive, // Function to handle archiving accounts
  selectedAccounts,
}) => {
  const [popup, setPopup] = useState({
    add: false,
    edit: false,
    delete: false,
    archive: false, // State for archive popup
  });

  const handleDelete = (selectedAccounts) => {
    onDelete(selectedAccounts);
  };

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (formData) => {
    const requiredFields = ["last_name", "first_name", "user_role"];
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
      archive: false, // Reset archive popup state
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      return;
    }

    const { first_name, middle_name, last_name, user_role } = formData;
    const payload = {
      first_name,
      middle_name: middle_name || "", // Optional
      last_name,
      user_role,
    };

    try {
      const response = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/registerAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        const newAccount = {
          user_id: result.user_id,
          first_name: formData.first_name,
          middle_name: formData.middle_name || "",
          last_name: formData.last_name,
          user_role: formData.user_role,
          status: result.status || "Active"
        };

        onNewAccount(newAccount);
        alert("Account registered successfully!");
        setFormData({});
        handleClose();
      } else {
        const errorResult = await response.json();
        alert("Error registering account: " + errorResult.message);
      }
    } catch (error) {
      alert("Network error while registering account.");
    }
  };

  // Handle Archive
  const handleArchive = () => {
    if (selectedAccounts.length > 0) {
      onArchive(selectedAccounts);
      handleClose();
    } else {
      alert(
        "No selected accounts to archive. Please select at least one account."
      );
    }
  };

  // Disable scrolling when modal is open
  useEffect(() => {
    if (popup.add || popup.edit || popup.delete || popup.archive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [popup]);

  return (
    <div className="manage-accounts-header">
      <h1 className="header-title">Manage Accounts</h1>
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
        </div>
      </div>

      {/* Add Account Popup */}
      {popup.add && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup">
            <div className="popup-header">
              <h3>Add Account</h3>
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

                <div className="second-row">
                  <div className="input-box">
                    <label>
                      User Role
                      <select
                        name="user_role"
                        value={formData.user_role}
                        onChange={handleChange}
                      >
                        <option value=""></option>
                        <option value="Finance">Finance</option>
                        <option value="Registrar">Registrar</option>
                      </select>
                    </label>
                  </div>
                </div>

                {errorMessage && (
                  <div style={{ color: "red" }}>{errorMessage}</div>
                )}

                <div class="buttons">
                  <button type="submit" class="btn-box" name="add" id="add">
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Delete Account Popup */}
      {popup.delete && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup">
            <div className="popup-header">
              <h3>Delete Account</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              {selectedAccounts?.length > 0 ? (
                <p>
                  Are you sure you want to delete the selected account? This
                  action is cannot be undone.
                </p>
              ) : (
                <p>
                  No selected account. Please select at least one account to
                  delete.
                </p>
              )}
              <div className="buttons">
                {selectedAccounts?.length > 0 && (
                  <button
                    type="submit"
                    class="btn-box"
                    name="delete"
                    id="delete"
                    onClick={() => {
                      handleDelete(selectedAccounts);
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

      {/* Archive Account Popup */}
      {popup.archive && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup">
            <div className="popup-header">
              <h3>Archive Account</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              {selectedAccounts?.length > 0 ? (
                <p>
                  Are you sure you want to archive the selected account? This
                  action is cannot be undone.
                </p>
              ) : (
                <p>
                  No selected account. Please select at least one account to
                  archive.
                </p>
              )}
              <div className="buttons">
                {selectedAccounts?.length > 0 && (
                  <button
                    type="submit"
                    class="btn-box"
                    name="archive"
                    id="archive"
                    onClick={handleArchive}
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
  );
};

export default ManageAccounts_ContentHeader;