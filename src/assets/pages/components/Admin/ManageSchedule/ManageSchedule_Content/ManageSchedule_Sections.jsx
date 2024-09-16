import React from 'react'
import './ManageSchedule_Content.css'

const SectionList = [
    {
        yearLevel: 'Grade 7',
        section: 'Masikap',
        slots: '35',
        semester: 'FIRST',
        subject: '0/9',
        add: 'Add Subjects'
    },
    {
        yearLevel: 'Grade 8',
        section: 'Milflores',
        slots: '35',
        semester: 'FIRST',
        subject: '0/9',
        add: 'Add Subjects'
    },
    {
        yearLevel: 'Grade 9',
        section: 'Luna',
        slots: '35',
        semester: 'FIRST',
        subject: '0/9',
        add: 'Add Subjects'
    },
    {
        yearLevel: 'Grade 10',
        section: 'Guijo',
        slots: '35',
        semester: 'FIRST',
        subject: '0/9',
        add: 'Add Subjects'
    }

]

const ManageSchedule_Sections = () => {
  return (
    <div className='section-list'>
      <div className='recordslist-container'>
        {SectionList.map((records) => (
            <div className='list'>
                <span>{records.yearLevel}</span>
                <h3>{records.section}</h3>
                <span>{records.slots}</span>
                <span>{records.semester}</span>
                <span>{records.subject}</span>
                <span className='add-subject-link'>{records.add}</span>
            </div>
        ))}

      </div>
    </div>
  )
}

export default ManageSchedule_Sections
