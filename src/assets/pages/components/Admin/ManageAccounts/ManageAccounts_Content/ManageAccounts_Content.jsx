import React, { useState, useEffect } from "react";
import "./ManageAccounts_Content.css";
import ManageAccounts_ContentHeader from "./ManageAccounts_ContentHeader";
import { BiEditAlt } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";

const ManageAccounts_Content = () => {
  const [accountsRecords, setAccountsRecords] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const selectAllRef = React.createRef();
  const [popup, setPopup] = useState({
    show: false,
    record: null,
  });
  const [formData, setFormData] = useState({});

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

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

  const addNewAccount = (newAccount) => {
    setAccountsRecords((prevAccounts) => [newAccount, ...prevAccounts]);
  };

  const handleSelectAccount = (userId) => {
    setSelectedAccounts((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

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

        setAccountsRecords((prevAccounts) =>
          prevAccounts.filter(
            (account) => !selectedAccounts.includes(account.user_id)
          )
        );

        setSelectedAccounts([]);
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
      middle_name: middle_name || "",
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

  // Calculate the accounts to display based on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = accountsRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(accountsRecords.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="ManageAccounts_content">
      <ManageAccounts_ContentHeader
        onNewAccount={addNewAccount}
        onDelete={deleteSelectedAccounts}
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
              {currentRecords.map((record) => (
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
                      name=" first_name"
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
                  <div>
                    <button type="submit" className="btn-box">
                      Done
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      <div className="button-container-pagination-student">
        <div className="pagination-controls">
          <button
            className="btn-box-pagination-student"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn-box-pagination-student"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageAccounts_Content;