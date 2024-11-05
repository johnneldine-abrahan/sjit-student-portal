import React, { useState, useEffect } from 'react';
import './Subjects_and_Schedule.css';

// Function to format time
const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  return `${formattedHours}:${minutes} ${ampm}`;
};

// Define the order of days
const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Mapping for day abbreviations
const dayAbbreviations = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri'
};

const ScheduleItem = ({ subjectInfo }) => (
  <div className="schedule-item">
    <div className="subject_student">
      <p style={{ fontWeight: 'bold', fontSize: '22px' }}>
        {subjectInfo.subject_id} - {subjectInfo.subject_name}
      </p>
    </div>
    <div className='faculty_student'>
      <p>{subjectInfo.faculty_name}</p>
    </div>
    <div className='section_student'>
      {subjectInfo.sections.map((section, index) => (
        <p key={index}>Grade {section.grade_level} - {section.section_name}</p>
      ))}
    </div>
    {subjectInfo.schedule.map((schedule, index) => (
      <div className='schedule_student' key={index}>
        {/* Ensure days are sorted according to dayOrder */}
        <p style={{ fontWeight: 'bold'}}>
          {schedule.days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)).join(', ')}
        </p>
        <p>
          {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)} / {schedule.room}
        </p>
      </div>
    ))}
  </div>
);

const ScheduleList = ({ schedules }) => (
  <div className="schedule-list">
    {schedules.map((subjectInfo, index) => (
      <ScheduleItem key={index} subjectInfo={subjectInfo} />
    ))}
  </div>
);

const Subjects_and_Schedule = () => {
  const [viewMode, setViewMode] = useState('list');
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch('http://localhost:3000/schedule', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Group records by subject
        const groupedSchedules = Object.values(data.reduce((acc, record) => {
          const key = `${record.subject_id}-${record.subject_name}`;
          
          if (!acc[key]) {
            acc[key] = {
              subject_id: record.subject_id,
              subject_name: record.subject_name,
              faculty_name: record.faculty_name,
              sections: [],
              schedule: []
            };
          }

          // Add section info
          if (!acc[key].sections.some(section => section.section_name === record.section_name)) {
            acc[key].sections.push({
              grade_level: record.grade_level,
              section_name: record.section_name
            });
          }

          // Add schedule info
          const existingSchedule = acc[key].schedule.find(schedule => 
            schedule.start_time === record.start_time &&
            schedule.end_time === record.end_time &&
            schedule.room === record.room
          );

          if (existingSchedule) {
            if (!existingSchedule.days.includes(record.day)) {
              existingSchedule.days.push(record.day);
            }
          } else {
            acc[key].schedule.push({
              days: [record.day],
              start_time: record.start_time,
              end_time: record.end_time,
              room: record.room
            });
          }

          return acc;
        }, {}));

        // Sort the schedules within each subject by day order
        groupedSchedules.forEach(subjectInfo => {
          subjectInfo.schedule.sort((a, b) => {
            // Compare the first day in each schedule's days array to determine order
            return dayOrder.indexOf(a.days[0]) - dayOrder.indexOf(b.days[0]);
          });
        });

        setSchedules(groupedSchedules);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
              <th>Subject Code</th>
              <th>Subject</th>
              <th>Grade and Section</th>
              <th>Instructor</th>
              <th>Schedules</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((scheduleGroup, index) => (
              <tr key={index}>
                <td>{scheduleGroup.subject_id}</td>
                <td>{scheduleGroup.subject_name}</td>
                <td>
                  {scheduleGroup.sections.map((section, secIdx) => (
                    <div key={secIdx}>
                      Grade {section.grade_level} - {section.section_name}
                    </div>
                  ))}
                </td>
                <td>{scheduleGroup.faculty_name}</td>
                <td>
                  {scheduleGroup.schedule.map((schedule, idx) => (
                    <div className="schedule_student" key={idx}>
                      <strong>
                        {schedule.days
                          .sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))
                          .map(day => dayAbbreviations[day]) // Convert to abbreviations
                          .join(', ')}
                      </strong> - {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)} / {schedule.room}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Subjects_and_Schedule;
