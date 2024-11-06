import React, { useState, useEffect } from "react";
import "../../Faculty/Faculty_module.css";
import ActionCard_Faculty from "./ActionCard_Faculty";
import { AiFillSchedule } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { MdOutlineUploadFile } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Dashboard_Faculty from "./Dashboard_Faculty/Dashboard_Faculty";
import StudentList from "./StudentList/StudentList";
import UploadGrades from "./UploadGrades/UploadGrades";
import ViewSchedules from "./ViewSchedules/ViewSchedules";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import image1 from "../../../img/Faculty/Pinas.jpg";
import image2 from "../../../img/Faculty/RHU.jpg";
import image3 from "../../../img/Faculty/Aids.jpg";

const actionItems = [
  {
    icon: <AiFillSchedule size={40} />,
    text: "View Schedules",
    content: <ViewSchedules />,
  },
  {
    icon: <FaList size={40} />,
    text: "Section & Student List",
    content: <StudentList />,
  },
  {
    icon: <MdOutlineUploadFile size={40} />,
    text: "Upload Grades",
    content: <UploadGrades />,
  },
  {
    icon: <MdAnalytics size={40} />,
    text: "Reports",
    content: <Dashboard_Faculty />,
  },
];

const FilterModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schoolYear, setSchoolYear] = useState("");
  const [semester, setSemester] = useState("");
  const [quarter, setQuarter] = useState("");

  const handleFilterClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSchoolYearChange = (e) => {
    setSchoolYear(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    setQuarter(""); // Reset quarter when semester changes
  };

  const handleQuarterChange = (e) => {
    setQuarter(e.target.value);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset"; // Reset overflow when modal is closed
    }

    // Clean up the effect when the component unmounts or modal closes
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle filter application logic here
    console.log("Filters applied:", { schoolYear, semester, quarter });
    handleCloseModal(); // Close the modal after applying filters
  };

  return (
    <>
      <div className="filterheader-section">
        <div className="filterheader" onClick={handleFilterClick}>
          <FiFilter className="filter-ico" />
          <h3 className="filtertitle">Filter</h3>
        </div>
      </div>

      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modal">
            <div className="modalHeader">
              <span className="modalTitle">Filter</span>
              <button className="modalCloseButton" onClick={handleCloseModal}>
                Close
              </button>
            </div>
            <div className="modalBody">
              <form onSubmit={handleSubmit}>
                <label>School Year:</label>
                <select value={schoolYear} onChange={handleSchoolYearChange}>
                  <option value="">Select School Year</option>
                  <option value="2022-2023">2022-2023</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                </select>

                <label>Semester:</label>
                <select value={semester} onChange={handleSemesterChange}>
                  <option value="">Select Semester</option>
                  <option value="First Semester">First Semester</option>
                  <option value="Second Semester">Second Semester</option>
                </select>

                <label>Quarter:</label>
                <select value={quarter} onChange={handleQuarterChange} disabled={!semester}>
                  <option value="">Select Quarter</option>
                  {semester === "First Semester" && (
                    <>
                      <option value="1st Quarter">1st Quarter</option>
                      <option value="2nd Quarter">2nd Quarter</option>
                    </>
                  )}
                  {semester === "Second Semester" && (
                    <>
                      <option value="3rd Quarter">3rd Quarter</option>
                      <option value="4th Quarter">4th Quarter</option>
                    </>
                  )}
                </select>

                <div className="button-container">
                  <button type="submit" className="btn-box">
                    Apply Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MainContent_Faculty = () => {
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
        <p>
          <IoIosInformationCircleOutline size={30} className="info-ico" />
          Please click "Filter" button to change the current school year /
          semester
        </p>
        <FilterModal />
      </div>

      <div className="actionGrid">
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
