import React, { useState } from 'react';
import './Enroll_Students_Content.css';
import Enroll_Students_ContentHeader from './Enroll_Students_ContentHeader';
import Enroll_SubjectsList from './Enroll_SubjectsList';
import Enroll_Student_Preview from './Enroll_Student_Preview';

const Enroll_Students_Content = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentId, setStudentId] = useState(null); // State to hold student_id

  const handleStudentSelected = (studentDetails) => {
    setSelectedStudent(studentDetails);
  };

  const handleStudentIdChange = (id) => {
    setStudentId(id); // Update the studentId state
  };

  return (
    <div className="admin-enroll_content">
      <Enroll_Students_ContentHeader onStudentSelected={handleStudentSelected} />
      <Enroll_Student_Preview studentDetails={selectedStudent} onStudentIdChange={handleStudentIdChange} />
      {selectedStudent && (
        <Enroll_SubjectsList 
          gradeLevel={selectedStudent.grade_level} 
          strand={selectedStudent.strand} 
          studentId={studentId} // Pass studentId to Enroll_SubjectsList
        />
      )}
    </div>
  );
};

export default Enroll_Students_Content;