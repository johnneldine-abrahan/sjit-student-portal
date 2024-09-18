import React from "react";
import "./ManageSchedule_Content.css";

const SectionList = [
  {
    yearLevel: "Grade 7",
    section: "Masikap",
    slots: "35",
    semester: "FIRST",
    subject: "0/9",
    add: "Add Subjects",
  },
  {
    yearLevel: "Grade 8",
    section: "Milflores",
    slots: "35",
    semester: "FIRST",
    subject: "0/9",
    add: "Add Subjects",
  },
  {
    yearLevel: "Grade 9",
    section: "Luna",
    slots: "35",
    semester: "FIRST",
    subject: "0/9",
    add: "Add Subjects",
  },
  {
    yearLevel: "Grade 10",
    section: "Guijo",
    slots: "35",
    semester: "FIRST",
    subject: "0/9",
    add: "Add Subjects",
  },
];

const ManageSchedule_Sections = () => {
  return (
    <div className="section-list">
      <div className="recordslist-container">
        <table>
          <thead>
            <tr>
              <th>Year Level</th>
              <th>Section</th>
              <th>Slots</th>
              <th>Semester</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {SectionList.map((records) => (
              <tr key={records.section}>
                <td>{records.yearLevel}</td>
                <td>{records.section}</td>
                <td>{records.slots}</td>
                <td>{records.semester}</td>
                <td>{records.subject}</td>
                <td>
                  <span className="add-subject-link">{records.add}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSchedule_Sections;