import React, { useState, useEffect } from "react";
import "../../Students/Students_module.css";
import ActionCard_Student from "./ActionCard_Student";
import { GrCertificate } from "react-icons/gr";
import { AiFillSchedule } from "react-icons/ai";
import { PiExamFill } from "react-icons/pi";
import { FaReceipt } from "react-icons/fa";
import { GiInjustice } from "react-icons/gi";
import { MdAnalytics } from "react-icons/md";
import { IoMdPrint } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import { GiArchiveRegister } from "react-icons/gi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Certificate_of_Registration from "./Certificate_of_Registration/Certificate_of_Registration";
import Subjects_and_Schedule from "./Subjects_and_Schedule/Subjects_and_Schedule";
import Grades_Students from "./Grades_Students/Grades_Students";
import Payments from "./Payments/Payments";
import Liabilities_Students from "./Liabilities_Students/Liabilities_Students";
import Student_Reports from "./Student_Reports/Student_Reports";
import Enroll from "./Enroll/Enroll";
import PrintCopyofGrades from "./PrintCopyofGrades/PrintCopyofGrades";
import { Carousel } from "react-responsive-carousel";
import image1 from "../../../img/Faculty/Pinas.jpg";
import image2 from "../../../img/Faculty/RHU.jpg";
import image3 from "../../../img/Faculty/Aids.jpg";
import axios from "axios";

const actionItems = [
  {
    icon: <GrCertificate size={40} />,
    text: "Certificate of Registration",
    content: Certificate_of_Registration,
  },
  {
    icon: <AiFillSchedule size={40} />,
    text: "Subjects and Schedule",
    content: Subjects_and_Schedule,
  },
  {
    icon: <PiExamFill size={40} />,
    text: "Grades",
    content: Grades_Students,
  },
  {
    icon: <FaReceipt size={40} />,
    text: "Payments",
    content: Payments,
  },
  {
    icon: <GiInjustice size={40} />,
    text: "Liabilities",
    content: Liabilities_Students,
  },
  {
    icon: <MdAnalytics size={40} />,
    text: "Reports",
    content: Student_Reports,
  },
  {
    icon: <IoMdPrint size={40} />,
    text: "Print Copy of Grades",
    content: PrintCopyofGrades,
  },
  {
    icon: <GiArchiveRegister size={40} />,
    text: "Enroll",
    content: Enroll,
  },
];

const FilterModal = ({
  setQuarter,
  setSchoolYear,
  setSemester,
  onApplyFilters,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSchoolYear, setModalSchoolYear] = useState("");
  const [modalSemester, setModalSemester] = useState("FIRST");
  const [quarterState, setQuarterState] = useState("1st");

  const [schoolYears, setSchoolYears] = useState([]);
  const [defaultSchoolYear, setDefaultSchoolYear] = useState("");
  const [defaultSemester, setDefaultSemester] = useState("FIRST");
  const [defaultQuarter, setDefaultQuarter] = useState("1st");

  const handleQuarterChange = (e) => {
    setQuarterState(e.target.value);
  };

  const handleFilterClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalSchoolYear(defaultSchoolYear);
    setModalSemester(defaultSemester);
    setQuarterState(defaultQuarter);
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Enable scrolling
  };

  const handleApplyFilter = () => {
    setQuarter(quarterState);
    setSchoolYear(modalSchoolYear);
    setSemester(modalSemester);
    onApplyFilters({
      schoolYear: modalSchoolYear,
      semester: modalSemester,
      quarter: quarterState,
    });
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Enable scrolling
  };

  const handleSchoolYearChange = (e) => {
    setModalSchoolYear(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setModalSemester(e.target.value);
    setQuarterState(e.target.value === "FIRST" ? "1st" : "3rd");
  };

  useEffect(() => {
    const fetchSchoolYears = async () => {
      try {
        const response = await axios.get("https://san-juan-institute-of-technology-backend.onrender.com/school_years");
        if (response.data.rows && Array.isArray(response.data.rows)) {
          const years = response.data.rows.map((row) => row.school_year);
          setSchoolYears(years);
          if (years.length > 0) {
            setDefaultSchoolYear(years[0]);
            setModalSchoolYear(years[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching school years:", error);
      }
    };

    fetchSchoolYears();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Ensure scrolling is enabled when modal is closed
    };
  }, [isModalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
                <select
                  value={modalSchoolYear}
                  onChange={handleSchoolYearChange}
                >
                  {schoolYears.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <label>Semester:</label>
                <select value={modalSemester} onChange={handleSemesterChange}>
                  <option value="FIRST">First Semester</option>
                  <option value="SECOND">Second Semester</option>
                </select>

                <label>Quarter:</label>
                <select value={quarterState} onChange={handleQuarterChange}>
                  {modalSemester === "FIRST" && (
                    <>
                      <option value="1st">1st Quarter</option>
                      <option value="2nd">2nd Quarter</option>
                    </>
                  )}
                  {modalSemester === "SECOND" && (
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

const MainContent_Student = () => {
  const [quarter, setQuarter] = useState("1st");
  const [schoolYear, setSchoolYear] = useState("");
  const [semester, setSemester] = useState("FIRST");
  const bannerImages = [image1, image2, image3];

  const handleApplyFilters = ({ schoolYear, semester, quarter }) => {
    console.log("Current filters:", { schoolYear, semester, quarter });
    setSchoolYear(schoolYear);
    setSemester(semester);
    setQuarter(quarter);
    console.log("Filters applied:", { schoolYear, semester, quarter });
  };

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
        <FilterModal
          setQuarter={setQuarter}
          setSchoolYear={setSchoolYear}
          setSemester={setSemester}
          onApplyFilters={handleApplyFilters}
        />
      </div>

      <div className="actionGrid">
        {actionItems.map((item, index) => (
          <ActionCard_Student
            key={index}
            icon={item.icon}
            text={item.text}
            content={React.createElement(item.content, {
              quarter,
              schoolYear,
              semester,
            })}
          />
        ))}
      </div>
    </section>
  );
};

export default MainContent_Student;