import React from 'react';
import '../../Students/Students_module.css';
import ActionCard_Student from './ActionCard_Student';
import { GrCertificate } from "react-icons/gr";
import { AiFillSchedule } from "react-icons/ai";
import { PiExamFill } from "react-icons/pi";
import { FaReceipt } from "react-icons/fa";
import { GiInjustice } from "react-icons/gi";
import { IoMdPrint } from "react-icons/io";
import Certificate_of_Registration from './Certificate_of_Registration/Certificate_of_Registration';
import Subjects_and_Schedule from './Subjects_and_Schedule/Subjects_and_Schedule';
import Grades_Students from './Grades_Students/Grades_Students';
import Payments from './Payments/Payments';
import Liabilities_Students from './Liabilities_Students/Liabilities_Students';
import PrintCopyofGrades from './PrintCopyofGrades/PrintCopyofGrades';


const actionItems = [
  {
    icon: <GrCertificate size={40} />,
    text: "Certificate of Registration",
    content: <Certificate_of_Registration />
  },
  {
    icon: <AiFillSchedule size={40} />,
    text: "Subjects and Schedule",
    content: <Subjects_and_Schedule />
  },
  {
    icon: <PiExamFill size={40} />,
    text: "Grades",
    content: <Grades_Students />
  },
  {
    icon: <FaReceipt size={40} />,
    text: "Payments",
    content: <Payments />
  },
  {
    icon: <GiInjustice size={40} />,
    text: "Liabilities",
    content: <Liabilities_Students />
  },
  {
    icon: <IoMdPrint size={40} />,
    text: "Print Copy of Grades",
    content: <PrintCopyofGrades />
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
