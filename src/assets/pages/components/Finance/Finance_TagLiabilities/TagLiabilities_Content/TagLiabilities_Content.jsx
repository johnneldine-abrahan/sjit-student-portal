import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./TagLiabilities_Content.css";
import TagLiabilities_ContentHeader from "./TagLiabilities_ContentHeader";

const StudentLiabRecords = [
  {
    studentID: "21-05298",
    LastName: "Sanchez",
    FirstName: "Kim William",
    MiddleName: "Bacsa",
    yearGraduated: "2025",
    status: "Active",
  },
  {
    studentID: "21-05299",
    LastName: "Doe",
    FirstName: "John",
    MiddleName: "A.",
    yearGraduated: "2024",
    status: "Active",
  },
  {
    studentID: "21-05300",
    LastName: "Smith",
    FirstName: "Jane",
    MiddleName: "B.",
    yearGraduated: "2023",
    status: "Inactive",
  },
  {
    studentID: "21-05301",
    LastName: "Johnson",
    FirstName: "Emily",
    MiddleName: "C.",
    yearGraduated: "2022",
    status: "Active",
  },
];

const TagLiabilities_Content = () => {
  const [popup, setPopup] = useState({
    show: false,
    record: null,
  });

  const handlePopup = (record) => {
    setPopup({
      show: true,
      record: record,
    });
  };

  const handleClose = () => {
    setPopup({
      show: false,
      record: null,
    });
  };

  return (
    <div className="tagliabilities-content">
      <TagLiabilities_ContentHeader />
      <div className="student-records">
        <div className="recordslist-container">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Year Graduated</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {StudentLiabRecords.map((records, index) => (
                <tr key={index}>
                  <td>{records.studentID}</td>
                  <td>{records.LastName}</td>
                  <td>{records.FirstName}</td>
                  <td>{records.MiddleName}</td>
                  <td>{records.yearGraduated}</td>
                  <td>{records.status}</td>
                  <td>
                    <button className="edit-button-filter">
                      <BiEditAlt size={20} />
                    </button>
                    <button
                      className="edit-button-filter"
                      style={{ marginLeft: "10px" }}
                    >
                      <FaCheck size={20} />
                    </button>
                    <button
                      className="edit-button-filter"
                      style={{ marginLeft: "10px" }}
                    >
                      <RiDeleteBin6Line size={20} />
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

export default TagLiabilities_Content;