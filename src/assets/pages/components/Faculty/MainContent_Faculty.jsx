import React from 'react'
import '../../Faculty/Faculty_module.css'
import ActionCard_Faculty from './ActionCard_Faculty'
import { AiFillSchedule } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";

const actionItems = [
    {
        icon: <AiFillSchedule size={40} />,
        text: "View Schedules"
    },

    {
        icon: <FaList size={40} />,
        text: "Student List"
    },

    {
        icon: <MdOutlineUploadFile size={40} />,
        text: "Upload Grades"
    },

    {
        icon: <MdAnalytics size={40} />,
        text: "Reports"
    },
]

const MainContent_Faculty = () => {
  return (
    <section className='mainSection'>
        <div className='mainBanner'>

        </div>
        <div className='actionGrid'>
            {actionItems.map((item, index) => (
                <ActionCard_Faculty key={index} icon={item.icon} text={item.text} />
            ))}
        </div>
    </section>
  )
}

export default MainContent_Faculty
