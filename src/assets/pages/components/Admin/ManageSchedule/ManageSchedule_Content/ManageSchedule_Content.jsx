import React, { useState, useEffect } from "react";
import "./ManageSchedule_Content.css";
import ManageSchedule_ContentHeader from "./ManageSchedule_ContentHeader";
import ManageSchedule_Sections from "./ManageSchedule_Sections";
import axios from "axios";

const ManageSchedule_Content = () => {
  const [selectedSections, setSelectedSections] = useState([]); // Store selected section IDs
  const [sectionsData, setSectionsData] = useState([]); // Store sections data

  // Function to fetch and refresh the sections data
  const refreshSections = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getSections");
      setSectionsData(response.data); // Update the sections data state
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  // Handle delete sections logic
  const handleDeleteSections = async () => {
    if (selectedSections.length === 0) {
      alert("Please select at least one section to delete.");
      return;
    }

    try {
      const response = await axios.delete(
        "http://localhost:3000/deleteSections",
        {
          data: { selectedSections },
        }
      );
      alert(response.data.message); // Show success message
      refreshSections(); // Refresh the sections data after deletion
    } catch (error) {
      console.error("Error deleting sections:", error);
      alert("Error deleting sections. Please try again.");
    }
  };

  // Fetch the sections data when the component mounts
  useEffect(() => {
    refreshSections();
  }, []);

  return (
    <div className="ManageSchedule_content">
      <ManageSchedule_ContentHeader
        selectedSections={selectedSections}
        handleDeleteSections={handleDeleteSections}
        refreshSections={refreshSections} // Pass refreshSections to header
      />
      <ManageSchedule_Sections
        setSelectedSections={setSelectedSections}
        sectionsData={sectionsData} // Pass sections data to child component
        refreshSections={refreshSections} // Pass refreshSections to sections
      />
    </div>
  );
};

export default ManageSchedule_Content;