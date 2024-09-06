import React from "react";
import './Admin_Students-Content.css'


const StudentRecords = [
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
        viewRecords: '!'
    },
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
        viewRecords: '!'
    },
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
        viewRecords: '!'
    },
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
        viewRecords: '!'
    },
    
]

const Admin_StudentsRecords = () => {
    return (
        <div className='student-records'>
            
            <div className='recordslist-container'>
                {StudentRecords.map((records) => (
                    <div className='list'>
                    <div className='students-details'>
                      <h3>{records.studentID}</h3>
                    </div>
                    <span>{records.LastName}</span>
                    <span>{records.FirstName}</span>
                    <span>{records.MiddleName}</span>
                    <span>{records.yearGraduated}</span>
                    <span>{records.viewRecords}</span>
                  </div>
                ))}
            </div>
          
        </div>
      )
}

export default Admin_StudentsRecords
