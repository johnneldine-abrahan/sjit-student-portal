import React from "react";
import "../../Students/Students_module.css";
import ActionCard_Student from "./ActionCard_Student";
import { GrCertificate } from "react-icons/gr";
import { AiFillSchedule } from "react-icons/ai";
import { PiExamFill } from "react-icons/pi";
import { FaReceipt } from "react-icons/fa";
import { GiInjustice } from "react-icons/gi";
import { IoMdPrint } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Certificate_of_Registration from "./Certificate_of_Registration/Certificate_of_Registration";
import Subjects_and_Schedule from "./Subjects_and_Schedule/Subjects_and_Schedule";
import Grades_Students from "./Grades_Students/Grades_Students";
import Payments from "./Payments/Payments";
import Liabilities_Students from "./Liabilities_Students/Liabilities_Students";
import PrintCopyofGrades from "./PrintCopyofGrades/PrintCopyofGrades";
import { Carousel } from "react-responsive-carousel";
import image1 from "../../../img/Faculty/Pinas.jpg";
import image2 from "../../../img/Faculty/RHU.jpg";
import image3 from "../../../img/Faculty/Aids.jpg";

const actionItems = [
  {
    icon: <GrCertificate size={40} />,
    text: "Certificate of Registration",
    content: <Certificate_of_Registration />,
  },
  {
    icon: <AiFillSchedule size={40} />,
    text: "Subjects and Schedule",
    content: <Subjects_and_Schedule />,
  },
  {
    icon: <PiExamFill size={40} />,
    text: "Grades",
    content: <Grades_Students />,
  },
  {
    icon: <FaReceipt size={40} />,
    text: "Payments",
    content: <Payments />,
  },
  {
    icon: <GiInjustice size={40} />,
    text: "Liabilities",
    content: <Liabilities_Students />,
  },
  {
    icon: <IoMdPrint size={40} />,
    text: "Print Copy of Grades",
    content: <PrintCopyofGrades />,
  },
];

const MainContent_Student = () => {
  const bannerImages = [image1, image2, image3];
  return (
    <section className="mainSection">
      <Carousel
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
        showArrows={true}
        stopOnHover={false}
        transitionTime={500}
      >
        {bannerImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Pinas.jpg ${index + 1}`} />
          </div>
        ))}
      </Carousel>

      <div className="filter-section">
          <p><IoIosInformationCircleOutline size={30} className="info-ico"/>Please click "Filter" button to change the current school year / semester</p>
          <div className="filterheader-section">
            <div className="filterheader">
              <FiFilter className="filter-ico" />
              <h3 className="filtertitle">Filter</h3>
            </div>
          </div>
      </div>

      <div className="actionGrid">
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