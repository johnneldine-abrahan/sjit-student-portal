import React from 'react';
import '../../Faculty/Faculty_module.css';
import ActionCard_Faculty from './ActionCard_Faculty';
import { AiFillSchedule } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import Dashboard_Faculty from './Dashboard_Faculty/Dashboard_Faculty';
import StudentList from './StudentList/StudentList';
import UploadGrades from './UploadGrades/UploadGrades';
import ViewSchedules from './ViewSchedules/ViewSchedules';

const actionItems = [
  {
    icon: <AiFillSchedule size={40} />,
    text: "View Schedules",
    content: <ViewSchedules />
  },
  {
    icon: <FaList size={40} />,
    text: "Student List",
    content: <UploadGrades />
  },
  {
    icon: <MdOutlineUploadFile size={40} />,
    text: "Upload Grades",
    content: <StudentList />
  },
  {
    icon: <MdAnalytics size={40} />,
    text: "Reports",
    content: <Dashboard_Faculty />
  },
];

const MainContent_Faculty = () => {
  return (
    <section className='mainSection'>
      <div className='mainBanner'></div>
      <div className='actionGrid'>
        {actionItems.map((item, index) => (
          <ActionCard_Faculty 
            key={index} 
            icon={item.icon} 
            text={item.text} 
            content={item.content} // Pass specific content for each card
          />
        ))}
      </div>
    </section>
  );
};

export default MainContent_Faculty;
