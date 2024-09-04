import React from "react";
import './Archive_Content.css'


const ArchiveRecords = [
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

const Archive_Records = () => {
    return (
        <div className='archive-records'>
            
            <div className='recordslist-container'>
                {ArchiveRecords.map((records) => (
                    <div className='list'>
                    <div className='announcement-details'>
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

export default Archive_Records
