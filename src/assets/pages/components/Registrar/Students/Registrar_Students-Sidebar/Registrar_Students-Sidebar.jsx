import React from "react";
import "../../Dashboard/Registrar_Sidebar/Registrar_Sidebar.css";
import { BiHome, BiArchiveIn } from "react-icons/bi";
import { PiStudentBold } from "react-icons/pi";
import { GiArchiveRegister } from "react-icons/gi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiFillSchedule } from "react-icons/ai";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import menu_logo from "../../../../../img/Sidebar/menu-logo.png";

const Registrar_Students_Sidebar = () => {
  return (
    <div className="menu">
      <div className="menu-logo">
        <img src={menu_logo} alt="" />
        <h2>SJIT</h2>
      </div>
      <div className="menu-list">
        <a href="/registrar/dashboard" className="item">
          <BiHome size={18} />
          Dashboard
        </a>
        <a href="/registrar/student-list" className="item active">
          <PiStudentBold size={18} />
          Students
        </a>
        <a href="/registrar/enroll-students" className="item">
          <GiArchiveRegister size={18} />
          Enroll Student
        </a>
        <a href="/registrar/confirm-enrollment" className="item">
          <IoCheckmarkDoneSharp size={18} />
          Confirm Enrollment
        </a>
        <a href="/registrar/faculty-members" className="item">
          <FaChalkboardTeacher size={18} />
          Faculty Members
        </a>
        <a href="/regstrar/manage-schedule" className="item">
          <AiFillSchedule size={18} />
          Manage Schedule
        </a>
        <a href="/registrar/manage-accounts" className="item">
          <MdOutlineSwitchAccount size={18} />
          Manage Accounts
        </a>
        <a href="/registrar/archive" className="item ">
          <BiArchiveIn size={18} />
          Archive
        </a>
      </div>
    </div>
  );
};

export default Registrar_Students_Sidebar;