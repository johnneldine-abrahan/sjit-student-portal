import React, {useState} from 'react'
import './Admin_Profile.css'
import { BiEditAlt } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import Profile from '../../../../../img/Profile/ProfileSample.jpg'

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
              <button className="close-button" onClick={handleClose}>Close</button>
            </div>
            <div className="popup-content">
              <form>
              <div className='change-profile'>
                <img src={Profile} alt="" />
              </div>
              <div className="first-row">
                <div className="input-box">
                  <label>First Name <input type='text' name='first_name' /></label>
                </div>
                <div className='input-box'>
                  <label>Last Name <input type='text' name='last_name' /></label>
                </div>
              </div>

              <div className='second-row'>
                <div className='input-box'>
                  <label>Username <input type='text' name='username' /></label>
                </div>
                <div className='input-box'>
                  <label>Password <input type='text' name='password' /></label>
                </div>
              </div>

              <div class='buttons'>
                <button type="submit" class="btn-box" name="add" id="add">Done</button>
              </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Admin_ProfileHeader
