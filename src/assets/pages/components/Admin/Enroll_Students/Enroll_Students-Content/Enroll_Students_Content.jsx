import React, { useState } from 'react';
import './Enroll_Students_Content.css';
import Enroll_Students_ContentHeader from './Enroll_Students_ContentHeader';
import Enroll_SubjectsList from './Enroll_SubjectsList';
import Enroll_Student_Preview from './Enroll_Student_Preview';

const Enroll_Students_Content = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentSelected = (studentDetails) => {
    setSelectedStudent(studentDetails);
  };

  return (
    <div className="admin-enroll_content">
      <Enroll_Students_ContentHeader onStudentSelected={handleStudentSelected} />
      <Enroll_Student_Preview studentDetails={selectedStudent} />
      {selectedStudent && (
        <Enroll_SubjectsList gradeLevel={selectedStudent.grade_level} strand={selectedStudent.strand} />
      )}
    </div>
  );
};

export default Enroll_Students_Content;