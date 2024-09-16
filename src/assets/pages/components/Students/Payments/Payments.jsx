import React from 'react';
import './Payments.css';

const Payments = () => {
  const payments = [
    {
      title: 'Tuition Fee',
      description: 'Lorem ipsum dolor sit amet, ea eam liber senserit tempo.',
      amount: '300 PHP',
      status: 'Paid'
    },
    {
      title: 'Museum Fee',
      description: 'Lorem ipsum dolor sit amet, ea eam liber senserit tempo.',
      amount: '200 PHP',
      status: 'Paid'
    }
  ];

  return (
    <div className="payments-container">
      {payments.map((payment, index) => (
        <div key={index} className="payment-box">
          <h2 className="payment-title">{payment.title}</h2>
          <p className="payment-description">{payment.description}</p>
          <div className="payment-details">
            <span className="payment-amount">{payment.amount}</span>
            <span className="payment-status">{payment.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Payments;