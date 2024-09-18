import React, {useState} from 'react'
import './Grades_Students.css'

const GradeItem = ({ subject, instructor, units, grade }) => {
  return (
    <div className="grade-item">
      <div className="grade-details">
        <h4>{subject}</h4>
        <p>{instructor} - {units} units</p>
      </div>
      <div className="grade-score">
        <span>{grade}</span>
        <span className="status">&#10003;</span> {/* Checkmark */}
      </div>
    </div>
  );
};


const GradeList = ({ grades }) => {
  return (
    <div className="grade-list">
      {grades.map((grade, index) => (
        <GradeItem
          key={index}
          subject={grade.subject}
          instructor={grade.instructor}
          units={grade.units}
          grade={grade.grade}
        />
      ))}
    </div>
  );
};


const Grades_Students = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'table'

  const grades = [
    { subject: "BAT 403 - Fundamentals of Enterprise Data Management", instructor: "RAMOS, DEAN CHARLEMAGNE F.", units: 3, grade: "2.00" },
    { subject: "BAT 404 - Analytic Techniques and Tools", instructor: "MENDOZA, ARJONE M.", units: 3, grade: "2.00" },
    { subject: "IT 321 - Human-Computer Interaction", instructor: "MARASIGAN, KIMBERLY I.", units: 3, grade: "2.25" },
    { subject: "IT 322 - Advanced Systems Integration and Architecture", instructor: "BALMES, JOSEPH ADRIAN F.", units: 3, grade: "1.75" },
    { subject: "IT 323 - Information Assurance and Security", instructor: "DAÑO, GERALD JAMES O.", units: 3, grade: "1.25" },
    { subject: "IT 324 - Capstone Project I", instructor: "CAÑIZADA, JEFFERSON L.", units: 3, grade: "1.25" },
    { subject: "IT 325 - IT Project Management", instructor: "REYES, GLYDEL ANN E.", units: 3, grade: "1.25" }
  ];

  return (
    <div className="grade-view-container">
    <div className="view-toggle">
      <button className="left" onClick={() => setViewMode('list')}>List View</button>
      <button className="right" onClick={() => setViewMode('table')}>Table View</button>
    </div>

    {viewMode === 'list' ? (
      <GradeList grades={grades} />
    ) : (
      <table className="grade-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Instructor</th>
            <th>Units</th>
            <th>Grade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={index}>
              <td>{grade.subject}</td>
              <td>{grade.instructor}</td>
              <td>{grade.units}</td>
              <td>{grade.grade}</td>
              <td>&#10003;</td> {/* Checkmark */}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  )
}

export default Grades_Students