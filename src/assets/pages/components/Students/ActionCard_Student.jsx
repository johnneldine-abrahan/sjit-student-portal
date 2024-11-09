import React, { useState, useEffect } from 'react';
import '../../Students/Students_module.css';

const ActionCard_Student = ({ icon, text, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

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
              {content} {/* Render the content directly */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionCard_Student;