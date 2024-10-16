import React from 'react';
import './Enroll_Students_Content.css';
import defaultProfile from '../../../../../img/Profile/default_profile.png';

const Enroll_Student_Preview = ({ studentDetails }) => {
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

  const { student_id, grade_level, strand, profile, program, student_status, full_name, semester, school_year } = studentDetails;

  console.log('defaultProfile:', defaultProfile); // Add this line to log the defaultProfile value

  // Use the default profile image if the profile is null
  const profileUrl = profile !== null ? `data:image/jpeg;base64,${profile}` : defaultProfile;

  console.log('profileUrl:', profileUrl); // Add this line to log the profileUrl value

  return (
    <div className='student-profile-preview'>
      <div className='preview-details'>
        <div className='user-profile-preview'>
          <img src={profileUrl} className='profile-pic' alt='Profile' />
        </div>
        <div className='student-enroll-info'>
          <h3>{student_id}</h3>
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