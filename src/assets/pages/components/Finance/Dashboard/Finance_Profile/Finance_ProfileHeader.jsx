import React, { useState, useRef, useEffect } from "react";
import "./Finance_Profile.css";
import { BiEditAlt } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Profile from "../../../../../img/Profile/ProfileSample.jpg";
import axios from "axios";

const Finance_ProfileHeader = () => {
  const navigate = useNavigate();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({
    show: false,
    message: "",
  });
  const [profileImage, setProfileImage] = useState(Profile); // Default profile image
  const fileInputRef = useRef(null); // Reference for the file input
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    user_id: "",
  });
  const [newPassword, setNewPassword] = useState(""); // State for new password

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from local storage
        const response = await axios.get(
          "https://san-juan-institute-of-technology-backend.onrender.com/gen/profile/fetch",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set the token in the Authorization header
            },
          }
        );
        setUserData(response.data); // Set the user data
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Handle error (e.g., show a notification)
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    setIsModalOpen({
      show: true,
      message: "Are you sure you want to log out?",
    });
  };

  const handleClose = () => {
    setIsModalOpen({
      show: false,
      message: "",
    });
  };

  const handleConfirmLogout = () => {
    console.log("Logging out...");
    setIsModalOpen({
      show: false,
      message: "",
    });
    localStorage.clear("token");
    navigate("/login");
  };

  const handleEditClick = () => {
    setIsEditPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsEditPopupOpen(false);
    setNewPassword(""); // Clear the new password field when closing the popup
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the new profile image
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await axios.put(
        "https://san-juan-institute-of-technology-backend.onrender.com/update-password",
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the token in the Authorization header
          },
        }
      );
      console.log(response.data.message); // Show success message
      alert("Password changed successfully!"); // Alert for successful password change
      handlePopupClose(); // Close the popup after updating
    } catch (error) {
      console.error("Error updating password:", error);
      // Handle error (e.g., show a notification)
    }
  };

  return (
    <div className="finance-profile-header">
      <h2 className="profile-title">Profile</h2>
      <div className="buttons-header">
        <div className="profile-act">
          <BiEditAlt className="profile-icon" onClick={handleEditClick} />
        </div>
        <div className="profile-act">
          <LuLogOut className="profile-icon" onClick={handleLogout} />
        </div>
      </div>
      {isEditPopupOpen && (
        <>
          <div className="popup-blurred-background" />
          <div className=" popup">
            <div className="popup-header">
              <h3 className="popup-title">Edit Profile</h3>
              <button className="close-button" onClick={handlePopupClose}>
                Close
              </button>
            </div>
            <div className="popup-content">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePasswordUpdate(e); // Call the password update function
                }}
              >
                <div
                  className="change-profile"
                  onClick={handleProfilePictureClick}
                >
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="profile-image"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*" // Accept only image files
                  />
                </div>

                <div className="first-row">
                  <div className="input-box">
                    <label>
                      First Name{" "}
                      <input
                        type="text"
                        name="first_name"
                        value={userData.first_name}
                        readOnly
                      />
                    </label>
                  </div>
                  <div className="input-box">
                    <label>
                      Last Name{" "}
                      <input
                        type="text"
                        name="last_name"
                        value={userData.last_name}
                        readOnly
                      />
                    </label>
                  </div>
                </div>

                <div className="second-row">
                  <div className="input-box">
                    <label>
                      Username{" "}
                      <input
                        type="text"
                        name="username"
                        value={userData.user_id}
                        readOnly
                      />
                    </label>
                  </div>
                  <div className="input-box">
                    <label>
                      New Password{" "}
                      <input
                        type="password"
                        name="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} // Update new password state
                      />
                    </label>
                  </div>
                </div>

                <div className="buttons">
                  <button type="submit" className="btn-box" name="add" id="add">
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {isModalOpen.show && (
        <div className="modalOverlay" onClick={handleClose} />
      )}
      {isModalOpen.show && (
        <div className="modal-logout">
          <div className="modalHeader">
            <h3 className="modalTitle">Log out</h3>
            <button className="modalCloseButton" onClick={handleClose}>
              Close
            </button>
          </div>
          <div className="modalBody">
            <p>{isModalOpen.message}</p>
            <div className="buttons">
              <button
                type="button"
                className="btn-box"
                name="add"
                id="add"
                onClick={handleConfirmLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance_ProfileHeader;
