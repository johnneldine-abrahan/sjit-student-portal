import React, { useState, useEffect } from "react";
import './Admin_Students-Content.css';

const Admin_StudentsRecords = ({ onSelectStudent, selectedStudentIds }) => {
    const [studentRecords, setStudentRecords] = useState([]);
    const [popup, setPopup] = useState({ show: false, record: null });

    useEffect(() => {
        const fetchStudentRecords = async () => {
            const response = await fetch('http://localhost:3000/students');
            const data = await response.json();
            setStudentRecords(data);
        };
        fetchStudentRecords();
    }, []);

    return (
        <div className='student-records'>
            <div className='recordslist-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Student ID</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Program</th>
                            <th>Grade Level</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentRecords.map((record) => (
                            <tr key={record.student_id}>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedStudentIds.includes(record.student_id)} 
                                        onChange={() => onSelectStudent(record.student_id)} 
                                    />
                                </td>
                                <td>{record.student_id}</td>
                                <td>{record.last_name}</td>
                                <td>{record.first_name}</td>
                                <td>{record.middle_name}</td>
                                <td>{record.program}</td>
                                <td>{record.grade_level}</td>
                                <td>
                                    <span className='view-details-link' onClick={() => handlePopup(record)}>View Details</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Your existing popup logic for viewing student details */}
        </div>
    );
};

export default Admin_StudentsRecords;
