import React, {useState} from 'react'
import './Admin_Profile.css'
import { BiEditAlt } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Admin_ProfileHeader = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    navigate('/login')
  }

  const handleEdit = () => {
    setShowPopup(true);
  }

  const handleClose = () => {
    setShowPopup(false);
  }

  return (
    <div className="admin-p_header">
        <h2 className='profile-title'>Profile</h2>
        <div className='buttons-header'>
          <div className='profile-act'>
            <BiEditAlt class='profile-icon' onClick={handleEdit} />
          </div>
          <div className='profile-act'>
            <LuLogOut className='profile-icon' onClick={handleLogout} />
          </div>
        </div>
        {showPopup && (
        <>
          <div className="popup-blurred-background" />
          <div className="popup">
            <div className="popup-header">
              <h3 className="popup-title">Edit Profile</h3>
              <button className="close-button" onClick={handleClose}>X</button>
            </div>
            <div className="popup-content">
              <p>Edit profile content will go here</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Admin_ProfileHeader
