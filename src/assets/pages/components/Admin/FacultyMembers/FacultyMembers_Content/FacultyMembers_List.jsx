import React from 'react'
import './FacultyMembers_Content.css'

const FacultyList = [
    {
        facultyID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        viewRecords: '!'
    },
    {
        facultyID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        viewRecords: '!'
    },
    {
        facultyID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        viewRecords: '!'
    },
    {
        facultyID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        viewRecords: '!'
    },
    
]

const FacultyMembers_List = () => {
  return (
    <div className='faculty-list'>
        <div className='recordslist-container'>
            {FacultyList.map((records) => (
                <div className='list'>
                <div className='faculty-details'>
                    <h3>{records.facultyID}</h3>
                </div>
                <span>{records.LastName}</span>
                <span>{records.FirstName}</span>
                <span>{records.MiddleName}</span>
                <span>{records.viewRecords}</span>
            </div>
            ))}
        </div>
      
    </div>
  )
}

export default FacultyMembers_List
