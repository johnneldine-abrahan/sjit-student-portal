import React, { useState, useEffect } from "react";
import "./ManageAccounts_Content.css";
import ManageAccounts_ContentHeader from "./ManageAccounts_ContentHeader";
import { BiEditAlt } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";

const ManageAccounts_Content = () => {
  const [accountsRecords, setAccountsRecords] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]); // Track selected accounts
  const [selectAllChecked, setSelectAllChecked] = useState(false); // Track select all checkbox state
  const selectAllRef = React.createRef(); // Create a ref for the select-all checkbox
  const [popup, setPopup] = useState({
    show: false,
    record: null,
  });

  const [formData, setFormData] = useState({}); // For form data in edit pop-up

  // Fetch accounts from the backend when the component mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://localhost:3000/getAccounts");
        const data = await response.json();
        setAccountsRecords(data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  // Disable scrolling when pop-up is open
  useEffect(() => {
    if (popup.show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [popup]);

  // Function to add the new account to the top of the table
  const addNewAccount = (newAccount) => {
    setAccountsRecords((prevAccounts) => [newAccount, ...prevAccounts]);
  };

  // Handle selecting and deselecting accounts
  const handleSelectAccount = (userId) => {
    setSelectedAccounts((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    const newSelectAllChecked = !selectAllChecked;
    if (newSelectAllChecked) {
      setSelectedAccounts(accountsRecords.map((account) => account.user_id));
    } else {
      setSelectedAccounts([]);
    }
    setSelectAllChecked(newSelectAllChecked);
  };

  useEffect(() => {
    if (selectAllRef.current) {
      if (
        selectedAccounts.length > 0 &&
        selectedAccounts.length < accountsRecords.length
      ) {
        selectAllRef.current.indeterminate = true;
      } else {
        selectAllRef.current.indeterminate = false;
      }
    }
  }, [selectedAccounts, accountsRecords]);

  // Function to delete selected accounts
  const deleteSelectedAccounts = async () => {
    if (selectedAccounts.length === 0) {
      alert("No accounts selected for deletion.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/deleteAccounts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_ids: selectedAccounts }),
      });

      if (response.ok) {
        alert("Accounts deleted successfully!");

        // Remove deleted accounts from the table
        setAccountsRecords((prevAccounts) =>
          prevAccounts.filter(
            (account) => !selectedAccounts.includes(account.user_id)
          )
        );

        setSelectedAccounts([]); // Clear selected accounts
      } else {
        const errorResult = await response.json();
        console.error("Error deleting accounts:", errorResult);
        alert("Error deleting accounts: " + errorResult.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error while deleting accounts.");
    }
  };

  const handlePopup = (record) => {
    setPopup({
      show: true,
      record: record,
    });

    // Pre-fill the form with the selected account's data
    setFormData({
      first_name: record.first_name,
      middle_name: record.middle_name,
      last_name: record.last_name,
      user_role: record.user_role,
    });
  };

  const handleClose = () => {
    setPopup({
      show: false,
      record: null,
    });
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { first_name, middle_name, last_name, password } = formData;

    if (!first_name || !last_name || !password) {
      console.log("Please fill in all required fields");
      return;
    }

    const payload = {
      first_name,
      middle_name: middle_name || "", // Middle name is optional
      last_name,
      password,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/update-account/${popup.record.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Account updated successfully:", result);

        // Update the account in the table
        setAccountsRecords((prevRecords) =>
          prevRecords.map((account) =>
            account.user_id === popup.record.user_id
              ? { ...account, ...formData }
              : account
          )
        );

        alert("Account updated successfully!");
        setFormData({});
        handleClose();
      } else {
        const errorResult = await response.json();
        console.error("Error updating account:", errorResult);
        alert("Error updating account: " + errorResult.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error while updating account.");
    }
  };

  return (
    <div className="ManageAccounts_content">
      {/* Pass the addNewAccount and delete function as props */}
      <ManageAccounts_ContentHeader
        onNewAccount={addNewAccount}
        onDelete={deleteSelectedAccounts} // Pass the delete function to header
        selectedAccounts={selectedAccounts}
      />

      <div className="Accounts-records">
        <div className="recordslist-container">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    ref={selectAllRef}
                    checked={selectAllChecked}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>User ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>User Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {accountsRecords.map((record) => (
                <tr
                  key={record.user_id}
                  className={
                    selectedAccounts.includes(record.user_id) ? "checked" : ""
                  }
                >
                  <td>
                    <input
                      type="checkbox"
                      name={`select-${record.user_id}`}
                      checked={selectedAccounts.includes(record.user_id)}
                      onChange={() => handleSelectAccount(record.user_id)}
                    />
                  </td>
                  <td>{record.user_id}</td>
                  <td>{record.last_name}</td>
                  <td>{record.first_name}</td>
                  <td>{record.middle_name}</td>
                  <td>{record.user_role}</td>
                  <td>{record.status}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handlePopup(record)}
                      style={{ marginLeft: "10px" }}
                    >
                      <BiEditAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {popup.show && (
        <>
          <div className="popup-blurred-background" onClick={handleClose} />
          <div className="popup">
            <div className="popup-header">
              <h3>Edit Account</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <form onSubmit={handleSubmit}>
                <div className="first-row">
                  <div className="input-box">
                    <label>First Name:</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-box">
                    <label>Middle Name:</label>
                    <input
                      type="text"
                      name="middle_name"
                      value={formData.middle_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-box">
                    <label>Last Name:</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="second-row">
                  <div className="input-box">
                    <label>User Role:</label>
                    <input
                      type="text"
                      name="user_role"
                      value={formData.user_role}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-box">
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="button-container">
                  <div><button type="submit" className="btn-box">Done</button></div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageAccounts_Content;