import React, { useState, useEffect } from 'react';
import './ViewSchedules.css';

const FacultyScheduleItem = ({ day, time, subject, section, room }) => {
  return (
    <div className="faculty-schedule-item">
      <p>{day} / {time} / {subject} / {section} / {room}</p>
    </div>
  );
};

const FacultyScheduleList = ({ facultyRecords }) => {
  return (
    <div className="faculty-schedule-list">
      {facultyRecords.map((record, index) => (
        <FacultyScheduleItem
          key={index}
          day={record.day}
          time={`${record.start_time} - ${record.end_time}`} // Format time correctly
          subject={record.subject_name}
          section={`Grade ${record.grade_level} - ${record.section_name} ${record.strand}`} // Combine section details
          room={record.room}
        />
      ))}
    </div>
  );
};

const FacultySchedule = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'table'
  const [facultyRecords, setFacultyRecords] = useState([]); // State to hold fetched schedules
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch('http://localhost:3000/faculty-schedules', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you're using token-based auth
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setFacultyRecords(data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []); // Empty dependency array to run only once on mount

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="faculty-schedule-view-container">
      <div className="view-toggle">
        <button className="left" onClick={() => setViewMode('list')}>List View</button>
        <button className="right" onClick={() => setViewMode('table')}>Table View</button>
      </div>

      {viewMode === 'list' ? (
        <FacultyScheduleList facultyRecords={facultyRecords} />
      ) : (
        <table className="faculty-schedule-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Section</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {facultyRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.day}</td>
                <td>{`${record.start_time} - ${record.end_time}`}</td> {/* Format time correctly */}
                <td>{record.subject_name}</td>
                <td>Grade {`${record.grade_level} - ${record.section_name} ${record.strand}`}</td> {/* Combine section details */}
                <td>{record.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacultySchedule;