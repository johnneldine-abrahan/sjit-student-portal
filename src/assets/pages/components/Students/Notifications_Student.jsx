import React, { useState, useEffect } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import '../../Students/Students_module.css';

const Notifications_Student = () => {
  const [notifications, setNotifications] = useState([]); // Ensure this is an array
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Fetch announcements from the back-end
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:3000/announcements/students'); // Adjust the URL if necessary
        const data = await response.json();
        console.log(data); // Log the data to check its structure
        setNotifications(data.rows); // Set notifications to the rows array
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
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
          <div className='popupContent'>
            <div className='popupHeader'>
              <h4>Notification Details</h4>
              <button className='closeButton' onClick={closePopup}>Close</button>
            </div>
            <p><strong>Type:</strong> {selectedNotification.announcement_type}</p>
            <p><strong>Title:</strong> {selectedNotification.announcement_title}</p>
            <p><strong>Text:</strong> {selectedNotification.announcement_text}</p>
            <p><strong>By:</strong> {selectedNotification.announcement_by}</p>
            <p><strong>Timestamp:</strong> {new Date(selectedNotification.announcement_timestamp).toLocaleString()}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Notifications_Student;