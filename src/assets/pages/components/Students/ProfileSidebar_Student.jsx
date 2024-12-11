import React, { useState, useEffect, useRef } from "react";
import "../../Students/Students_module.css";
import Notifications_Student from "./Notifications_Student";
import { BiEditAlt } from "react-icons/bi";
import defaultProfilePic from "../../../img/Profile/default_profile.png"; // Adjust the path as necessary
import axios from "axios"; // Import axios for making API calls

const ProfileSidebar_Student = () => {
  const [studentData, setStudentData] = useState({
    fullName: "",
    program: "",
    gradeLevel: "",
    schoolYear: "",
    semester: "",
    enrollmentStatus: "",
    profile: defaultProfilePic, // Set default profile picture
  });
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  // Reference for the file input
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Decode JWT token to extract student info
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setStudentData({
        fullName: decodedToken.fullName,
        program: decodedToken.program,
        gradeLevel: decodedToken.gradeLevel,
        schoolYear: decodedToken.schoolYear,
        semester: decodedToken.semester,
        enrollmentStatus: decodedToken.enrollmentStatus,
        profile:
          decodedToken.profile && decodedToken.profile.trim() !== ""
            ? decodedToken.profile
            : defaultProfilePic, // Use default if profile is null or empty
      });
      setFormData({
        firstName: decodedToken.firstName || "",
        lastName: decodedToken.lastName || "",
        username: decodedToken.username || "",
        password: "",
      });
    }
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            "https://san-juan-institute-of-technology-backend.onrender.com/gen/profile/fetch",
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request headers
              },
            }
          );

          const { first_name, last_name, user_id } = response.data;

          // Update studentData and formData with the fetched data
          setStudentData((prevData) => ({
            ...prevData,
            fullName: `${first_name} ${last_name}`,
            profile: defaultProfilePic, // You can set a profile picture URL if available
          }));

          setFormData({
            firstName: first_name,
            lastName: last_name,
            username: user_id, // Assuming user_id is used as username
            password: "",
          });
        } catch (error) {
          console.error("Error fetching profile data:", error);
          // Handle error (e.g., show a notification)
        }
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showPopup]);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "https://san-juan-institute-of-technology-backend.onrender.com/update-password",
        { newPassword: formData.password },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      if (response.status === 200) {
        alert("Password updated successfully");
        setShowPopup(false); // Close the popup after successful update
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  // Function to handle profile picture click
  const handleProfilePictureClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentData((prevData) => ({
          ...prevData,
          profile: reader.result, // Update profile picture
        }));
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  return (
    <aside className="profileSidebar">
      <div className="profileCard">
        <div className="profileHeader">
          <h2 className="profileTitle">Profile</h2>
          <BiEditAlt
            className="profile-icon"
            onClick={() => setShowPopup(true)}
          />
        </div>
        <div className="profileImage">
          <img
            src={studentData.profile}
            alt="Profile"
            className="profile-picture"
            onClick={handleProfilePictureClick} // Add click event to the image
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide the file input
            onChange={handleFileChange} // Handle file selection
            accept="image/*" // Accept only image files
          />
        </div>
        <div className="student-details">
          <h2 className="studentName">{studentData.fullName}</h2>
          <div className="sub-details">
            <p className="studentClass">{studentData.program}</p>
            <p className="studentClass">Grade {studentData.gradeLevel}</p>
            <p className="academicYear">
              {studentData.schoolYear}, {studentData.semester}
            </p>
            <p className="enrollmentStatus">{studentData.enrollmentStatus}</p>
          </div>
        </div>
      </div>
      <Notifications_Student />

      {showPopup && (
        <>
          <div className="popup-blurred-background" />
          <div className="popup">
            <div className="popup-header">
              <h3 className="popup-title">Edit Profile</h3>
              <button
                className="close-button"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
            <div className="popup-content">
              <form onSubmit={handleEditProfile}>
                <div className="change-profile">
                  <div className="profileImage">
                    <img
                      src={studentData.profile}
                      alt="Profile"
                      className="profile-picture"
                      onClick={handleProfilePictureClick}
                    />{" "}
                    {/* Display profile picture in popup */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }} // Hide the file input
                      onChange={handleFileChange} // Handle file selection
                      accept="image/*" // Accept only image files
                    />
                  </div>
                </div>
                <div className="first-row">
                  <div className="input-box">
                    <label>
                      First Name{" "}
                      <input
                        disabled
                        type="text"
                        name="first_name"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                  <div className="input-box">
                    <label>
                      Last Name{" "}
                      <input
                        disabled
                        type="text"
                        name="last_name"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="second-row">
                  <div className="input-box">
                    <label>
                      Username{" "}
                      <input
                        disabled
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                      />
                    </label>
                  </div>
                  <div className="input-box">
                    <label>
                      Password{" "}
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="buttons ">
                  <button type="submit" className="btn-box" name="add" id="add">
                    Done
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

export default ProfileSidebar_Student;