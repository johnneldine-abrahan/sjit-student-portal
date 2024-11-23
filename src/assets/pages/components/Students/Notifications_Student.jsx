import React, { useState, useEffect } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import '../../Students/Students_module.css';

const Notifications_Student = () => {
  const [notifications, setNotifications] = useState([]); // Ensure this is an array
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);

  // Fetch announcements from the back-end
  const fetchNotifications = async () => {
    try {
      const response = await fetch('https://san-juan-institute-of-technology-backend.onrender.com/announcements/students'); // Adjust the URL if necessary
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data); // Log the data to check its structure
      setNotifications(data); // Set notifications directly to the response data
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNotifications();

    // Set up polling
    const interval = setInterval(fetchNotifications, 5000); // Fetch new notifications every 5 seconds
    setPollingInterval(interval);

    // Cleanup function to clear the interval when component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedNotification(null);
  };

  // Effect to handle body overflow
  useEffect(() => {
    if (isPopupVisible) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'unset'; // Enable scrolling
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPopupVisible]);

  return (
    <section className='notificationSection'>
      <div className='notificationHeader'>
        <IoMdNotifications className='notificationIcon' />
        <h3 className='notificationTitle'>Notifications</h3>
      </div>
      <ul className='notificationList'>
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((notification) => (
            <li
              key={notification.announcement_id}
              className='notificationItem'
              onClick={() => handleNotificationClick(notification)}
            >
              <strong>{notification.announcement_type}</strong>: {notification.announcement_title}
            </li>
          ))
        ) : (
          <li className='notificationItem'>No notifications available</li>
        )}
      </ul>

      {isPopupVisible && selectedNotification && (
        <div className='popupOverlay'>
          <div className='popupContent-notification'>
            <div className='popupHeader'>
              <h4>{selectedNotification.announcement_type}: {selectedNotification.announcement_title}</h4>
              <button className='closeButton' onClick={closePopup}>Close</button>
            </div>
            <div className='popup-content-notification'>
              <p>{selectedNotification.announcement_text}</p><br />
              <p><strong>Posted By:</strong> {selectedNotification.announcement_by} - {new Date(selectedNotification.announcement_timestamp).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Notifications_Student;