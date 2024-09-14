import React, { useState } from 'react';
import './Archive_Content.css';

const ArchiveRecords = [
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
        viewRecords: 'View Details'
    },
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
        viewRecords: 'View Details'
    },
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
        viewRecords: 'View Details'
    },
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
        viewRecords: 'View Details'
    },

];

const Archive_Records = () => {
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
                        <span className='view-details-link' onClick={() => handlePopup(records)}>View Details</span>
                    </div>
                ))}
            </div>

            {popup.show && (
                <div className='popup-blurred-background' onClick={handleClose}>
                    <div className='popup-container'>
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default Archive_Records;