import React from 'react'
import './Admin_Announcements.css'

const announcements = [
    {
        title: 'Announcement1',
        details: 'lorem ipsum dolor...',
        view: 'View Details',
        edit: ''
    },

    {
        title: 'Announcement2',
        details: 'lorem ipsum dolor...',
        view: 'View Details',
        edit: ''
    },

    {
        title: 'Announcement3',
        details: 'lorem ipsum dolor...',
        view: 'View Details',
        edit: ''
    },

    {
        title: 'Announcement4',
        details: 'lorem ipsum dolor...',
        view: 'View Details',
        edit: ''
    },

    {
        title: 'Announcement5',
        details: 'lorem ipsum dolor...',
        view: 'View Details',
        edit: ''
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
                    <span>{announcement.details}</span>
                    <span>{announcement.view}</span>
                    <span>{announcement.edit}</span>
                </div>
            ))}
        </div>
      
    </div>
  )
}

export default Admin_Announcements
