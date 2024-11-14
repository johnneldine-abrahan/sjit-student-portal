import React, { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./TagLiabilities_Content.css";
import TagLiabilities_ContentHeader from "./TagLiabilities_ContentHeader";

const TagLiabilities_Content = () => {
  const [studentLiabRecords, setStudentLiabRecords] = useState([]);
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

  // Fetch data from the API
  const fetchLiabilities = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-liability");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStudentLiabRecords(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLiabilities();
  }, []);

  return (
    <div className="tagliabilities-content">
      <TagLiabilities_ContentHeader refreshData={fetchLiabilities} />
      <div className="student-records">
        <div className="recordslist-container">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Liability</th>
                <th>School Year</th>
                <th>Semester</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentLiabRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.student_id}</td>
                  <td>{record.student_name}</td>
                  <td>{record.liability_description}</td>
                  <td>{record.school_year}</td>
                  <td>{record.semester}</td>
                  <td>{record.status}</td>
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