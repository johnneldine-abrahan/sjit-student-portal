import React from 'react';
import '../../Faculty/Faculty_module.css';
import ActionCard_Faculty from './ActionCard_Faculty';
import { AiFillSchedule } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";

const actionItems = [
  {
    icon: <AiFillSchedule size={40} />,
    text: "View Schedules",
    content: "Check your daily and weekly teaching schedules."
  },
  {
    icon: <FaList size={40} />,
    text: "Student List",
    content: "View the list of students enrolled in your classes."
  },
  {
    icon: <MdOutlineUploadFile size={40} />,
    text: "Upload Grades",
    content: "Upload students' grades for the current semester."
  },
  {
    icon: <MdAnalytics size={40} />,
    text: "Reports",
    content: "Generate reports and analyze student performance data."
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
