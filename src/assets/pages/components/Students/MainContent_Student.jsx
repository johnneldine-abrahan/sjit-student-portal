import React from 'react'
import '../../Students/Students_module.css'
import ActionCard_Student from './ActionCard_Student'
import { GrCertificate } from "react-icons/gr";
import { AiFillSchedule } from "react-icons/ai";
import { PiExamFill } from "react-icons/pi";
import { FaReceipt } from "react-icons/fa";
import { GiInjustice } from "react-icons/gi";
import { IoMdPrint } from "react-icons/io";

const actionItems = [
    {
        icon: <GrCertificate size={40} />,
        text: "Certificate of Registration"
    },

    {
        icon: <AiFillSchedule size={40} />,
        text: "Subjects and Schedule"
    },

    {
        icon: <PiExamFill size={40} />,
        text: "Grades"
    },

    {
        icon: <FaReceipt size={40} />,
        text: "Payments"
    },

    {
        icon: <GiInjustice size={40} />,
        text: "Liabilities"
    },

    {
        icon: <IoMdPrint size={40} />,
        text: "Print Copy of Grades"
    },
]

const MainContent_Student = () => {
  return (
    <section className='mainSection'>
        <div className='mainBanner'>

        </div>
        <div className='actionGrid'>
            {actionItems.map((item, index) => (
                <ActionCard_Student key={index} icon={item.icon} text={item.text} />
            ))}
        </div>
    </section>
  )
}

export default MainContent_Student
