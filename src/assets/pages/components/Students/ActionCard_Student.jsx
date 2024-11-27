import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Students/Students_module.css";

const ActionCard_Student = ({ icon, text, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canEnroll, setCanEnroll] = useState(false); // State to store enrollment status
  const navigate = useNavigate();

  const handleCardClick = async () => {
    if (text === "Reports") {
      navigate("/student/reports", "_blank");
    } else if (text === "Enroll") {
      if (canEnroll) {
        navigate("/student/enroll", "_blank");
      } else {
        alert("You cannot enroll at this time."); // Alert if cannot enroll
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const checkEnrollmentStatus = async () => {
    try {
      const token = localStorage.getItem("token"); // Replace with your method of retrieving the token
  
      const response = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/check-enrollment-status", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch enrollment status");
      }
  
      const data = await response.json();
      setCanEnroll(data.can_enroll); // Set the canEnroll state based on the response
    } catch (error) {
      console.error("Error fetching enrollment status:", error);
    }
  };

  // Check enrollment status when the component mounts
  useEffect(() => {
    checkEnrollmentStatus();
    
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
      <div className={`actionCard ${text === "Enroll" && !canEnroll ? "disabled" : ""}`} onClick={handleCardClick}>
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

export default ActionCard_Student;