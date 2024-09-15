import React from 'react'
import './Enroll_Students_Content.css'

const subjectList = [
    {
        subjectID: 'FILI-9',
        subjectName: 'Filipino 9',
        semester: 'FIRST'
    },
    {
        subjectID: 'ENG-9',
        subjectName: 'English 9',
        semester: 'FIRST'
    },
    {
        subjectID: 'MATH-9',
        subjectName: 'Mathematics 9',
        semester: 'FIRST'
    },
    {
        subjectID: 'SCI-9',
        subjectName: 'Science 9',
        semester: 'FIRST'
    },
    {
        subjectID: 'AP-9',
        subjectName: 'Araling Panlipunan 9',
        semester: 'FIRST'
    },
]

const Enroll_SubjectsList = () => {
  return (
    <div className='subject-list'>
        <div className='recordslist-container'>
                {subjectList.map((records) => (
                    <div className='list' key={records.subjectID}>
                        <span>{records.subjectID}</span>
                        <div className='subject-name'>
                            <h3>{records.subjectName}</h3>
                        </div>
                        <span>{records.semester}</span>
                        <span className='view-details-link' onClick={() => handlePopup(records)}>Add Subject</span>
                    </div>
                ))}
        </div>
      
    </div>
  )
}

export default Enroll_SubjectsList
