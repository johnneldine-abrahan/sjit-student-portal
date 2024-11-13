import React, { useState, useEffect } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import '../../Students/Students_module.css'

const Notifications_Student = () => {
  const notifications = [
    "Please settle your liabilities from Finance.",
    "CORE101 - Your grade has been uploaded.",
    "CORE104 - Your grade has been uploaded."
  ];

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState('');

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedNotification('');
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
        {notifications.map((notification, index) => (
          <li
            key={index}
            className='notificationItem'
            onClick={() => handleNotificationClick(notification)}
          >
            {notification}
          </li>
        ))}
      </ul>

      {isPopupVisible && (
        <div className='popupOverlay'>
          <div className='popupContent'>
            <div className='popupHeader'>
              <h4>Notification</h4>
              <button className='closeButton' onClick={closePopup}>close</button>
            </div>
            <p>{selectedNotification}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Notifications_Student
