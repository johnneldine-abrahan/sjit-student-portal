import React, { useState } from "react";
import "./TagLiabilities_Content.css";
import TagLiabilities_ContentHeader from "./TagLiabilities_ContentHeader";


const StudentLiabRecords = [
  {
      studentID: '21-05298',
      LastName: 'Sanchez',
      FirstName: 'Kim William',
      MiddleName: 'Bacsa',
      yearGraduated: '2025',
      status:'Active',
  },
  {
      studentID: '21-05298',
      LastName: 'Sanchez',
      FirstName: 'Kim William',
      MiddleName: 'Bacsa',
      yearGraduated: '2025',
      status:'Active',
  },
  {
      studentID: '21-05298',
      LastName: 'Sanchez',
      FirstName: 'Kim William',
      MiddleName: 'Bacsa',
      yearGraduated: '2025',
      status:'Active',
  },
  {
      studentID: '21-05298',
      LastName: 'Sanchez',
      FirstName: 'Kim William',
      MiddleName: 'Bacsa',
      yearGraduated: '2025',
      status:'Active',
  },
]

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
                <th>Select</th> {/* New column for checkbox */}
                <th>Student ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Year Graduated</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {StudentLiabRecords.map((records, index) => (
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
                  <td>{records.status}</td>
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