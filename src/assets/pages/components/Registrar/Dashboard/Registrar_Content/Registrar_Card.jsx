import React, { useEffect, useState } from 'react';
import './Registrar_Content.css';

const Registrar_Card = () => {
  const [enrolledCount, setEnrolledCount] = useState(0); // State for enrolled students count
  const [notEnrolledCount, setNotEnrolledCount] = useState(0); // State for not enrolled students count
  const [activeFacultyCount, setActiveFacultyCount] = useState(0); // State for active faculty count

  // Fetch data from the API
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const enrolledResponse = await fetch('https://san-juan-institute-of-technology-backend.onrender.com/count-enrolled-students');
        if (!enrolledResponse.ok) {
          throw new Error('Failed to fetch enrolled students count');
        }
        const enrolledData = await enrolledResponse.json();
        setEnrolledCount(enrolledData.enrolledCount); // Update state with enrolled count

        const notEnrolledResponse = await fetch('https://san-juan-institute-of-technology-backend.onrender.com/count-not-enrolled-students');
        if (!notEnrolledResponse.ok) {
          throw new Error('Failed to fetch not enrolled students count');
        }
        const notEnrolledData = await notEnrolledResponse.json();
        setNotEnrolledCount(notEnrolledData.notEnrolledCount); // Update state with not enrolled count

        const facultyResponse = await fetch('https://san-juan-institute-of-technology-backend.onrender.com/count-active-faculty');
        if (!facultyResponse.ok) {
          throw new Error('Failed to fetch active faculty count');
        }
        const facultyData = await facultyResponse.json();
        setActiveFacultyCount(facultyData.activeFacultyCount); // Update state with active faculty count
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts(); // Call the function to fetch counts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const info_details = [
    {
      title: 'Enrolled Students',
      number: enrolledCount // Use the fetched count
    },
    {
      title: 'Not Enrolled',
      number: notEnrolledCount // Use the fetched count
    },
    {
      title: 'Faculty Members',
      number: activeFacultyCount // Use the fetched count
    }
  ];

  return (
    <div className='card-container'>
      {info_details.map((item) => (
        <div className='card' key={item.title}>
          <div className='card-title'>
            <h2>{item.title}</h2>
          </div>
          <div className='card-number'>
            <h1>{item.number}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Registrar_Card;