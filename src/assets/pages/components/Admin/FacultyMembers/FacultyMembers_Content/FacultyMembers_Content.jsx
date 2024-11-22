import React, { useState, useEffect, useRef } from "react";
import "./FacultyMembers_Content.css";
import FacultyMembers_ContentHeader from "./FacultyMembers_ContentHeader";
import FacultyMembers_List from "./FacultyMembers_List";

const FacultyMembers_Content = () => {
  const [facultyRecords, setFacultyRecords] = useState([]); // Store faculty records
  const [selectedFacultyIds, setSelectedFacultyIds] = useState([]); // Track selected faculty IDs
  const selectAllRef = useRef(); // Create a ref for the select-all checkbox
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // Function to update faculty records after adding or deleting
  const updateFacultyRecords = (updatedRecords) => {
    setFacultyRecords(updatedRecords);
  };

  // Fetch faculty data from server when the component loads
  useEffect(() => {
    const fetchFacultyRecords = async () => {
      const response = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/faculties"); // API call to get faculty records
      const data = await response.json();
      setFacultyRecords(data); // Set faculty records
    };
    fetchFacultyRecords();
  }, []);

  // Handle selecting/deselecting faculty members
  const handleSelectFaculty = (facultyId) => {
    setSelectedFacultyIds(
      (prev) =>
        prev.includes(facultyId)
          ? prev.filter((id) => id !== facultyId) // Deselect if already selected
          : [...prev, facultyId] // Add to selection if not selected
    );
  };

  // Function to delete selected faculty members
  const handleDeleteFaculty = async () => {
    if (selectedFacultyIds.length === 0) {
      alert("No faculty selected for deletion.");
      return;
    }

    try {
      const response = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/deleteFaculty", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultyIds: selectedFacultyIds }), // Ensure this matches the backend
      });

      if (response.ok) {
        alert("Selected faculty deleted successfully.");

        // Fetch the updated list of faculty
        const updatedResponse = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/faculties"); // Update with the correct endpoint for fetching faculty
        const updatedRecords = await updatedResponse.json();
        updateFacultyRecords(updatedRecords);
      } else {
        const errorText = await response.text();
        alert(`Failed to delete faculty: ${errorText}`);
      }
    } catch (error) {
      console.error("Error deleting faculty:", error);
      alert("Network error, please try again later.");
    }
  };

  useEffect(() => {
    // Apply the indeterminate state explicitly after any update
    if (selectAllRef.current) {
      if (
        selectedFacultyIds.length > 0 &&
        selectedFacultyIds.length < facultyRecords.length
      ) {
        selectAllRef.current.indeterminate = true;
      } else {
        selectAllRef.current.indeterminate = false;
      }
    }
  }, [selectedFacultyIds, facultyRecords]);

  const handleSelectAll = () => {
    const newSelectAllChecked = !selectAllChecked;
    if (newSelectAllChecked) {
      setSelectedFacultyIds(facultyRecords.map((record) => record.faculty_id)); // Select all
    } else {
      setSelectedFacultyIds([]); // Deselect all
    }
    setSelectAllChecked(newSelectAllChecked); // Toggle state
  };

  return (
    <div className="FacultyMembers_content">
      <FacultyMembers_ContentHeader
        onDelete={handleDeleteFaculty} // Pass delete function to header
        selectedFacultyIds={selectedFacultyIds} // Pass selected IDs
        updateFacultyRecords={updateFacultyRecords}
      />
      <FacultyMembers_List
        onSelectFaculty={handleSelectFaculty} // Handle selecting faculties
        selectedFacultyIds={selectedFacultyIds} // Pass selected IDs
        facultyRecords={facultyRecords} // Pass faculty records to list
        onSelectAll={handleSelectAll} // Pass select all function
        selectAllRef={selectAllRef} // Pass select all ref
        selectAllChecked={selectAllChecked}
        updateFacultyRecords={updateFacultyRecords} // Pass select all checked state
      />
    </div>
  );
};

export default FacultyMembers_Content;