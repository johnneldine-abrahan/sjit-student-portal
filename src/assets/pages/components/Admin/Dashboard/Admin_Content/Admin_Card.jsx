import React, { useEffect, useState } from 'react';
import './Admin_Content.css';

const info_details = [
  {
    title: 'Enrolled Students',
    number: '0' // Initial value, will be updated from the API
  },
  {
    title: 'Faculty Members',
    number: '0' // Initial value, will be updated from the API
  },
  {
    title: 'Active Users',
    number: '78'
  }
];

const Admin_Card = () => {
  const [enrolledCount, setEnrolledCount] = useState(0); // State to hold the count of enrolled students
  const [activeFacultyCount, setActiveFacultyCount] = useState(0); // State to hold the count of active faculty members

  useEffect(() => {
    const fetchEnrolledCount = async () => {
      try {
        const response = await fetch('https://san-juan-institute-of-technology-backend.onrender.com/count-enrolled-students');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEnrolledCount(data.enrolledCount); // Update state with the fetched count
      } catch (error) {
        console.error('Error fetching enrolled students count:', error);
      }
    };

    const fetchActiveFacultyCount = async () => {
      try {
        const response = await fetch('https://san-juan-institute-of-technology-backend.onrender.com/count-active-faculty');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setActiveFacultyCount(data.activeFacultyCount); // Update state with the fetched count
      } catch (error) {
        console.error('Error fetching active faculty count:', error);
      }
    };

    fetchEnrolledCount(); // Call the fetch function for enrolled students
    fetchActiveFacultyCount(); // Call the fetch function for active faculty members
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className='card-container'>
      {info_details.map((item) => (
        <div className='card' key={item.title}>
          <div className='card-title'>
            <h2>{item.title}</h2>
          </div>
          <div className='card-number'>
            <h1>{item.title === 'Enrolled Students' ? enrolledCount : item.title === 'Faculty Members' ? activeFacultyCount : item.number}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin_Card;