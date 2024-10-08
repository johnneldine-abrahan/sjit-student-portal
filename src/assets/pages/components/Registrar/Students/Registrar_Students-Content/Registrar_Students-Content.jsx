import React, { useState, useEffect } from 'react';
import './Registrar_Students-Content.css';
import Registrar_Students_ContentHeader from './Registrar_Students_ContentHeader';
import Registrar_StudentsRecords from './Registrar_StudentsRecords';

const Students_Content = () => {
    const [studentRecords, setStudentRecords] = useState([]);
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);

    // Function to update student records after adding or deleting
    const updateStudentRecords = (updatedRecords) => {
        setStudentRecords(updatedRecords);
    };

    // Function to fetch students initially or whenever needed
    useEffect(() => {
        const fetchStudentRecords = async () => {
            const response = await fetch('http://localhost:3000/students');
            const data = await response.json();
            setStudentRecords(data);
        };
        fetchStudentRecords();
    }, []);

    const handleSelectStudent = (studentId) => {
        setSelectedStudentIds((prev) =>
            prev.includes(studentId)
                ? prev.filter((id) => id !== studentId) // Deselect
                : [...prev, studentId] // Select
        );
    };

    const handleDeleteStudents = async () => {
        if (selectedStudentIds.length === 0) {
            alert("No students selected for deletion.");
            return;
        }
        const response = await fetch('http://localhost:3000/deleteStudent', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentIds: selectedStudentIds }),
        });
        if (response.ok) {
            alert("Selected students deleted successfully.");
            // Fetch updated records after deletion
            const updatedResponse = await fetch('http://localhost:3000/students');
            const updatedRecords = await updatedResponse.json();
            updateStudentRecords(updatedRecords);
        } else {
            alert("Failed to delete students.");
        }
    };

    return (
        <div className='admin-s_content'>
            <Registrar_Students_ContentHeader
                onDelete={handleDeleteStudents}
                selectedStudentIds={selectedStudentIds}
                updateStudentRecords={updateStudentRecords} // Pass function as prop
            />
            <Registrar_StudentsRecords
                onSelectStudent={handleSelectStudent}
                selectedStudentIds={selectedStudentIds}
                studentRecords={studentRecords} // Pass records as prop
                updateStudentRecords={updateStudentRecords}
            />
        </div>
    );
};

export default Students_Content;