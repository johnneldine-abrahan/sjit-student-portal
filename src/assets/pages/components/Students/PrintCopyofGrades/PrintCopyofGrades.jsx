"use client";

import React from "react";
import "./PrintCopyofGrades.css";

export default function GradeReport() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <div className="card-grade">
        <div className="card-header">
          <h1>SAN JUAN INSTITUTE OF TECHNOLOGY</h1>

          <h3>Student's Copy of Grades</h3>
        </div>

        <div className="card-content">
          <div className="student-info">
            <div>
              <span className="label">Fullname:</span> SANCHEZ, KIM WILLIAM B.
            </div>
            <div>
              <span className="label">SRCODE:</span> 21-05256
            </div>
            <div>
              <span className="label">College:</span> College of Informatics and
              Computing Sciences
            </div>
            <div>
              <span className="label">Academic Year:</span> 2023-2024
            </div>
            <div>
              <span className="label">Program:</span> BS Information Technology
            </div>
            <div>
              <span className="label">Semester:</span> SECOND
            </div>
            <div>
              <span className="label">Year Level:</span> THIRD
            </div>
          </div>

          <table className="grades-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Units</th>
                <th>Grade</th>
                <th>Section</th>
                <th>Instructor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>BAT 403</td>
                <td>Fundamentals of Enterprise Data Management</td>
                <td>3</td>
                <td>1.50</td>
                <td>IT-3A-2024</td>
                <td>RAMOS, DEAN CHARLEMAGNE F.</td>
              </tr>
              <tr>
                <td>2</td>
                <td>BAT 404</td>
                <td>Analytics Techniques and Tools</td>
                <td>3</td>
                <td>2.00</td>
                <td>IT-3A-2024</td>
                <td>MENDOZA, ARCHIEL M.</td>
              </tr>
              <tr>
                <td>3</td>
                <td>IT 321</td>
                <td>Human-Computer Interaction</td>
                <td>3</td>
                <td>2.00</td>
                <td>IT-3A-2024</td>
                <td>MARASIGAN, KIMBERLY I.</td>
              </tr>
            </tbody>
          </table>

          <div className="summary">
            <div>
              <div>
                <span className="label">Total no. of Course:</span> 7
              </div>
              <div>
                <span className="label">Total no. of Units:</span> 21
              </div>
            </div>
            <div>
              <span className="label">General Weighted Average (GWA):</span>{" "}
              1.8929
            </div>
          </div>

          <div className="footer"></div>
          <div className="button-container">
            <button onClick={handlePrint} className="btn-box">
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}