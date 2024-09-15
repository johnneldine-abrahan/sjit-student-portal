import React, { useState } from 'react';
import '../../Faculty/Faculty_module.css';

const ActionCard_Faculty = ({ icon, text, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='actionCard' onClick={handleCardClick}>
        <div className='actionIcon'>{icon}</div>
        <div className='actionText'>{text}</div>
      </div>

      {isModalOpen && (
        <div className='modalOverlay'>
          <div className='modal'>
            <div className='modalHeader'>
              <span className='modalTitle'>{text}</span>
              <button className='modalCloseButton' onClick={handleCloseModal}>Close</button>
            </div>
            <div className='modalBody'>
              {/* Use the content prop to display dynamic content */}
              <p>{content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionCard_Faculty;

