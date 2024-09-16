import React from 'react'
import './Admin_Announcements.css'
import { BiEditAlt } from "react-icons/bi";
import { RiAddLargeFill, RiDeleteBin6Line} from "react-icons/ri";

const announcements = [
    {
        title: 'Announcement1',
        details: 'The new policy will be implemented starting next month to improve the overall efficiency of the company. All employees are required to attend a training session to learn about the changes and how to adapt to them. The management team is confident that this new policy will bring positive results and increase productivity.',
        view: 'View Details',
    },

    {
        title: 'Announcement2',
        details: 'Genshin Impact is an open-world action role-playing game developed and published by miHoYo. It is a fantasy game where you play as a character called the Traveller, exploring a vast world called Teyvat. ',
        view: 'View Details',
    },

    {
        title: 'Announcement3',
        details: 'We are thrilled to announce that enrollment for [Program/Course Name] is now open!',
        view: 'View Details',
    },

    {
        title: 'Announcement4',
        details: 'We are thrilled to announce that enrollment for [Program/Course Name] is now open!',
        view: 'View Details',
    },

];

const Popup_Add = ({ title, onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission logic here
        handleClose();  // Close the popup after submitting
      };

    return(
        <div className='popup-announcements'>
            <div className='popup-header'>
                <h3 className='popup-title'>{title}</h3>
                <button onClick={onClose}>Close</button>
            </div>
            <div className='popup-content'>
                <form onSubmit={handleSubmit}>
                    <div className='first-row'>
                        <div className='input-box'>
                            <label>Announce to
                                <select>
                                    <option value='student'>Students</option>
                                    <option value='faculty'>Teachers</option>
                                    <option value='finance'>Finance</option>
                                    <option value='all'>All</option>
                                </select>
                            </label>
                        </div>
                        <div className='input-box'>
                            <label>Announce type
                                <select>
                                    <option value='event'>Event</option>
                                    <option value='meeting'>Meeting</option>
                                    <option value='misc'>Misc</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className='second-row'>
                        <div className='input-box'>
                            <label>Announcement Title<input type='text' name='textAnnouncement' /></label>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

const Popup_Edit = ({ title, onClose }) => {
    return(
        <div className='popup-announcements'>
            <div className='popup-header'>
                <h3 className='popup-title'>{title}</h3>
                <button onClick={onClose}>Close</button>
            </div>
            <div className='popup-content'>
                <div className='form'>
                    
                </div>
            </div>
        </div>
    );
};

const Popup_Delete = ({ title, onClose }) => {
    return(
        <div className='popup'>
            <div className='popup-header'>
                <h3 className='popup-title'>{title}</h3>
                <button onClick={onClose}>Close</button>
            </div>
            <div className='popup-content'>
                <div className='form'>
                    
                </div>
            </div>
        </div>
    );
};


const Admin_Announcements = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = React.useState({});
    const [isOpenEdit, setIsOpenEdit] = React.useState(false);
    const [isOpenAdd, setIsOpenAdd] = React.useState(false);
    const [isOpenDelete, setIsOpenDelete] = React.useState(false);

    const handleOpen = (announcement) => {
        setIsOpen(true);
        setSelectedAnnouncement(announcement);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpenAdd = () => {
        setIsOpenAdd(true);
    }

    const handleOpenEdit = () => {
        setIsOpenEdit(true);
    }
    
    const handleOpenDelete = () => {
        setIsOpenDelete(true);
    }

    const handleCloseAdd = () => {
        setIsOpenAdd(false);
    }

    const handleCloseEdit = () => {
        setIsOpenEdit(false);
    }

    const handleCloseDelete = () => {
        setIsOpenDelete(false);
    }

  return (
    <div className='admin-announcements'>
        <div className='announcement-list'>
            <h2>Announcements</h2>
            <div className='announcement-action'>
                <div className='icon-act'>
                    <RiAddLargeFill className='announcement-icon' onClick={handleOpenAdd}/>
                    {isOpenAdd && (
                        <div>
                            <div className='popup-blurred-background' />
                            <Popup_Add title='Add Announcement' onClose={handleCloseAdd} />
                        </div>
                    )}
                </div>
                <div className='icon-act'>
                    <BiEditAlt className='announcement-icon' onClick={handleOpenEdit}/>
                    {isOpenEdit && (
                        <div>
                            <div className='popup-blurred-background' />
                            <Popup_Edit title='Edit Announcement' onClose={handleCloseEdit} />
                        </div>
                    )}
                </div>
                <div className='icon-act'>
                    <RiDeleteBin6Line className='announcement-icon' onClick={handleOpenDelete} />
                    {isOpenDelete && (
                        <div>
                            <div className='popup-blurred-background' />
                            <Popup_Delete title='Delete Announcement' onClose={handleCloseDelete} />
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className='list-container'>
            {announcements.map((announcement) => (
                <div className='list'>
                <div className='announcement-details'>
                  <h3>{announcement.title}</h3>
                </div>
                <span className='details'>{announcement.details}</span>
                <span className='view-details-link' onClick={() => handleOpen(announcement)}>{announcement.view}</span>
              </div>
            ))}
        </div>
        {isOpen && (
        <div>
          <div className='popup-blurred-background' />
          <div className='popup'>
            <div className='popup-header'>
              <h3 className='popup-title'>{selectedAnnouncement.title}</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className='popup-content'>
              <p>{selectedAnnouncement.details}</p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default Admin_Announcements