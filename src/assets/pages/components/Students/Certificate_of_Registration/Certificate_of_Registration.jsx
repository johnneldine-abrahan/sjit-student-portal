"use client";

import React from "react";
import { IoMdPrint } from "react-icons/io";
import "./Certificate_of_Registration.css";

export default function CertificateOfRegistration() {
  const handlePrint = () => {
    window.print();
  };

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
          <p className="college-name">Strand</p>
          <p>FIRST, 2024-2025</p>
          <p className="form-title">REGISTRATION FORM</p>
        </div>
        <div className="student-info">
          <div>
            <p>
              <span className="label">SR Code:</span> 21-05298
            </p>
            <p>
              <span className="label">Name:</span> SANCHEZ, KIM WILLIAM R.
            </p>
          </div>
          <div>
            <p>
              <span className="label">Sex:</span> MALE
            </p>
            <p>
              <span className="label">Program:</span> BS Information
              Technology-BA FOURTH
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
            <tr>
              <td>CS 423</td>
              <td>Social Issues and Professional Practice</td>
              <td>3</td>
              <td>IT-BA-4104</td>
            </tr>
            <tr>
              <td>IT 411</td>
              <td>Capstone Project 2</td>
              <td>3</td>
              <td>IT-BA-4104</td>
            </tr>
            <tr>
              <td>BAT 405</td>
              <td>Analytics Application</td>
              <td>3</td>
              <td>IT-BA-4104</td>
            </tr>
            <tr>
              <td>ELEC 415</td>
              <td>Technopreneurship</td>
              <td>3</td>
              <td>IT-BA-4104</td>
            </tr>
            <tr>
              <td>IT 413</td>
              <td>Advanced Information Assurance and Security</td>
              <td>3</td>
              <td>IT-BA-4104</td>
            </tr>
            <tr>
              <td>IT 414</td>
              <td>Systems Quality Assurance</td>
              <td>3</td>
              <td>IT-BA-4104</td>
            </tr>
            <tr>
              <td>IT 412</td>
              <td>Platform Technologies</td>
              <td>3</td>
              <td>IT-BA-4104</td>
            </tr>
          </tbody>
        </table>
        <div className="additional-info">
          <div className="scholarship">
            <h3>Scholarship:</h3>
            <p>Higher Education Support Program : Free Tuition 2024</p>
          </div>
          <div className="assessment">
            <h3>Assessment:</h3>
            <p>Tuition Fee (21.0 units): 5,250.00 </p>
            <p>Library Fee: 622.00</p>
            <p>Registration Fee: 260.00</p>
            <p>Athletic Fee: 380.00</p>
            <p>Publication Fee: 260.00</p>
            <p>Medical / Dental Fee: 380.00</p>
            <p>Guidance Fee: 260.00</p>
            <p>Laboratory Fee: 71.00</p>
            <p>Internet Fee: 300.00</p>
            <p>Insurance: 50.00</p>
            <p>Security: 173.00</p>
            <p>NSTP / CWTS: 1,806.00</p>
            <p>SCUAA: 130.00</p>
            <p>TOTAL: 10,050.00</p>
            <p>DISCOUNT: (10,050.00)</p>
            <p>TOTAL (PHP): 0.00</p>
          </div>
        </div>
      </main>
      <footer className="certificate-footer">
        <div className="enrollment-info">
          <p className="enrolled">ENROLLED</p>
          <p>Date: 08-05-2024</p>
        </div>
        <button onClick={handlePrint} className="print-button">
          <IoMdPrint className="print-icon" />
          Print
        </button>
      </footer>
    </div>
  );
}