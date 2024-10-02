import React, { useState, useEffect } from "react";
import "./Admin_Announcements.css";
import { BiEditAlt } from "react-icons/bi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";

import { FaRegEye } from "react-icons/fa";

const Popup_Add = ({ title, onClose }) => {
  const [announcementData, setAnnouncementData] = useState({
    announce_to: "",
    announcement_type: "",
    announcement_title: "",
    announcement_text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addAnnouncement = async (announcementData) => {
    const token = localStorage.getItem("token"); // Assuming you're storing the token in localStorage

    const response = await fetch("http://localhost:3000/addAnnouncement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Adding the token in the Authorization header
      },
      body: JSON.stringify(announcementData),
    });

    if (response.status === 401) {
      console.log("Unauthorized - You are not authenticated");
    } else if (response.ok) {
      console.log("Announcement added successfully!");
      onClose(); // Close popup after successful submission
    } else {
      console.error("Failed to add announcement:", response.statusText);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnnouncement(announcementData); // Call API when form is submitted
  };

  return (
    <div className="popup-announcements">
      <div className="popup-header">
        <h3 className="popup-title">{title}</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
          <div className="first-row">
            <div className="input-box">
              <label>
                Announce to
                <select name="announce_to" onChange={handleChange}>
                  <option value=""></option>
                  <option value="Student">Students</option>
                  <option value="Faculty">Teachers</option>
                  <option value="Finance">Finance</option>
                  <option value="All">All</option>
                </select>
              </label>
            </div>
            <div className="input-box">
              <label>
                Announcement type
                <select name="announcement_type" onChange={handleChange}>
                  <option value=""></option>
                  <option value="Reminder">Reminder</option>
                  <option value="Event">Event</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Misc">Misc</option>
                </select>
              </label>
            </div>
          </div>

          <div className="second-row">
            <div className="input-box">
              <label>
                Announcement Title
                <input
                  type="text"
                  name="announcement_title"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="third-row">
            <div className="input-box">
              <label>
                Announcement Details
                <textarea
                  name="announcement_text"
                  rows={5}
                  cols={40}
                  onChange={handleChange}
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
  );
};

const Popup_Edit = ({ title, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // Handle form submission logic here
    onClose(); // Close the popup after submitting
  };

  return (
    <div className="popup-announcements">
      <div className="popup-header">
        <h3 className="popup-title">{title}</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="popup-content">
        <form onSubmit={handleSubmit}>
          <div className="first-row">
            <div className="input-box">
              <label>
                Announce to
                <select>
                  <option value=""></option>
                  <option value="Student">Students</option>
                  <option value="Faculty">Teachers</option>
                  <option value="Finance">Finance</option>
                  <option value="All">All</option>
                </select>
              </label>
            </div>
            <div className="input-box">
              <label>
                Announce type
                <select>
                  <option value=""></option>
                  <option value="Reminder">Reminder</option>
                  <option value="Event">Event</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Misc">Misc</option>
                </select>
              </label>
            </div>
          </div>

          <div className="second-row">
            <div className="input-box">
              <label>
                Announcement Title
                <input type="text" name="textAnnouncement" />
              </label>
            </div>
          </div>

          <div className="third-row">
            <div className="input-box">
              <label>
                Announcement Details
                <textarea name="announcement-details" rows={5} cols={40} />
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
  );
};

const Popup_Delete = ({ title, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-header">
        <h3 className="popup-title">{title}</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="popup-content">
        <p>
          Are you sure you want to delete the selected announcement? This action
          cannot be undone.
        </p>
        <div className="buttons">
          <button type="submit" className="btn-box" name="delete" id="delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Admin_Announcements = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  // Fetch announcements on component mount
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const token = localStorage.getItem("token"); // Assuming you have a token stored in localStorage
      const response = await fetch("http://localhost:3000/announcements", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data);
      } else {
        console.error("Failed to fetch announcements:", response.statusText);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleSelectAnnouncement = (index) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(index)
        ? prevSelectedIds.filter((id) => id !== index)
        : [...prevSelectedIds, index]
    );
  };

  return (
    <div className="admin-announcements">
      <div className="announcement-list">
        <h2>Announcements</h2>
        <div className="announcement-action">
          <div className="icon-act">
            <RiAddLargeFill
              className="announcement-icon"
              onClick={() => setIsOpenAdd(true)}
            />
            {isOpenAdd && (
              <div>
                <div className="popup-blurred-background" />
                <Popup_Add
                  title="Add Announcement"
                  onClose={() => setIsOpenAdd(false)}
                />
              </div>
            )}
          </div>

          <div className="icon-act">
            <RiDeleteBin6Line
              className="announcement-icon"
              onClick={() => setIsOpenDelete(true)}
            />
            {isOpenDelete && (
              <div>
                <div className="popup-blurred-background" />
                <Popup_Delete
                  title="Delete Announcement"
                  onClose={() => setIsOpenDelete(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Display announcements in a table format */}
      <div className="announcement-table">
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Title</th>
              <th>Preview</th>
              <th>Date/Time</th>
              <th>User ID</th> {/* New column for user_id */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement, index) => (
              <tr
                key={index}
                className={selectedIds.includes(index) ? "checked" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(index)}
                    onChange={() => handleSelectAnnouncement(index)}
                  />
                </td>
                <td>{announcement.title}</td>
                <td>{announcement.preview}...</td>
                <td>{new Date(announcement.timestamp).toLocaleString()}</td>
                <td>{announcement.userId}</td> {/* Display user_id */}
                <td>
                  <span
                    className="view-details-link"
                    onClick={() => handlePopup(record)}
                  >
                    <FaRegEye />
                  </span>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(record)}
                    style={{ marginLeft: "10px" }}
                  >
                    <BiEditAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin_Announcements;