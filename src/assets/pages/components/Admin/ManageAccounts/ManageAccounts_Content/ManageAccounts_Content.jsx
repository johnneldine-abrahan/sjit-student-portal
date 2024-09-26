import React, { useState } from "react";
import "./ManageAccounts_Content.css";
import ManageAccounts_ContentHeader from "./ManageAccounts_ContentHeader";

const AccountsRecords = [
  {
    studentID: "21-05298",
    LastName: "Sanchez",
    FirstName: "Kim William",
    MiddleName: "Bacsa",
    yearGraduated: "2025",
    status: "Active",
  },
  {
    studentID: "21-05298",
    LastName: "Sanchez",
    FirstName: "Kim William",
    MiddleName: "Bacsa",
    yearGraduated: "2025",
    status: "Active",
  },
  {
    studentID: "21-05298",
    LastName: "Sanchez",
    FirstName: "Kim William",
    MiddleName: "Bacsa",
    yearGraduated: "2025",
    status: "Active",
  },
  {
    studentID: "21-05298",
    LastName: "Sanchez",
    FirstName: "Kim William",
    MiddleName: "Bacsa",
    yearGraduated: "2025",
    status: "Active",
  },
];
const ManageAccounts_Content = () => {
  return (
    <div className="ManageAccounts_content">
      <ManageAccounts_ContentHeader />

      <div className="Accounts-records">
        <div className="recordslist-container">
          <table>
            <thead>
              <tr>
                <th>Select</th> {/* New column for checkbox */}
                <th>Student ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Year Graduated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {AccountsRecords.map((records, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      name={`select-${records.studentID}`}
                    />{" "}
                    {/* Checkbox */}
                  </td>
                  <td>{records.studentID}</td>
                  <td>{records.LastName}</td>
                  <td>{records.FirstName}</td>
                  <td>{records.MiddleName}</td>
                  <td>{records.yearGraduated}</td>
                  <td>
                    <span
                      className="view-details-link"
                      onClick={() => handlePopup(records)}
                    >
                      View Details
                    </span>
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