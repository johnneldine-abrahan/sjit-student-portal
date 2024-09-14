import React, { useState } from 'react'
import './FacultyMembers_Content.css'

const FacultyList = [
    {
        facultyID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        viewRecords: 'View Details'
    },
    {
        facultyID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        viewRecords: 'View Details'
    },
    {
        facultyID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        viewRecords: 'View Details'
    },
    {
        facultyID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        viewRecords: 'View Details'
    },

]

const FacultyMembers_List = () => {
  const [popup, setPopup] = useState({
    show: false,
    faculty: null,
  });

  const handlePopup = (faculty) => {
    setPopup({
      show: true,
      faculty: faculty,
    });
  };

  const handleClose = () => {
    setPopup({
      show: false,
      faculty: null,
    });
  };

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
                <span className='view-details-link' onClick={() => handlePopup(records)}>View Details</span>
            </div>
            ))}
        </div>

        {popup.show && (
          <div className='popup-blurred-background' onClick={handleClose}>
            <div className='popup-container'>
              <div className='popup'>
                <div className='popup-header'>
                  <h3>Faculty Details</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className='popup-content'>
                  <p>Faculty ID: {popup.faculty.facultyID}</p>
                  <p>Last Name: {popup.faculty.LastName}</p>
                  <p>First Name: {popup.faculty.FirstName}</p>
                  <p>Middle Name: {popup.faculty.MiddleName}</p>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default FacultyMembers_List