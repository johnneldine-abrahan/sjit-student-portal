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
import axios from "axios"; // Import Axios

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
  const [semester, setSemester] = useState("FIRST"); // Set default semester to FIRST
  const [quarter, setQuarter] = useState("1st"); // Set default quarter to 1st
  const [schoolYears, setSchoolYears] = useState([]); // State to hold school years

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
    if (e.target.value === "FIRST") {
      setQuarter("1st"); // Reset quarter to 1st when FIRST semester is selected
    } else {
      setQuarter(""); // Reset quarter when semester changes
    }
  };

  const handleQuarterChange = (e) => {
    setQuarter(e.target.value);
  };

  // Fetch school years when the modal opens
  useEffect(() => {
    const fetchSchoolYears = async () => {
      try {
        const response = await axios.get('http://localhost:3000/school_years'); // Adjust the URL as needed
        console.log('API Response:', response.data); // Log the full response
    
        // Check if rows exist and extract school years
        if (response.data.rows && Array.isArray(response.data.rows)) {
          const years = response.data.rows.map(row => row.school_year); // Assuming each row contains a school_year field
          setSchoolYears(years);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching school years:', error);
      }
    };

    if (isModalOpen) {
      fetchSchoolYears();
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
    // Handle filter application logic here console.log("Filters applied:", { schoolYear, semester, quarter });
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
                  {schoolYears.map((year, index) => (
                    <option key={index} value={year}>{year}</option>
                  ))}
                </select>

                <label>Semester:</label>
                <select value={semester} onChange={handleSemesterChange}>
                  <option value="FIRST">First Semester</option>
                  <option value="SECOND">Second Semester</option>
                </select>

                <label>Quarter:</label>
                <select value={quarter} onChange={handleQuarterChange} disabled={!semester}>
                  {semester === "FIRST" && (
                    <>
                      <option value="1st">1st Quarter</option>
                      <option value="2nd">2nd Quarter</option>
                    </>
                  )}
                  {semester === "SECOND" && (
                    <>
                      <option value="3rd">3rd Quarter</option>
                      <option value="4th">4th Quarter</option>
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