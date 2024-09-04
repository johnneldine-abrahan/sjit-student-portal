import React from 'react'
import './Admin_Announcements.css'
import { BiEditAlt } from "react-icons/bi";

const announcements = [
    {
        title: 'Announcement1',
        details: 'The new policy will be implemented starting next month to improve the overall efficiency of the company. All employees are required to attend a training session to learn about the changes and how to adapt to them. The management team is confident that this new policy will bring positive results and increase productivity.',
        view: 'View Details',
        edit: <BiEditAlt />
    },

    {
        title: 'Announcement2',
        details: 'Genshin Impact is an open-world action role-playing game developed and published by miHoYo. It is a fantasy game where you play as a character called the Traveller, exploring a vast world called Teyvat. ',
        view: 'View Details',
        edit: <BiEditAlt />
    },

    {
        title: 'Announcement3',
        details: 'We are thrilled to announce that enrollment for [Program/Course Name] is now open!',
        view: 'View Details',
        edit: <BiEditAlt />
    },

    {
        title: 'Announcement4',
        details: 'We are thrilled to announce that enrollment for [Program/Course Name] is now open!',
        view: 'View Details',
        edit: <BiEditAlt />
    },

]

const Admin_Announcements = () => {
  return (
    <div className='admin-announcements'>
        <div className='announcement-list'>
            <h2>Announcements</h2>
        </div>
        <div className='list-container'>
            {announcements.map((announcement) => (
                <div className='list'>
                <div className='announcement-details'>
                  <h3>{announcement.title}</h3>
                </div>
                <span className='details'>{announcement.details}</span>
                <span>{announcement.view}</span>
                <span>{announcement.edit}</span>
              </div>
            ))}
        </div>
      
    </div>
  )
}

export default Admin_Announcements