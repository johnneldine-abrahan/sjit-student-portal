import React, { useEffect, useState } from "react";
import "./Admin_Content.css";
import PieChartEnrolled from "./PieChartEnrolled"; // Import the PieChart component

const info_details = [
  {
    title: "Enrolled Students",
    number: "0", // Initial value, will be updated from the API
  },
  {
    title: "Faculty Members",
    number: "0", // Initial value, will be updated from the API
  },
  {
    title: "Active Users",
    number: "78",
  },
];

const Admin_Card = () => {
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [activeFacultyCount, setActiveFacultyCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  // State for dropdown selections
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedStrand, setSelectedStrand] = useState("");
  const [gradeData, setGradeData] = useState({}); // State to store grade data

  const fetchStudentStatusData = async (gradeLevel, strand = null) => {
    try {
      const response = await fetch(
        `https://san-juan-institute-of-technology-backend.onrender.com/students/status/${gradeLevel}/${strand}`
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
    const fetchEnrolledCount = async () => {
      try {
        const response = await fetch(
          "https://san-juan-institute-of-technology-backend.onrender.com/count-enrolled-students"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEnrolledCount(data.enrolledCount);
      } catch (error) {
        console.error("Error fetching enrolled students count:", error);
      }
    };

    const fetchActiveFacultyCount = async () => {
      try {
        const response = await fetch(
          "https://san-juan-institute-of-technology-backend.onrender.com/count-active-faculty"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setActiveFacultyCount(data.activeFacultyCount);
      } catch (error) {
        console.error("Error fetching active faculty count:", error);
      }
    };

    fetchEnrolledCount();
    fetchActiveFacultyCount();
  }, []);

  useEffect(() => {
    if (showPopup) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset overflow on component unmount
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
    // Reset dropdown selections when closing the popup
    setSelectedGrade("");
    setSelectedStrand("");
  };

  const pieChartData = [
    { name: "Enrolled", value: gradeData.enrolled_count || 0 },
    { name: "Not Enrolled", value: gradeData.not_enrolled_count || 0 },
  ];

  // Determine if the strand select should be disabled
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
          onClick={() => handleCardClick(item)} // Show popup on card click
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
                  disabled={isStrandDisabled} // Disable strand select based on grade
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