import React, { useEffect } from 'react';
import './Enroll_Students_Content.css';
import defaultProfile from '../../../../../img/Profile/default_profile.png';

const Enroll_Student_Preview = ({ studentDetails, onStudentIdChange }) => {
  useEffect(() => {
    // Call the callback to pass student_id to the parent component when studentDetails changes
    if (studentDetails) {
      onStudentIdChange(studentDetails.student_id);
    }
  }, [studentDetails, onStudentIdChange]);

  if (!studentDetails) {
    return (
      <div className='student-profile-preview'>
        <div className='preview-details'>
          <div className='user-profile-preview'>
            <img src={defaultProfile} className='profile-pic' alt='Profile' />
          </div>
          <div className='student-enroll-info'>
            <h2>No data available</h2>
          </div>
        </div>
      </div>
    );
  }

  const { grade_level, strand, profile, program, student_status, full_name, semester, school_year } = studentDetails;

  const profileUrl = profile !== null ? `data:image/jpeg;base64,${profile}` : defaultProfile;

  return (
    <div className='student-profile-preview'>
      <div className='preview-details'>
        <div className='user-profile-preview'>
          <img src={profileUrl} className='profile-pic' alt='Profile' />
        </div>
        <div className='student-enroll-info'>
          <h3>{studentDetails.student_id}</h3>
          <h2>{full_name}</h2>
          <h3>{program}</h3>
          <h3>{school_year}, {semester}</h3>
          <h3>Grade {grade_level}</h3>
          <h3>{strand}</h3>
          <h3 className='status'>{student_status}</h3>
        </div>
      </div>
    </div>
  );
};

export default Enroll_Student_Preview;