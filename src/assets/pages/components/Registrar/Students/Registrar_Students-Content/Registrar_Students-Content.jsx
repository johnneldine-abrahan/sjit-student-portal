import React, { useState, useEffect, useRef } from "react";
import "./Registrar_Students-Content.css";
import Registrar_Students_ContentHeader from "./Registrar_Students_ContentHeader";
import Registrar_StudentsRecords from "./Registrar_StudentsRecords";

const Students_Content = () => {
  const [studentRecords, setStudentRecords] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const selectAllRef = useRef(); // Create a ref for the select-all checkbox
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  useEffect(() => {
    const fetchStudentRecords = async () => {
      const response = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/students");
      const data = await response.json();
      setStudentRecords(data);
    };
    fetchStudentRecords();
  }, []);

  useEffect(() => {
    // Apply the indeterminate state explicitly after any update
    if (selectAllRef.current) {
      if (
        selectedStudentIds.length > 0 &&
        selectedStudentIds.length < studentRecords.length
      ) {
        selectAllRef.current.indeterminate = true;
      } else {
        selectAllRef.current.indeterminate = false;
      }
    }
  }, [selectedStudentIds, studentRecords]);

  const handleSelectStudent = (studentId) => {
    setSelectedStudentIds((prev) => {
      const newSelectedIds = prev.includes(studentId)
        ? prev.filter((id) => id !== studentId) // Deselect
        : [...prev, studentId]; // Select

      // Update selectAllChecked state
      if (newSelectedIds.length === studentRecords.length) {
        setSelectAllChecked(true);
      } else if (newSelectedIds.length === 0) {
        setSelectAllChecked(false);
      } else {
        setSelectAllChecked(false);
      }

      return newSelectedIds;
    });
  };

  const handleSelectAll = () => {
    const newSelectAllChecked = !selectAllChecked;
    if (newSelectAllChecked) {
      setSelectedStudentIds(studentRecords.map((record) => record.student_id)); // Select all
    } else {
      setSelectedStudentIds([]); // Deselect all
    }
    setSelectAllChecked(newSelectAllChecked); // Toggle state
  };

  const handleDeleteStudents = async () => {
    if (selectedStudentIds.length === 0) {
      alert("No students selected for deletion.");
      return;
    }
    const response = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/deleteStudent", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentIds: selectedStudentIds }),
    });
    if (response.ok) {
      alert("Selected students deleted successfully.");
      const updatedResponse = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/students");
      const updatedRecords = await updatedResponse.json();
      setStudentRecords(updatedRecords);
      setSelectedStudentIds([]); // Clear selection after deletion
      setSelectAllChecked(false); // Reset Select All checkbox
    } else {
      alert("Failed to delete students.");
    }
  };

  return (
    <div className="admin-s_content">
      <Registrar_Students_ContentHeader
        onDelete={handleDeleteStudents}
        selectedStudentIds={selectedStudentIds}
        updateStudentRecords={setStudentRecords}
      />
      <Registrar_StudentsRecords
        onSelectStudent={handleSelectStudent}
        selectedStudentIds={selectedStudentIds}
        studentRecords={studentRecords}
        updateStudentRecords={setStudentRecords}
        selectAllChecked={selectAllChecked}
        onSelectAll={handleSelectAll}
        selectAllRef={selectAllRef} // Pass the ref to the child component
      />
    </div>
  );
};

export default Students_Content;