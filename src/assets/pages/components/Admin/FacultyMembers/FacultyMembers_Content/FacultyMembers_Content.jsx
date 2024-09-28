import React, { useEffect, useState } from 'react';
import './FacultyMembers_Content.css';
import FacultyMembers_ContentHeader from './FacultyMembers_ContentHeader';
import FacultyMembers_List from './FacultyMembers_List';

const FacultyMembers_Content = () => {
  const [facultyList, setFacultyList] = useState([]);

  const fetchFaculties = async () => {
    try {
      const response = await fetch('http://localhost:3000/faculties');
      if (!response.ok) {
        throw new Error('Failed to fetch faculty data');
      }
      const data = await response.json();
      setFacultyList(data);
    } catch (error) {
      console.error('Error fetching faculty data:', error);
      alert('Failed to load faculty list: ' + error.message);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  return (
    <div className='FacultyMembers_content'>
      <FacultyMembers_ContentHeader refreshFacultyList={fetchFaculties} />
      <FacultyMembers_List facultyList={facultyList} />
    </div>
  );
};

export default FacultyMembers_Content;
