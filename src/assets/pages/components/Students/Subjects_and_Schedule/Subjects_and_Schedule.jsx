import React, { useState, useEffect } from 'react';
import './Subjects_and_Schedule.css';

const ScheduleItem = ({ day, time, room, code, description, units, section, instructor }) => {
  return (
    <div className="schedule-item">
      <p>{day} - {time} / {room} / {code} / {description} / {instructor}</p>
    </div>
  );
};

const ScheduleList = ({ schedules }) => {
  return (
    <div className="schedule-list">
      {schedules.map((schedule, index) => (
        <ScheduleItem
          key={index}
          day={schedule.day}
          time={`${schedule.start_time} - ${schedule.end_time}`} // Format time correctly
          room={schedule.room}
          code={schedule.subject_id} // Assuming subject_id is used as code
          description={schedule.subject_name} // Assuming subject_name is used as description
          units={schedule.units} // You may need to adjust this based on your data
          section={schedule.section_name} // Adjust as per your data structure
          instructor={schedule.faculty_name} // Assuming faculty_name is used as instructor
        />
      ))}
    </div>
  );
};

const Subjects_and_Schedule = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'table'
  const [schedules, setSchedules] = useState([]); // State to hold fetched schedules
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch('http://localhost:3000/schedule', {
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
        setSchedules(data);
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
    <div className="schedule-view-container">
      <div className="view-toggle">
        <button className="left" onClick={() => setViewMode('list')}>List View</button>
        <button className="right" onClick={() => setViewMode('table')}>Table View</button>
      </div>

      {viewMode === 'list' ? (
        <ScheduleList schedules={schedules} />
      ) : (
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Room</th>
              <th>Code</th>
              <th>Subject</th>
              <th>Section</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.day}</td>
                <td>{`${schedule.start_time} - ${schedule.end_time}`}</td> {/* Format time correctly */}
                <td>{schedule.room}</td>
                <td>{schedule.subject_id}</td>
                <td>{schedule.subject_name}</td>
                <td>{schedule.section_name}</td> {/* Adjust based on your data */}
                <td>{schedule.faculty_name}</td> {/* Adjust based on your data */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Subjects_and_Schedule;