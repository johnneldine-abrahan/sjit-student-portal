import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../Faculty/Faculty_module.css";

const ActionCard_Faculty = ({ icon, text, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Get navigate function

  const handleCardClick = () => {
    if (text === "Reports") {
      navigate("/reports"); // Navigate to the reports page
    } else {
      // For other cards, open the modal
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="actionCard" onClick={handleCardClick}>
        <div className="actionIcon">{icon}</div>
        <div className="actionText">{text}</div>
      </div>

      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modal">
            <div className="modalHeader">
              <span className="modalTitle">{text}</span>
              <button className="modalCloseButton" onClick={handleCloseModal}>
                Close
              </button>
            </div>
            <div className="modalBody">
              {content} {/* Render the content directly */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionCard_Faculty;