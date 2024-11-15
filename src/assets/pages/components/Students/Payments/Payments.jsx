import React, { useState, useEffect } from "react";
import './Payments.css';

const Payments = ({ schoolYear, semester }) => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null); // State to manage error messages

  // Fetch paid liabilities from the back-end based on school year and semester
  const fetchPayments = async () => {
    try {
      // Check if school year and semester are set
      if (!schoolYear || !semester) {
        setError('Please select school year and semester to view payments');
        return;
      }

      // Make sure the API call uses the correct props (schoolYear and semester)
      const response = await fetch(`http://localhost:3000/student-liabilities-paid?modalSchoolYear=${schoolYear}&modalSemester=${semester}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}` // Assuming token is stored in localStorage
        }
      });

      if (response.status === 404) {
        throw new Error('There are no data found for the specified school year and semester.');
      }

      if (!response.ok) {
        throw new Error('Please select school year and semester to view payments');
      }

      const data = await response.json();
      setPayments(data);
      setError(null); // Clear any previous error
    } catch (error) {
      console.error('Error fetching payments:', error);
      setError(error.message); // Set error message to state
    }
  };

  // Fetch payments whenever the school year or semester changes
  useEffect(() => {
    fetchPayments();
  }, [schoolYear, semester]);

  return (
    <div className="payments-container">
      {error && <p className="error-message">{error}</p>} {/* Display error message if exists */}
      {payments.length > 0 ? (
        payments.map((payment, index) => (
          <div key={index} className="payment-box">
            <p className="payment-description">{payment.liability_description}</p>
            <div className="payment-details">
              <span className="payment-schoolyear-semester">{payment.school_year} / {payment.semester}</span>
              <span className="payment-status">{payment.status}</span>
            </div>
          </div>
        ))
      ) : (
        !error && <p>No paid liabilities found for the selected school year and semester.</p> // Show message only if there's no error
      )}
    </div>
  );
};

export default Payments;