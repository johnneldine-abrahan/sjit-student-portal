import React, { useState } from "react";
import './FacultyMembers_Content.css';

const FacultyMembers_List = ({ onSelectFaculty, selectedFacultyIds, facultyRecords }) => {
    const [popup, setPopup] = useState({ show: false, record: null });

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
        <div className='faculty-list'>
            <div className='recordslist-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Faculty ID</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facultyRecords.map((record) => (
                            <tr key={record.faculty_id}>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedFacultyIds.includes(record.faculty_id)} 
                                        onChange={() => onSelectFaculty(record.faculty_id)} 
                                    />
                                </td>
                                <td>{record.faculty_id}</td>
                                <td>{record.last_name}</td>
                                <td>{record.first_name}</td>
                                <td>{record.middle_name}</td>
                                <td>
                                    <span className='view-details-link' onClick={() => handlePopup(record)}>View Details</span>
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
                        <h3>Faculty Details</h3>
                        <button onClick={handleClose}>Close</button>
                    </div>
                    <div className='popup-content'>
                        <p>Faculty ID: {popup.record.faculty_id}</p>
                        <p>Last Name: {popup.record.last_name}</p>
                        <p>First Name: {popup.record.first_name}</p>
                        <p>Middle Name: {popup.record.middle_name}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacultyMembers_List;
