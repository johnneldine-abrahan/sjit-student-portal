import React from 'react';
import { IoMdPrint } from 'react-icons/io'; // Corrected import for the icon
import './Certificate_of_Registration.css';

const Certificate_of_Registration = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    // Print button with icon wrapped in a span
    <div className="button-container">
      <button className="btn-box" onClick={handlePrint}>
        <span className="print-icon">
          <IoMdPrint />
        </span>
        Print
      </button>
    </div>
  );
};

export default Certificate_of_Registration;
