import React, { useState } from 'react';
import '../../Dashboard/Registrar_Sidebar/Registrar_Sidebar.css';
import { BiHome, BiArchiveIn } from "react-icons/bi";
import { PiStudentBold } from "react-icons/pi";
import { GiArchiveRegister } from "react-icons/gi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { MdOutlineSwitchAccount } from "react-icons/md";
import menu_logo from '../../../../../img/Sidebar/menu-logo.png';

const Popup = ({ title, onClose }) => {
  return (
    <div className="popup-sidebar">
      <div className="popup-sidebar-header">
        <h3 className="popup-sidebar-title">{title}</h3>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
      <div className="popup-content">
        <p>
        You do not have the necessary permissions to access this resource. Only administrators are allowed to view this section. Please contact your system administrator if you believe this is an error.
        </p>
      </div>
    </div>
  );
};

const Archive_Sidebar = () => {
  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='menu'>
      <div className='menu-logo'>
        <img src={menu_logo} alt="" />
        <h2>SJIT</h2>
      </div>
      <div className='menu-list'>
        <a href='/registrar/dashboard' className='item'><BiHome size={18}/>Dashboard</a>
        <a href='/registrar/student-list' className='item'><PiStudentBold size={18}/>Students</a>
        <a href='/registrar/enroll-students' className='item'><GiArchiveRegister size={18}/>Enroll Student</a>
        <a href='#' className='item' onClick={() => openModal('Faculty Members')}><FaChalkboardTeacher size={18}/>Faculty Members</a>
        <a href='#' className='item' onClick={() => openModal('Manage Schedule')}><AiFillSchedule size={18}/>Manage Schedule</a>
        <a href='#' className='item' onClick={() => openModal('Manage Accounts')}><MdOutlineSwitchAccount size={18}/>Manage Accounts</a>
        <a href='/registrar/archive' className='item active'><BiArchiveIn size={18}/>Archive</a>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Popup title={modalContent} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Archive_Sidebar;