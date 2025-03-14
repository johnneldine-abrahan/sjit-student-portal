import React, { useState, useEffect } from "react";
import "./StudentRecords_Content.css";
import { FaRegEye } from "react-icons/fa"; // Make sure to import this if you're using the icon
import axios from "axios"; // Make sure to install axios

const StudentRecords = () => {
    const [students, setStudents] = useState([]); // Ensure this is an array
    const [viewPopup, setViewPopup] = useState({ show: false, record: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liabilities, setLiabilities] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5; // Number of records to display per page

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("https://san-juan-institute-of-technology-backend.onrender.com/students-finance-list");
                console.log("API Response:", response); // Log the entire response object

                // Adjust this based on the actual structure of the response
                if (Array.isArray(response.data)) {
                    setStudents(response.data);
                } else if (Array.isArray(response.data.data)) {
                    // Example for nested data
                    setStudents(response.data.data);
                } else {
                    throw new Error("Unexpected response format");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleViewPopup = async (record) => {
        setViewPopup({ show: true, record: record });
        try {
            const response = await axios.get(`https://san-juan-institute-of-technology-backend.onrender.com/liabilities/${record.student_id}`);
            setLiabilities(response.data); // Assuming the response is an array of liabilities
        } catch (err) {
            setError(err.message);
            setLiabilities([]); // Reset liabilities if there's an error
        }
    };

    const handleClose = () => {
        setViewPopup({ show: false, record: null });
        setLiabilities([]); // Clear liabilities when closing the popup
 };

    // Pagination handlers
    const totalPages = Math.ceil(students.length / recordsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    // Get the current records to display
    const startIndex = (currentPage - 1) * recordsPerPage;
    const currentRecords = students.slice(startIndex, startIndex + recordsPerPage);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="student-record-list">
            <div className="recordslist-container">
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Program</th>
                            <th>Grade Level</th>
                            <th>Strand</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{record.student_id}</td>
                                <td>{record.last_name}</td>
                                <td>{record.first_name}</td>
                                <td>{record.middle_name}</td>
                                <td>{record.program}</td>
                                <td>Grade {record.grade_level}</td>
                                <td>{record.strand}</td>
                                <td>
                                    <button
                                        className="view-details"
                                        onClick={() => handleViewPopup(record)}
                                    >
                                        <FaRegEye size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {viewPopup.show && (
                    <div className="popup-blurred-background" onClick={handleClose} />
                )}
                {viewPopup.show && (
                    <div className="popup-viewliab-student">
                        <div className="popup-header">
                            <h3>View Student</h3>
                            <button onClick={handleClose}>Close</button>
                        </div>
                        <div className="popup-content">
                            <table className="viewstudentliab-table">
                                <thead>
                                    <tr>
                                        <th>Liability ID</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {liabilities.length > 0 ? (
                                        liabilities.map((liability) => (
                                            <tr key={liability.liability_id}>
                                                <td>{liability.liability_id}</td>
                                                <td>{liability.liability_description}</td>
                                                <td>{liability.status}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3">No liabilities found for this student.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <div className="button-container-pagination-student">
                    <div className="pagination-controls">
                        <button
                            className="btn-box-pagination-student"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="btn-box-pagination-student"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentRecords;