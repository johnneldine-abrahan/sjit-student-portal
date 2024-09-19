import React, {useState} from 'react'
import './ConfirmEnrollment_Content.css'

const onQueue = [
    {
      studentID: "21-05298",
      LastName: "Sanchez",
      FirstName: "Kim William",
      MiddleName: "Bacsa",
      gradeLevel: "Grade 9",
      viewRecords: "View Details",
    },
    {
      studentID: "21-05298",
      LastName: "Sanchez",
      FirstName: "Kim William",
      MiddleName: "Bacsa",
      gradeLevel: "Grade 9",
      viewRecords: "View Details",
    },
    {
      studentID: "21-05298",
      LastName: "Sanchez",
      FirstName: "Kim William",
      MiddleName: "Bacsa",
      gradeLevel: "Grade 9",
      viewRecords: "View Details",
    },
    {
      studentID: "21-05298",
      LastName: "Sanchez",
      FirstName: "Kim ",
      MiddleName: "Bacsa",
      gradeLevel: "Grade 9",
      viewRecords: "View Details",
    },
  ];

const ConfirmEnrollment_Queue = () => {
    const [popup, setPopup] = useState({
        show: false,
        record: null,
      });
    
      const handlePopup = (record) => {
        setPopup({
          show: true,
          record: record,
        });
      };
    
      const handleClose = () => {
        setPopup({
          show: false,
          record: null,
        });
      };

  return (
    <div className='on-queue'>
        <div className='recordslist-container'>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Year Graduated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {onQueue.map((records) => (
              <tr key={records.studentID}>
                <td>{records.studentID}</td>
                <td>{records.LastName}</td>
                <td>{records.FirstName}</td>
                <td>{records.MiddleName}</td>
                <td>{records.gradeLevel}</td>
                <td>
                  <span
                    className="view-details-link"
                    onClick={() => handlePopup(records)}
                  >
                    Confirm Enrollment
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {popup.show && (
        <div className="popup-blurred-background" onClick={handleClose}>
          <div className="popup-container">
            <div className="popup">
              <div className="popup-header">
                <h3>Student Details</h3>
                <button onClick={handleClose}>Close</button>
              </div>
              <div className="popup-content">
                <p>Student ID: {popup.record.studentID}</p>
                <p>Last Name: {popup.record.LastName}</p>
                <p>First Name: {popup.record.FirstName}</p>
                <p>Middle Name: {popup.record.MiddleName}</p>
                <p>Grade Level: {popup.record.gradeLevel}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ConfirmEnrollment_Queue
