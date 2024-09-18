import React from 'react';
import './StudentList.css';


const StudentRecords = [
  {
      GradeLevel: '6',
      Section: 'Sanchez',
      Subject: 'Kim William',
      NumOfStudents: '12',

  },
  {
    GradeLevel: '6',
    Section: 'Sanchez',
    Subject: 'Kim William',
    NumOfStudents: '12',

},
{
  GradeLevel: '6',
  Section: 'Sanchez',
  Subject: 'Kim William',
  NumOfStudents: '12',

},


]

const StudentList = () => {
  return (
    <div>
      <table className="student-table">
  <thead>
    <tr>
      <th>Grade Level</th>
      <th>Section</th>
      <th>Subject</th>
      <th>Number of Students</th>

      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {StudentRecords.map((records, index) => (
      <tr key={index}>
        <td>{records.GradeLevel}</td>
        <td>{records.Section}</td>
        <td>{records.Subject}</td>
        <td>{records.NumOfStudents}</td>

        <td><span className='view-details-link' onClick={() => handlePopup(records)}>View Details</span></td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  )
}

export default StudentList