import React, { useState, useEffect, useRef } from "react";
import "./Finance_Announcements.css";
import { BiEditAlt } from "react-icons/bi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";

const validateForm = (formData) => {
  const requiredFields = [
    "announce_to",
    "announcement_type",
    "announcement_title",
    "announcement_text",
  ];

  let isValid = true;
  let errorMessage = "";
  let firstErrorInput = null;

  requiredFields.forEach((field) => {
    if (!formData[field] || formData[field] === "") {
      document.querySelector(`[name="${field}"]`).classList.add("error");
      isValid = false;
      errorMessage += `${field} is required\n`;
      if (!firstErrorInput) {
        firstErrorInput = document.querySelector(`[name="${field}"]`);
      }
    } else {
      document.querySelector(`[name="${field}"]`).classList.remove("error");
    }
  });

  if (!isValid) {
    firstErrorInput.focus();
    //alert(errorMessage);
    return false;
  }

  return isValid;
};

const Popup_Add = ({ title, onClose, refreshAnnouncements }) => {
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
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/addAnnouncement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(announcementData),
    });

    if (response.status === 401) {
      console.log("Unauthorized - You are not authenticated");
    } else if (response.ok) {
      console.log("Announcement added successfully!");
      refreshAnnouncements(); // Refresh the announcements list
      onClose(); // Close the popup
    } else {
      console.error("Failed to add announcement:", response.statusText);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(announcementData)) {
      return;
    }
    addAnnouncement(announcementData);
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

const Popup_Edit = ({ title, onClose, announcement, refreshAnnouncements }) => {
  const [announcementData, setAnnouncementData] = useState({
    announce_to: "",
    announcement_type: "",
    announcement_title: "",
    announcement_text: "",
  });

  useEffect(() => {
    if (announcement) {
      setAnnouncementData({
        announce_to: announcement.announce_to || "",
        announcement_type: announcement.announcement_type || "",
        announcement_title: announcement.announcement_title || "",
        announcement_text: announcement.announcement_text || "",
      });
    }
  }, [announcement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(announcementData)) {
      return;
    }
    const token = localStorage.getItem("token");
    const id = announcement.id; // Ensure you're using the correct announcement ID

    try {
      const response = await fetch(
        `http://localhost:3000/updateAnnouncement/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(announcementData), // Send updated announcement data
        }
      );

      if (response.status === 401) {
        console.log("Unauthorized - You are not authenticated");
      } else if (response.ok) {
        console.log("Announcement updated successfully!");
        refreshAnnouncements(); // Refresh announcements after update
        onClose(); // Close the popup
      } else {
        console.error("Failed to update announcement:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
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
                <select
                  name="announce_to"
                  value={announcementData.announce_to}
                  onChange={handleChange}
                >
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
                <select
                  name="announcement_type"
                  value={announcementData.announcement_type}
                  onChange={handleChange}
                >
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
                  value={announcementData.announcement_title}
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
                  value={announcementData.announcement_text}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="buttons">
            <button type="submit" className="btn-box" name="edit" id="edit">
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Popup_Delete = ({
  title,
  onClose,
  selectedIds,
  refreshAnnouncements,
}) => {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:3000/deleteAnnouncements",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ announcementIds: selectedIds }),
        }
      );

      if (response.status === 401) {
        console.log("Unauthorized - You are not authenticated");
      } else if (response.ok) {
        console.log("Announcements deleted successfully!");
        refreshAnnouncements();
        onClose();
      } else {
        const errorText = await response.text(); // Get the response text
        console.error(
          "Failed to delete announcements:",
          response.statusText,
          errorText
        );
      }
    } catch (error) {
      console.error("Error deleting announcements:", error);
    }
  };

  return (
    <div className="popup-announcements">
      <div className="popup-header">
        <h3 className="popup-title">{title}</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="popup-content">
        <p>Are you sure you want to delete the selected announcements?</p>
        <div className="buttons">
          <button type="button" className="btn-box" onClick={handleDelete}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

const Popup_ViewDetails = ({ title, onClose, announcement }) => {
  return (
    <div className="popup-announcements">
      <div className="popup-header">
        <h3 className="popup-title">{title}</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="popup-content">
        <p>Title: {announcement.title}</p>
        <p>Preview: {announcement.text}</p>
        <p>Date/Time: {new Date(announcement.timestamp).toLocaleString()}</p>
        <p>User ID: {announcement.userId}</p>
      </div>
    </div>
  );
};

const Finance_Announcements = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenViewDetails, setIsOpenViewDetails] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const selectAllRef = useRef(); // Create a ref for the select-all checkbox

  // Function to fetch announcements
  const fetchAnnouncements = async () => {
    const token = localStorage.getItem("token");
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

  // Fetch announcements on component mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Refresh announcements after adding or editing
  const refreshAnnouncements = () => {
    fetchAnnouncements(); // Re-fetch the announcements
  };

  // Fetch a specific announcement by ID
  const fetchAnnouncementDetails = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/getAnnouncement/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data; // Return the fetched data
    } else {
      console.error(
        "Failed to fetch announcement details:",
        response.statusText
      );
    }
  };

  // Handle selecting announcement for editing
  const handleEdit = async (announcement) => {
    const details = await fetchAnnouncementDetails(announcement.id); // Fetch details using ID
    setSelectedAnnouncement(details); // Set the fetched details
    setIsOpenEdit(true); // Open the edit popup
  };

  const handleSelectAnnouncement = (id) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const handleSelectAll = () => {
    const newSelectAllChecked = !selectAllChecked;
    if (newSelectAllChecked) {
      setSelectedIds(announcements.map((announcement) => announcement.id)); // Select all
    } else {
      setSelectedIds([]); // Deselect all
    }
    setSelectAllChecked(newSelectAllChecked); // Toggle state
  };

  useEffect(() => {
    // Apply the indeterminate state explicitly after any update
    if (selectAllRef.current) {
      if (selectedIds.length > 0 && selectedIds.length < announcements.length) {
        selectAllRef.current.indeterminate = true;
      } else {
        selectAllRef.current.indeterminate = false;
      }
    }
  }, [selectedIds, announcements]);

  // Closing the edit popup
  const handleCloseEdit = () => {
    setIsOpenEdit(false);
    setSelectedAnnouncement(null); // Clear the selected announcement
  };

  const handleViewDetails = async (announcement) => {
    setIsOpenViewDetails(true);
    setSelectedAnnouncement(announcement);
  };

  const handleCloseViewDetails = () => {
    setIsOpenViewDetails(false);
    setSelectedAnnouncement(null);
  };

  const handleDeleteClick = () => {
    if (selectedIds.length > 0) {
      setIsOpenDelete(true);
    } else {
      setIsOpenDelete(true);
      setIsOpenDelete(true);
    }
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
                  refreshAnnouncements={refreshAnnouncements} // Pass the function to Popup_Add
                />
              </div>
            )}
          </div>
          <div className="icon-act">
            <RiDeleteBin6Line
              className="announcement-icon"
              onClick={handleDeleteClick}
            />
            {isOpenDelete && (
              <div>
                <div className="popup-blurred-background" />
                {selectedIds.length > 0 ? (
                  <Popup_Delete
                    title="Delete Announcement"
                    onClose={() => setIsOpenDelete(false)}
                    selectedIds={selectedIds} // Pass selected IDs
                    refreshAnnouncements={refreshAnnouncements}
                  />
                ) : (
                  <div className="popup-announcements">
                    <div className="popup-header">
                      <h3 className="popup-title">Delete Announcement</h3>
                      <button onClick={() => setIsOpenDelete(false)}>
                        Close
                      </button>
                    </div>
                    <div className="popup-content">
                      <p>Please select at least one announcement to delete.</p>
                    </div>
                  </div>
                )}
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
              <th>
                <input
                  type="checkbox"
                  ref={selectAllRef} // Assign the ref to the select-all checkbox
                  checked={selectAllChecked}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Announcement ID</th>
              <th>Title</th>
              <th>Preview</th>
              <th>Date/Time</th>
              <th>User ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <tr
                  key={announcement.id}
                  className={
                    selectedIds.includes(announcement.id) ? "checked" : ""
                  }
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(announcement.id)}
                      onChange={() => handleSelectAnnouncement(announcement.id)}
                    />
                  </td>
                  <td>{announcement.id}</td>
                  <td>{announcement.title}</td>
                  <td>{announcement.preview}...</td>
                  <td>{new Date(announcement.timestamp).toLocaleString()}</td>
                  <td>{announcement.userId}</td>
                  <td>
                    <button
                      className="view-details"
                      onClick={() => handleViewDetails(announcement)}
                    >
                      <FaRegEye size={20} />
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(announcement)}
                      style={{ marginLeft: "10px" }}
                    >
                      <BiEditAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No announcements found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isOpenEdit && (
        <div>
          <div className="popup-blurred-background" />
          <Popup_Edit
            title="Edit Announcement"
            onClose={handleCloseEdit}
            announcement={selectedAnnouncement} // Pass the selected announcement for editing
            refreshAnnouncements={refreshAnnouncements} // Pass the function to refresh announcements
          />
        </div>
      )}

      {isOpenViewDetails && (
        <div>
          <div
            className="popup-blurred-background"
            onClick={handleCloseViewDetails}
          />
          <Popup_ViewDetails
            title="View Details"
            onClose={handleCloseViewDetails}
            announcement={selectedAnnouncement}
          />
        </div>
      )}
    </div>
  );
};

export default Finance_Announcements;