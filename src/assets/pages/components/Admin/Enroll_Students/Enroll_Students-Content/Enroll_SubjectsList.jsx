import React from "react";
import "./Enroll_Students_Content.css";

const subjectList = [
  {
    subjectID: "FILI-9",
    subjectName: "Filipino 9",
    semester: "FIRST",
  },
  {
    subjectID: "ENG-9",
    subjectName: "English 9",
    semester: "FIRST",
  },
  {
    subjectID: "MATH-9",
    subjectName: "Mathematics 9",
    semester: "FIRST",
  },
  {
    subjectID: "SCI-9",
    subjectName: "Science 9",
    semester: "FIRST",
  },
  {
    subjectID: "AP-9",
    subjectName: "Araling Panlipunan 9",
    semester: "FIRST",
  },
];

const Enroll_SubjectsList = () => {
  return (
    <div className="subject-list">
      <table>
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Subject Name</th>
            <th>Semester</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjectList.map((records) => (
            <tr key={records.subjectID}>
              <td>{records.subjectID}</td>
              <td>{records.subjectName}</td>
              <td>{records.semester}</td>
              <td>
                <span
                  className="view-details-link"
                  onClick={() => handlePopup(records)}
                >
                  Add Subject
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Enroll_SubjectsList;