import React, { useState, useEffect } from "react";
import "./Archive_Content.css";

const Archive_Records = () => {
  const [archiveRecords, setArchiveRecords] = useState([]); // State to store fetched records
  const [selectedRecords, setSelectedRecords] = useState([]); // State to store selected records
  const [selectAllChecked, setSelectAllChecked] = useState(false); // State to store select all checkbox state
  const selectAllRef = React.createRef(); // Create a ref for the select-all checkbox
  const [popup, setPopup] = useState({
    show: false,
    record: null,
  });

  // Fetch data when the component loads
  useEffect(() => {
    const fetchArchivedRecords = async () => {
      try {
        const response = await fetch("http://localhost:3000/students/archived"); // API call to the backend
        const data = await response.json();
        setArchiveRecords(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching archived records:", error);
      }
    };

    fetchArchivedRecords();
  }, []);

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

  // Function to handle the selection of a record
  const handleSelectRecord = (studentId) => {
    setSelectedRecords((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  // Function to handle the selection of all records
  const handleSelectAll = () => {
    const newSelectAllChecked = !selectAllChecked;
    if (newSelectAllChecked) {
      setSelectedRecords(archiveRecords.map((record) => record.student_id));
    } else {
      setSelectedRecords([]);
    }
    setSelectAllChecked(newSelectAllChecked);
  };

  useEffect(() => {
    if (selectAllRef.current) {
      if (
        selectedRecords.length > 0 &&
        selectedRecords.length < archiveRecords.length
      ) {
        selectAllRef.current.indeterminate = true;
      } else {
        selectAllRef.current.indeterminate = false;
      }
    }
  }, [selectedRecords, archiveRecords]);

  return (
    <div className="archive-records">
      <div className="recordslist-container">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  ref={selectAllRef}
                  checked={selectAllChecked}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Student ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Student Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {archiveRecords.length > 0 ? (
              archiveRecords.map((record) => (
                <tr
                  key={record.student_id}
                  className={
                    selectedRecords.includes(record.student_id) ? "checked" : ""
                  }
                >
                  <td>
                    <input
                      type="checkbox"
                      name={`select-${record.student_id}`}
                      checked={selectedRecords.includes(record.student_id)}
                      onChange={() => handleSelectRecord(record.student_id)}
                    />
                  </td>
                  <td>{record.student_id}</td>
                  <td>{record.last_name}</td>
                  <td>{record.first_name}</td>
                  <td>{record.middle_name}</td>
                  <td>{record.student_status}</td>
                  <td>
                    <span
                      className="view-details-link"
                      onClick={() => handlePopup(record)}
                    >
                      View Details
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No archived records found.</td>
              </tr>
            )}
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
                <p>Student ID: {popup.record.student_id}</p>
                <p>Last Name: {popup.record.last_name}</p>
                <p>First Name: {popup.record.first_name}</p>
                <p>Middle Name: {popup.record.middle_name}</p>
                <p>Status: {popup.record.student_status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Archive_Records;