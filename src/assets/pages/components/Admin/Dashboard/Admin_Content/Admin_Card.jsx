import React, { useEffect, useState } from "react";
import "./Admin_Content.css";
import PieChartEnrolled from "./PieChartEnrolled"; // Import the PieChart component

const info_details = [
  {
    title: "Enrolled Students",
    number: "0", // Initial value, will be updated from the API
  },
  {
    title: "Not Enrolled",
    number: "0", // Initial value, will be updated from the API
  },
  {
    title: "Faculty Members",
    number: "0",
  },
];

const Admin_Card = () => {
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [notEnrolledCount, setNotEnrolledCount] = useState(0);
  const [activeFacultyCount, setActiveFacultyCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedStrand, setSelectedStrand] = useState("");
  const [gradeData, setGradeData] = useState({});

  const fetchStudentStatusData = async (gradeLevel, strand = null) => {
    try {
      const response = await fetch(
        `http://localhost:3000/students/status/${gradeLevel}/${strand}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching student status data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const enrolledResponse = await fetch(
          "https://san-juan-institute-of-technology-backend.onrender.com/count-enrolled-students"
        );
        if (!enrolledResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const enrolledData = await enrolledResponse.json();
        setEnrolledCount(enrolledData.enrolledCount);

        const notEnrolledResponse = await fetch(
          "https://san-juan-institute-of-technology-backend.onrender.com/count-not-enrolled-students"
        );
        if (!notEnrolledResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const notEnrolledData = await notEnrolledResponse.json();
        setNotEnrolledCount(notEnrolledData.notEnrolledCount); // Use the correct key

        const facultyResponse = await fetch(
          "https://san-juan-institute-of-technology-backend.onrender.com/count-active-faculty"
        );
        if (!facultyResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const facultyData = await facultyResponse.json();
        setActiveFacultyCount(facultyData.activeFacultyCount);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPopup]);

  useEffect(() => {
    if (selectedGrade) {
      const fetchData = async () => {
        const data = await fetchStudentStatusData(selectedGrade, selectedStrand);
        if (data) {
          setGradeData(data);
        }
      };

      fetchData();
    }
  }, [selectedGrade, selectedStrand]);

  const handleCardClick = (item) => {
    if (item.title === "Enrolled Students") {
      setPopupContent(item);
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupContent(null);
    setSelectedGrade("");
    setSelectedStrand("");
  };

  const pieChartData = [
    { name: "Enrolled", value: gradeData.enrolled_count || 0 },
    { name: "Not Enrolled", value: gradeData.not_enrolled_count || 0 },
  ];

  const isStrandDisabled =
    selectedGrade &&
    parseInt(selectedGrade) >= 7 &&
    parseInt(selectedGrade) <= 10;

  return (
    <div className="card-container">
      {info_details.map((item) => (
        <div
          className="card"
          key={item.title}
          onClick={() => handleCardClick(item)}
        >
          <div className="card-title">
            <h2>{item.title}</h2>
          </div>
          <div className="card-number">
            <h1>
              {item.title === "Enrolled Students"
                ? enrolledCount
                : item.title === "Faculty Members"
                ? activeFacultyCount
                : item.title === "Not Enrolled"
                ? notEnrolledCount
                : item.number}
            </h1>
          </div>
        </div>
      ))}
      {showPopup && (
        <>
          <div className="popup-blurred-background" />
          <div className="popup">
            <div className="popup-header">
              <h3 className="popup-title">{popupContent.title}</h3>
              <button className="close-button" onClick={handleClosePopup}>
                Close
              </button>
            </div>
            <div className="popup-content">
              <div className="dropdown-container">
                <select
                  id="grade-select"
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                >
                  <option value="">Select Grade</option>
                  <option value="7">Grade 7</option>
                  <option value="8">Grade 8</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>

                <select
                  id="strand-select"
                  value={selectedStrand}
                  onChange={(e) => setSelectedStrand(e.target.value)}
                  disabled={isStrandDisabled}
                >
                  <option value="">Select Strand</option>
                  <option value="Science, Technology, Engineering and Mathematics (STEM)">
                    Science, Technology, Engineering and Mathematics (STEM)
                  </option>
                  <option value="Accountancy, Business and Management (ABM)">
                    Accountancy, Business and Management (ABM)
                  </option>
                  <option value="Humanities and Social Sciences (HUMSS)">
                    Humanities and Social Sciences (HUMSS)
                  </option>
                  <option value="TVL - Industrial Arts (TVL-IA)">
                    TVL - Industrial Arts (TVL-IA)
                  </option>
                  <option value="TVL - Home Economics (TVL-HE)">
                    TVL - Home Economics (TVL-HE)
                  </option>
                  <option value="TVL - Information Communications Technology (TVL-ICT)">
                    TVL - Information Communications Technology (TVL-ICT)
                  </option>
                </select>
              </div>

              <div>
                <PieChartEnrolled data={pieChartData} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin_Card;