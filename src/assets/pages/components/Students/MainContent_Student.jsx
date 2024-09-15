import React from 'react';
import '../../Students/Students_module.css';
import ActionCard_Student from './ActionCard_Student';
import { GrCertificate } from "react-icons/gr";
import { AiFillSchedule } from "react-icons/ai";
import { PiExamFill } from "react-icons/pi";
import { FaReceipt } from "react-icons/fa";
import { GiInjustice } from "react-icons/gi";
import { IoMdPrint } from "react-icons/io";

const actionItems = [
  {
    icon: <GrCertificate size={40} />,
    text: "Certificate of Registration",
    content: "Here you can download your Certificate of Registration."
  },
  {
    icon: <AiFillSchedule size={40} />,
    text: "Subjects and Schedule",
    content: "View and manage your subjects and schedules here."
  },
  {
    icon: <PiExamFill size={40} />,
    text: "Grades",
    content: "Check your latest grades for this semester."
  },
  {
    icon: <FaReceipt size={40} />,
    text: "Payments",
    content: "View your payment history and upcoming dues."
  },
  {
    icon: <GiInjustice size={40} />,
    text: "Liabilities",
    content: "You have outstanding liabilities. Please settle them."
  },
  {
    icon: <IoMdPrint size={40} />,
    text: "Print Copy of Grades",
    content: "Print a hard copy of your grades for your records."
  },
];

const MainContent_Student = () => {
  return (
    <section className='mainSection'>
      <div className='mainBanner'></div>
      <div className='actionGrid'>
        {actionItems.map((item, index) => (
          <ActionCard_Student 
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

export default MainContent_Student;
