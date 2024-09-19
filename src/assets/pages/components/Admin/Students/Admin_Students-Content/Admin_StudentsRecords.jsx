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
                <table>
                    <thead>
                        <tr>
                            <th>Select</th> {/* New column for checkbox */}
                            <th>Student ID</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Year Graduated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {StudentRecords.map((records, index) => (
                            <tr key={index}>
                                <td>
                                    <input type="checkbox" name={`select-${records.studentID}`} /> {/* Checkbox */}
                                </td>
                                <td>{records.studentID}</td>
                                <td>{records.LastName}</td>
                                <td>{records.FirstName}</td>
                                <td>{records.MiddleName}</td>
                                <td>{records.yearGraduated}</td>
                                <td>
                                    <span className='view-details-link' onClick={() => handlePopup(records)}>View Details</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

export default Admin_StudentsRecords;