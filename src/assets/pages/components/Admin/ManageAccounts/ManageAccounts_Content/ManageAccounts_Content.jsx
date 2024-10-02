import React, { useState, useEffect } from "react";
import "./ManageAccounts_Content.css";
import ManageAccounts_ContentHeader from "./ManageAccounts_ContentHeader";
import { BiEditAlt } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";

const ManageAccounts_Content = () => {
  const [accountsRecords, setAccountsRecords] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]); // Track selected accounts

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

  return (
    <div className="ManageAccounts_content">
      {/* Pass the addNewAccount and delete function as props */}
      <ManageAccounts_ContentHeader
        onNewAccount={addNewAccount}
        onDelete={deleteSelectedAccounts} // Pass the delete function to header
      />

      <div className="Accounts-records">
        <div className="recordslist-container">
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Student ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>User Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {accountsRecords.map((record) => (
                <tr key={record.user_id}>
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
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(record)}
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
    </div>
  );
};

export default ManageAccounts_Content;