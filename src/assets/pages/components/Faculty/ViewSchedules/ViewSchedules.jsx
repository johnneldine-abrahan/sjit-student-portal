import React, { useState, useEffect } from 'react';
import './ViewSchedules.css';

const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  return `${formattedHours}:${minutes} ${ampm}`;
};

const FacultyScheduleItem = ({ subjectInfo }) => {
  return (
    <div className="faculty-schedule-item">
      <div className="subject_faculty">
        <p style={{ fontWeight: 'bold', fontSize: '22px' }}>
          {subjectInfo.subject_id} - {subjectInfo.subject_name}
        </p>
      </div>
      <div className='section_faculty'>
        {subjectInfo.sections.map((section, index) => (
          <p key={index}>
            Grade {section.grade_level} - {section.section_name}
          </p>
        ))}
      </div>
      {subjectInfo.schedule.map((schedule, index) => (
        <div className='schedule_faculty' key={index}>
          <p style={{ fontWeight: 'bold'}}>{schedule.days.join(', ')}</p>
          <p>
            {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)} / {schedule.room}
          </p>
        </div>
      ))}
    </div>
  );
};

const FacultyScheduleList = ({ facultyRecords }) => {
  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const groupedRecords = facultyRecords.reduce((acc, record) => {
    const subjectKey = `${record.subject_id}-${record.subject_name}`;
    
    if (!acc[subjectKey]) {
      acc[subjectKey] = {
        subject_id: record.subject_id,
        subject_name: record.subject_name,
        sections: [{ 
          grade_level: record.grade_level, 
          section_name: record.section_name,
          strand: record.strand 
        }],
        schedule: [{
          days: [record.day],
          start_time: record.start_time,
          end_time: record.end_time,
          room: record.room
        }]
      };
    } else {
      if (!acc[subjectKey].sections.some(sec => sec.grade_level === record.grade_level && sec.section_name === record.section_name)) {
        acc[subjectKey].sections.push({ 
          grade_level: record.grade_level, 
          section_name: record.section_name,
          strand: record.strand 
        });
      }
      
      const existingSchedule = acc[subjectKey].schedule.find(schedule => 
        schedule.start_time === record.start_time && 
        schedule.end_time === record.end_time && 
        schedule.room === record.room
      );

      if (existingSchedule) {
        if (!existingSchedule.days.includes(record.day)) {
          existingSchedule.days.push(record.day);
        }
      } else {
        acc[subjectKey].schedule.push({ 
          days: [record.day], 
          start_time: record.start_time, 
          end_time: record.end_time, 
          room: record.room 
        });
      }
    }
    
    return acc;
  }, {});

  const groupedArray = Object.values(groupedRecords);

  groupedArray.forEach(subjectInfo => {
    subjectInfo.schedule.forEach(schedule => {
      schedule.days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
    });
  });

  return (
    <div className="faculty-schedule-list">
      {groupedArray.map((subjectInfo, index) => (
        <FacultyScheduleItem key={index} subjectInfo={subjectInfo} />
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
          method : 'GET',
          headers: {
            'Content-Type': 'application /json',
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
                <td>{formatTime(record.start_time)} - {formatTime(record.end_time)}</td>
                <td>{record.subject_name}</td>
                <td>Grade {`${record.grade_level} - ${record.section_name} / ${record.strand}`}</td>
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