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
import axios from "axios";

const actionItems = [
  {
    icon: <AiFillSchedule size={40} />,
    text: "View Schedules",
    content: ViewSchedules, // This should be a valid component reference
  },
  {
    icon: <FaList size={40} />,
    text: "Section & Student List",
    content: StudentList, // This should be a valid component reference
  },
  {
    icon: <MdOutlineUploadFile size={40} />,
    text: "Upload Grades",
    content: UploadGrades, // This should be a valid component reference
  },
  {
    icon: <MdAnalytics size={40} />,
    text: "Reports",
    content: Dashboard_Faculty, // This should be a valid component reference
  },
];

const FilterModal = ({ setQuarter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schoolYear, setSchoolYear] = useState("");
  const [semester, setSemester] = useState("FIRST");
  const [quarterState, setQuarterState] = useState("1st");
  
  const [schoolYears, setSchoolYears] = useState([]);

  const [defaultSchoolYear, setDefaultSchoolYear] = useState("");
  const [defaultSemester, setDefaultSemester] = useState("FIRST");
  const [defaultQuarter, setDefaultQuarter] = useState("1st");

  const [hasLoggedFilters, setHasLoggedFilters] = useState(false);

  const handleQuarterChange = (e) => {
    setQuarterState(e.target.value);
  };

  const handleFilterClick = () => {
    setIsModalOpen(true);
    if (!schoolYear && schoolYears.length > 0) {
      setSchoolYear(defaultSchoolYear);
      setSemester(defaultSemester);
      setQuarterState(defaultQuarter);
    }
  };

  const handleCloseModal = () => {
    setSchoolYear(defaultSchoolYear);
    setSemester(defaultSemester);
    setQuarterState(defaultQuarter);
    setIsModalOpen(false);
  };

  const handleApplyFilter = () => {
    setQuarter(quarterState); // Pass quarter state to parent
    setIsModalOpen(false);
  };

  const handleSchoolYearChange = (e) => {
    setSchoolYear(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    setQuarterState(e.target.value === "FIRST" ? "1st" : "3rd");
  };

  useEffect(() => {
    const fetchSchoolYears = async () => {
      try {
        const response = await axios.get('http://localhost:3000/school_years');
        if (response.data.rows && Array.isArray(response.data.rows)) {
          const years = response.data.rows.map(row => row.school_year);
          setSchoolYears(years);
          if (years.length > 0) {
            setDefaultSchoolYear(years[0]);
            setSchoolYear(years[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching school years:', error);
 }
    };

    fetchSchoolYears();

    const token = localStorage.getItem("token");
    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = parts[1];
        const decodedPayload = JSON.parse(atob(payload));

        if (decodedPayload.semester) {
          setSemester(decodedPayload.semester);
          setQuarterState(decodedPayload.semester === "FIRST" ? "1st" : "3rd");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!hasLoggedFilters && schoolYear) {
      console.log("Current filters:", { schoolYear, semester, quarter: quarterState });
      setHasLoggedFilters(true);
    }
  }, [schoolYear, semester, quarterState, hasLoggedFilters]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDefaultSchoolYear(schoolYear);
    setDefaultSemester(semester);
    setDefaultQuarter(quarterState);
    console.log("Filters applied:", { schoolYear, semester, quarter: quarterState });
    handleApplyFilter();
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
                <select value={quarterState} onChange={handleQuarterChange}>
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
  const [quarter, setQuarter] = useState("1st");
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
            <img src={image} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </Carousel>

      <div className="filter-section">
        <p>
          <IoIosInformationCircleOutline size={30} className="info-ico" />
          Please click "Filter" button to change the current school year /
          semester
        </p>
        <FilterModal setQuarter={setQuarter} />
      </div>

      <div className="actionGrid">
        {actionItems.map((item, index) => (
          <ActionCard_Faculty
            key={index}
            icon={item.icon}
            text={item.text}
            content={React.createElement(item.content, { quarter })} // Use React.createElement to render component with props
          />
        ))}
      </div>
    </section>
  );
 
};

export default MainContent_Faculty;
