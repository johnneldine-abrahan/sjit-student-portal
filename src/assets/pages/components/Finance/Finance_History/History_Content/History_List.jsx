import React from 'react'
import './History_Content.css'

const HistoryList = [
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
        viewRecords: '!'
    },
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
        viewRecords: '!'
    },
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
        viewRecords: '!'
    },
    {
        studentID: '21-05298',
        LastName: 'Sanchez',
        FirstName: 'Kim William',
        MiddleName: 'Bacsa',
        yearGraduated: '2025',
        viewRecords: '!'
    },
    
]

const History_List = () => {
  return (
    <div className='history-list'>
        <div className='recordslist-container'>
                {HistoryList.map((records) => (
                    <div className='list'>
                    <div className='announcement-details'>
                      <h3>{records.studentID}</h3>
                    </div>
                    <span>{records.LastName}</span>
                    <span>{records.FirstName}</span>
                    <span>{records.MiddleName}</span>
                    <span>{records.yearGraduated}</span>
                    <span>{records.viewRecords}</span>
                  </div>
                ))}
            </div>
      
    </div>
  )
}

export default History_List
