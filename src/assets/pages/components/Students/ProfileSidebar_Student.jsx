import React, { useState, useEffect } from 'react';
import '../../Students/Students_module.css';
import Notifications_Student from './Notifications_Student';

const ProfileSidebar_Student = () => {
  const [studentData, setStudentData] = useState({
    fullName: '',
    program: '',
    gradeLevel: '',
    schoolYear: '',
    semester: '',
    enrollmentStatus: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Decode JWT token to extract student info
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setStudentData({
        fullName: decodedToken.fullName,
        program: decodedToken.program,
        gradeLevel: decodedToken.gradeLevel,
        schoolYear: decodedToken.schoolYear,
        semester: decodedToken.semester,
        enrollmentStatus: decodedToken.enrollmentStatus
      });
    }
  }, []);

  return (
    <aside className='profileSidebar'>
      <div className='profileCard'>
        <div className='profileHeader'>
          <h2 className='profileTitle'>Profile</h2>
        </div>
        <div className='profileImage' />
        <div className='student-details'>
          <h2 className='studentName'>{studentData.fullName}</h2>
          <div className='sub-details'>
            <p className='studentClass'>{studentData.program}</p>
            <p className='studentClass'>{studentData.gradeLevel}</p>
            <p className='academicYear'>{studentData.schoolYear}, {studentData.semester}</p>
            <p className='enrollmentStatus'>{studentData.enrollmentStatus}</p>
          </div>
        </div>
        
      </div>
      <Notifications_Student />
    </aside>
  );
};

export default ProfileSidebar_Student;
