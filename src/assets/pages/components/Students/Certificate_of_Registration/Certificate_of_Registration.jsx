import React from 'react'
import { FaPrint } from 'react-icons/fa';
import './Certificate_of_Registration.css';

const Certificate_of_Registration = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button onClick={handlePrint} className="print-button">
      <FaPrint className="icon" />
      Print
    </button>
  )
}

export default Certificate_of_Registration