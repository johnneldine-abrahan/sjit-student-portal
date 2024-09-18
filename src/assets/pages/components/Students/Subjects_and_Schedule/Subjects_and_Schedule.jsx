import React, { useState } from 'react';
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
          time={schedule.time}
          room={schedule.room}
          code={schedule.code}
          description={schedule.description}
          units={schedule.units}
          section={schedule.section}
          instructor={schedule.instructor}
        />
      ))}
    </div>
  );
};

const Subjects_and_Schedule = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'table'

  const schedules = [
    {
      day: "Monday",
      time: "08:30 AM-10:00 AM",
      room: "401",
      code: "IT 412",
      description: "Platform Technologies",
      units: 3,
      section: "IT-BA-4104 / ALANGILAN",
      instructor: "LUTERO, LIGAYA F.",
    },
    {
      day: "Monday",
      time: "01:00 PM-03:00 PM",
      room: "401",
      code: "IT 414",
      description: "Systems Quality Assurance",
      units: 3,
      section: "IT-BA-4104 / ALANGILAN",
      instructor: "LUTERO, LIGAYA F.",
    },
    {
      day: "Tuesday",
      time: "10:00 AM-01:00 PM",
      room: "ITL",
      code: "IT 414",
      description: "Systems Quality Assurance",
      units: 3,
      section: "IT-BA-4104 / ALANGILAN",
      instructor: "LUTERO, LIGAYA F.",
    },
    {
      day: "Wednesday",
      time: "02:30 PM-04:00 PM",
      room: "106",
      code: "IT 412",
      description: "Platform Technologies",
      units: 3,
      section: "IT-BA-4104 / ALANGILAN",
      instructor: "LUTERO, LIGAYA F.",
    },
    // Add more schedules here
  ];

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
              <th>Description</th>
              <th>Units</th>
              <th>Section</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.day}</td>
                <td>{schedule.time}</td>
                <td>{schedule.room}</td>
                <td>{schedule.code}</td>
                <td>{schedule.description}</td>
                <td>{schedule.units}</td>
                <td>{schedule.section}</td>
                <td>{schedule.instructor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Subjects_and_Schedule;