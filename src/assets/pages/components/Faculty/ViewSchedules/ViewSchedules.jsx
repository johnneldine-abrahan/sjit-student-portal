import React, { useState } from 'react';
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
      {facultyRecords.map((records, index) => (
        <FacultyScheduleItem
          key={index}
          day={records.day}
          time={records.time}
          subject={records.subject}
          section={records.section}
          room={records.room}
        />
      ))}
    </div>
  );
};

const FacultySchedule = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'table'

  const facultyRecords = [
    {
      day: "Monday",
      time: "LUTERO",
      subject: "LIGAYA F.",
      section: "F",
      room: "Ph.D.",
    },
    {
      day: "Monday",
      time: "LUTERO",
      subject: "LIGAYA F.",
      section: "F",
      room: "Ph.D.",
    },
    {
      day: "Monday",
      time: "LUTERO",
      subject: "LIGAYA F.",
      section: "D",
      room: "Ph.D.",
    },

    // Add more faculty records here
  ];

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
            {facultyRecords.map((records, index) => (
              <tr key={index}>
                <td>{records.day}</td>
                <td>{records.time}</td>
                <td>{records.subject}</td>
                <td>{records.section}</td>
                <td>{records.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacultySchedule;