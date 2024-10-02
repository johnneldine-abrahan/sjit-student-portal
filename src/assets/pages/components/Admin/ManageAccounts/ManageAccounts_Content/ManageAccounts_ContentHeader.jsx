import React, { useState, useEffect } from "react";
import "./ManageAccounts_Content.css";
import { BiSearch } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";

const ManageAccounts_ContentHeader = ({ onNewAccount, onDelete }) => {
  const [popup, setPopup] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePopup = (type) => {
    setPopup((prevPopup) => ({ ...prevPopup, [type]: !prevPopup[type] }));
  };

  const handleClose = () => {
    setPopup({
      add: false,
      edit: false,
      delete: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { first_name, middle_name, last_name, user_role } = formData;

    if (!first_name || !last_name || !user_role) {
      console.log("Please fill in all required fields");
      return;
    }

    const payload = {
      first_name,
      middle_name: middle_name || "", // Optional
      last_name,
      user_role,
    };

    try {
      const response = await fetch("http://localhost:3000/registerAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Account registered successfully:", result);

        const newAccount = {
          user_id: result.user_id,
          first_name: formData.first_name,
          middle_name: formData.middle_name || "",
          last_name: formData.last_name,
          user_role: formData.user_role,
        };

        onNewAccount(newAccount);

        alert("Account registered successfully!");
        setFormData({});
        handleClose();
      } else {
        const errorResult = await response.json();
        console.error("Error registering account:", errorResult);
        alert("Error registering account: " + errorResult.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error while registering account.");
    }
  };

  // Disable scrolling when modal is open
  useEffect(() => {
    if (popup.add || popup.edit || popup.delete) {
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

          {/* Add Pop-up */}
          {popup.add && (
            <>
              <div className='popup-blurred-background' onClick={handleClose} />
              <div className='popup'>
                <div className='popup-header'>
                  <h3>Add Account</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className='popup-content'>
                  <form onSubmit={handleSubmit}>
                    <div className='first-row'>
                        <div className='input-box'>
                          <label>Last Name<input type="text" name="last_name" value={formData.last_name} onChange={handleChange} /></label>
                        </div>
                        <div className='input-box'>
                          < label>First Name<input type="text" name="first_name" value={formData.first_name} onChange={handleChange} /></label>
                        </div>
                        <div className='input-box'>
                          <label>Middle Name<input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange} /></label>
                        </div>
                      </div>

                      <div className='second-row'>
                        <div className='input-box'>
                          <label>User Role
                            <select name="user_role" value={formData.user_role} onChange={handleChange}>
                              <option value=""></option>
                              <option value="Finance">Finance</option>
                              <option value="Registrar">Registrar</option>
                            </select>
                          </label>
                      </div>
                      </div>

                    <div class='buttons'>
                      <button type="submit" class="btn-box" name="add" id="add">Done</button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}

          {/* Delete Pop-up */}
          {popup.delete && (
            <>
              <div className='popup-blurred-background' onClick={handleClose} />
              <div className='popup'>
                <div className='popup-header'>
                  <h3>Delete Account</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className='popup-content'>
                  <p>Are you sure you want to delete the selected account? This action is cannot be undone.</p>
                  <div className='buttons'>
                    <button type="submit" class="btn-box" name="delete" id="delete" onClick={() => {onDelete(); handleClose();}}>Delete</button>
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

export default ManageAccounts_ContentHeader;