import React, { useState, useEffect } from 'react';
import './UploadGrades.css';

const StudentRecords = [
  {
    GradeLevel: '6',
    Section: 'Sanchez',
    Subject: 'haha'
  },
  {
    GradeLevel: '6',
    Section: 'Sanchez',
    Subject: 'haha'
  },
  {
    GradeLevel: '6',
    Section: 'Sanchez',
    Subject: 'haha'
  },
]

const UploadGrades = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});

  const handlePopup = (records) => {
    setIsModalOpen(true);
    setSelectedRecord(records);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset'; // Reset overflow when modal is closed
    }

    // Clean up the effect when the component unmounts or modal closes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div>
      <table className="student-table">
        <thead>
          <tr>
            <th>Grade Level</th>
            <th>Section</th>
            <th>Subject</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {StudentRecords.map((records, index) => (
            <tr key={index}>
              <td>{records.GradeLevel}</td>
              <td>{records.Section}</td>
              <td>{records.Subject}</td>
              <td>
                <span className='view-details-link' onClick={() => handlePopup(records)}>Select</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className='modalOverlay'>
          <div className='modal'>
            <div className='modalHeader'>
              <span className='modalTitle'>Select</span>
              <button className='modalCloseButton' onClick={handleCloseModal}>Close</button>
            </div>
            <div className='modalBody'>
              <table className="student-table"> {/* Apply the same table styling */}
                <thead>
                  <tr>
                    <th>Grade Level</th>
                    <th>Section</th>
                    <th>Subject</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedRecord.GradeLevel}</td>
                    <td>{selectedRecord.Section}</td>
                    <td>{selectedRecord.Subject}</td>
                    <td>
                <span className='view-details-link' onClick={() => handlePopup(records)}>Select</span>
              </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadGrades
