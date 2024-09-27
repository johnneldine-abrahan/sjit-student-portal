import React, { useState } from 'react';
import './Admin_Students-Content.css';
import Admin_Students_ContentHeader from './Admin_Students_ContentHeader';
import Admin_StudentsRecords from './Admin_StudentsRecords';

const Students_Content = () => {
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);

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
            // Optionally, you can refresh the student records here
        } else {
            alert("Failed to delete students.");
        }
    };

    return (
        <div className='admin-s_content'>
            <Admin_Students_ContentHeader 
                onDelete={handleDeleteStudents} 
                selectedStudentIds={selectedStudentIds} 
            />
            <Admin_StudentsRecords 
                onSelectStudent={handleSelectStudent} 
                selectedStudentIds={selectedStudentIds} 
            />
        </div>
    );
};

export default Students_Content;
