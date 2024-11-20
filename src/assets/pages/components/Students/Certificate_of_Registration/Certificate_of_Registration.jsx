"use client";

import React, { useEffect, useState } from "react";
import { IoMdPrint } from "react-icons/io";
import "./Certificate_of_Registration.css";

export default function CertificateOfRegistration({ schoolYear, semester }) {
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollmentData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/COR?modalSchoolYear=${schoolYear}&modalSemester=${semester}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you're using local storage for the token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch enrollment data');
        }

        const data = await response.json();
        setEnrollmentData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentData();
  }, [schoolYear, semester]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!enrollmentData || enrollmentData.length === 0) {
    return <div>No enrollment data available.</div>;
  }

  return (
    <div className="certificate-container">
      <header className="certificate-header">
        <h1>Certificate of Registration (COR)</h1>
      </header>
      <main className="certificate-main">
        <div className="university-info">
          <div className="university-details">
            <h2>SAN JUAN INSTITUTE OF TECHNOLOGY</h2>
          </div>
        </div>
        <div className="college-info">
          <p className="college-name">{enrollmentData[0].strand}</p>
          <p>{semester}, {schoolYear}</p>
          <p className="form-title">REGISTRATION FORM</p>
        </div>
        <div className="student-info">
          <div>
            <p>
              <span className="label">Student ID:</span> {enrollmentData[0].student_id}
            </p>
            <p>
              <span className="label">Name:</span> {enrollmentData[0].full_name}
            </p>
          </div>
          <div>
            <p>
              <span className="label">Sex:</span> {enrollmentData[0].sex}
            </p>
            <p>
              <span className="label">Grade Level:</span> Grade {enrollmentData[0].grade_level}
            </p>
          </div>
        </div>
        <table className="course-table">
          <thead>
            <tr>
              <th>COURSE CODE</th>
              <th>COURSE TITLE</th>
              <th>UNIT(S)</th>
              <th>SECTION</th>
            </tr>
          </thead>
          <tbody>
            {enrollmentData.map((course, index) => (
              <tr key={index}>
                <td>{course.subject_id}</td>
                <td>{course.subject_name}</td>
                <td>1</td> {/* Assuming you have a units field */}
                <td>{course.section_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="additional-info">
          <div className="scholarship">
            <h3>Scholarship:</h3>
            <p>Higher Education Support Program : ?</p>
          </div>
          <div className="assessment">
            <h3>Assessment:</h3>
            {/* Add your assessment details here */}
          </div>
        </div>
      </main>
      <footer className="certificate-footer">
        <div className="enrollment-info">
          <p className="enrolled">ENROLLED</p>
          <p>Date: {new Date().toLocaleDateString()}</ p>
        </div>
        <button onClick={handlePrint} className="print-button">
          <IoMdPrint className="print-icon" />
          Print
        </button>
      </footer>
    </div>
  );
}