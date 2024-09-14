import React, { useState } from "react";
import './Admin_Students-Content.css'

const StudentRecords = [
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
    },
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
    },
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
    },
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
    },
]

const Admin_StudentsRecords = () => {
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
        <div className='student-records'>
            <div className='recordslist-container'>
                {StudentRecords.map((records) => (
                    <div className='list' key={records.studentID}>
                        <div className='students-details'>
                            <h3>{records.studentID}</h3>
                        </div>
                        <span>{records.LastName}</span>
                        <span>{records.FirstName}</span>
                        <span>{records.MiddleName}</span>
                        <span>{records.yearGraduated}</span>
                        <span className='view-details-link' onClick={() => handlePopup(records)}>View Details</span>
                    </div>
                ))}
            </div>

            {popup.show && (
                <div className='popup-blurred-background' onClick={handleClose} />
            )}
            {popup.show && (
                <div className='popup'>
                    <div className='popup-header'>
                        <h3>Student Details</h3>
                        <button onClick={handleClose}>Close</button>
                    </div>
                    <div className='popup-content'>
                        <p>Student ID: {popup.record.studentID}</p>
                        <p>Last Name: {popup.record.LastName}</p>
                        <p>First Name: {popup.record.FirstName}</p>
                        <p>Middle Name: {popup.record.MiddleName}</p>
                        <p>Year Graduated: {popup.record.yearGraduated}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Admin_StudentsRecords