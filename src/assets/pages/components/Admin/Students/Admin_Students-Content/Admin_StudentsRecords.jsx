import React, { useState, useEffect } from "react";
import "./Admin_Students-Content";
import { FaRegEye } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";

const Admin_StudentsRecords = ({
  selectedStudentIds,
  studentRecords,
  onSelectStudent,
  updateStudentRecords,
  selectAllChecked,
  onSelectAll,
  selectAllRef,
}) => {
  const [popup, setPopup] = useState({ show: false, record: null });
  const [editPopup, setEditPopup] = useState({ show: false, record: null });
  const [viewPopup, setViewPopup] = useState({ show: false, record: null });
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    lrn: "",
    birth_date: "",
    sex: "",
    place_of_birth: "",
    nationality: "",
    religion: "",
    civil_status: "",
    birth_order: "",
    contact_number: "",
    program: "",
    grade_level: "",
    strand: "",
    financial_support: "",
    scholarship_grant: "",
    school_name: "",
    years_attended: "",
    honors_awards: "",
    school_address: "",
    address: "",
    city_municipality: "",
    province: "",
    country: "",
    zip_code: "",
    name_father: "",
    occupation_father: "",
    contact_father: "",
    name_mother: "",
    occupation_mother: "",
    contact_mother: "",
    guardian_name: "",
    relationship: "",
    guardian_address: "",
    contact_guardian: "",
  });
  const [originalFormData, setOriginalFormData] = useState({});
  const [juniorHighschoolChecked, setJuniorHighschoolChecked] = useState(false);
  const [seniorHighschoolChecked, setSeniorHighschoolChecked] = useState(false);
  const validateForm = () => {
    const requiredFields = [
      "program",
      "grade_level",
      "last_name",
      "first_name",
      "sex",
      "birth_date",
      "place_of_birth",
      "nationality",
      "religion",
      "civil_status",
      "birth_order",
      "contact_number",
      "city_municipality",
      "province",
      "country",
      "zip_code",
      "school_name",
      "years_attended",
      "school_address",
      "financial_support",
    ];

    let isValid = true;
    let errorMessage = "";
    let firstErrorInput = null;

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field] === "") {
        document.querySelector(`[name="${field}"]`).classList.add("error");
        isValid = false;
        errorMessage += `${field} is required\n`;
        if (!firstErrorInput) {
          firstErrorInput = document.querySelector(`[name="${field}"]`);
        }
      } else {
        document.querySelector(`[name="${field}"]`).classList.remove("error");
      }
    });

    if (!isValid) {
      firstErrorInput.focus();
      //alert(errorMessage);
      return false;
    }

    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    const isFormDataChanged = Object.keys(formData).some((key) => {
      return formData[key] !== originalFormData[key];
    });

    if (!isFormDataChanged) {
      handleClose();
      return;
    }
    // Create a copy of the formData and ensure defaults for empty or null values
    const adjustedData = { ...formData };

    // Convert 'lrn' to null if it is empty or invalid, otherwise to an integer
    adjustedData.lrn = formData.lrn ? parseInt(formData.lrn) : null;

    // Set default empty strings for optional fields
    const optionalFields = [
      "contact_father",
      "contact_mother",
      "contact_guardian",
      "guardian_name",
      "relationship",
      "occupation_father",
      "occupation_mother",
    ];

    optionalFields.forEach((field) => {
      adjustedData[field] = formData[field] || ""; // Set to empty string if undefined or null
    });

    console.log("Submitting adjusted data:", adjustedData);

    try {
      // Perform the update request
      const response = await axios.put(
        `http://localhost:3000/updateStudentData/${editPopup.record.student_id}`,
        adjustedData
      );
      alert("Student data updated successfully");

      // Re-fetch updated student records to sync the UI
      const updatedResponse = await axios.get("http://localhost:3000/students");
      const updatedRecords = updatedResponse.data;

      // Update the parent component with new student data (this can be passed down as a prop)
      updateStudentRecords(updatedRecords); // Assuming this method is passed in props

      setEditPopup({ show: false, record: null }); // Close the edit popup
    } catch (error) {
      console.error("Error occurred while updating student data:", error);

      if (error.response) {
        alert(
          `Failed to update student data. Server responded with status: ${error.response.status}`
        );
        if (error.response.data) {
          alert(`Error message: ${error.response.data.message}`);
        }
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleViewPopup = (record) => {
    setViewPopup({ show: true, record });
  };

  const handleEditPopup = async (record) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/getStudentData/${record.student_id}`
      );
      const data = response.data;

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0]; // Converts to YYYY-MM-DD format
      };

      const originalFormData = {
        first_name: data?.accountData?.first_name || "",
        middle_name: data?.accountData?.middle_name || "",
        last_name: data?.accountData?.last_name || "",
        lrn: data?.studentData?.lrn || "",
        birth_date: data?.studentData?.birth_date
          ? formatDate(data.studentData.birth_date)
          : "",
        sex: data?.studentData?.sex || "",
        place_of_birth: data?.studentData?.place_of_birth || "",
        nationality: data?.studentData?.nationality || "",
        religion: data?.studentData?.religion || "",
        civil_status: data?.studentData?.civil_status || "",
        birth_order: data?.studentData?.birth_order || "",
        contact_number: data?.studentData?.contact_number || "",
        program: data?.studentData?.program || "",
        grade_level: data?.studentData?.grade_level || "",
        strand: data?.studentData?.strand || "",
        financial_support: data?.studentData?.financial_support || "",
        scholarship_grant: data?.studentData?.scholarship_grant || "",
        school_name: data?.schoolHistoryData?.school_name || "",
        years_attended: data?.schoolHistoryData?.years_attended || "",
        honors_awards: data?.schoolHistoryData?.honors_awards || "",
        school_address: data?.schoolHistoryData?.school_address || "",
        address: data?.addressData?.address || "",
        city_municipality: data?.addressData?.city_municipality || "",
        province: data?.addressData?.province || "",
        country: data?.addressData?.country || "",
        zip_code: data?.addressData?.zip_code || "",
        name_father: data?.contactData?.name_father || "",
        occupation_father: data?.contactData?.occupation_father || "",
        contact_father: data?.contactData?.contact_father || "",
        name_mother: data?.contactData?.name_mother || "",
        occupation_mother: data?.contactData?.occupation_mother || "",
        contact_mother: data?.contactData?.contact_mother || "",
        guardian_name: data?.emergencyContactData?.guardian_name || "",
        relationship: data?.emergencyContactData?.relationship || "",
        guardian_address: data?.emergencyContactData?.guardian_address || "",
        contact_guardian: data?.emergencyContactData?.contact_guardian || "",
      };

      setOriginalFormData(originalFormData);

      setFormData({
        first_name: data?.accountData?.first_name || "",
        middle_name: data?.accountData?.middle_name || "",
        last_name: data?.accountData?.last_name || "",
        lrn: data?.studentData?.lrn || "",
        birth_date: data?.studentData?.birth_date
          ? formatDate(data.studentData.birth_date)
          : "",
        sex: data?.studentData?.sex || "",
        place_of_birth: data?.studentData?.place_of_birth || "",
        nationality: data?.studentData?.nationality || "",
        religion: data?.studentData?.religion || "",
        civil_status: data?.studentData?.civil_status || "",
        birth_order: data?.studentData?.birth_order || "",
        contact_number: data?.studentData?.contact_number || "",
        program: data?.studentData?.program || "",
        grade_level: data?.studentData?.grade_level || "",
        strand: data?.studentData?.strand || "",
        financial_support: data?.studentData?.financial_support || "",
        scholarship_grant: data?.studentData?.scholarship_grant || "",
        school_name: data?.schoolHistoryData?.school_name || "",
        years_attended: data?.schoolHistoryData?.years_attended || "",
        honors_awards: data?.schoolHistoryData?.honors_awards || "",
        school_address: data?.schoolHistoryData?.school_address || "",
        address: data?.addressData?.address || "",
        city_municipality: data?.addressData?.city_municipality || "",
        province: data?.addressData?.province || "",
        country: data?.addressData?.country || "",
        zip_code: data?.addressData?.zip_code || "",
        name_father: data?.contactData?.name_father || "",
        occupation_father: data?.contactData?.occupation_father || "",
        contact_father: data?.contactData?.contact_father || "",
        name_mother: data?.contactData?.name_mother || "",
        occupation_mother: data?.contactData?.occupation_mother || "",
        contact_mother: data?.contactData?.contact_mother || "",
        guardian_name: data?.emergencyContactData?.guardian_name || "",
        relationship: data?.emergencyContactData?.relationship || "",
        guardian_address: data?.emergencyContactData?.guardian_address || "",
        contact_guardian: data?.emergencyContactData?.contact_guardian || "",
      });

      setJuniorHighschoolChecked(
        data?.studentData?.program === "Junior Highschool"
      );
      setSeniorHighschoolChecked(
        data?.studentData?.program === "Senior Highschool"
      );

      setEditPopup({ show: true, record });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const handleClose = () => {
    setPopup({ show: false, record: null });
    setEditPopup({ show: false, record: null });
    setViewPopup({ show: false, record: null });
    setFormData({
      first_name: "",
      middle_name: "",
      last_name: "",
      lrn: "",
      birth_date: "",
      sex: "",
      place_of_birth: "",
      nationality: "",
      religion: "",
      civil_status: "",
      birth_order: "",
      contact_number: "",
      program: "",
      grade_level: "",
      strand: "",
      financial_support: "",
      scholarship_grant: "",
      school_name: "",
      years_attended: "",
      honors_awards: "",
      school_address: "",
      address: "",
      city_municipality: "",
      province: "",
      country: "",
      zip_code: "",
      name_father: "",
      occupation_father: "",
      contact_father: "",
      name_mother: "",
      occupation_mother: "",
      contact_mother: "",
      guardian_name: "",
      relationship: "",
      guardian_address: "",
      contact_guardian: "",
    });
  };

  return (
    <div className="student-records">
      <div className="recordslist-container">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAllChecked}
                  ref={selectAllRef}
                  onChange={onSelectAll}
                />
              </th>
              <th>Student ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name </th>
              <th>Program</th>
              <th>Grade Level</th>
              <th>Student Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentRecords.length > 0 ? (
              studentRecords.map((records) => (
                <tr
                  key={records.student_id}
                  className={selectedStudentIds.includes(records.student_id) ? "checked" : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedStudentIds.includes(records.student_id)}
                      onChange={() => onSelectStudent(records.student_id)}
                    />
                  </td>
                  <td>{records.student_id}</td>
                  <td>{records.last_name}</td>
                  <td>{records.first_name}</td>
                  <td>{records.middle_name}</td>
                  <td>{records.program}</td>
                  <td>Grade {records.grade_level}</td>
                  <td>{records.student_type}</td>
                  <td>{records.student_status}</td>
                  <td>
                    <button className="view-details" onClick={() => handleViewPopup(records)}>
                      <FaRegEye size={20} />
                    </button>
                    <button className="edit-button" onClick={() => handleEditPopup(records)} style={{ marginLeft: "10px" }}>
                      <BiEditAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No student records available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editPopup.show && (
        <div className="popup-blurred-background" onClick={handleClose} />
      )}
      {editPopup.show && (
        <div className="popup-add-edit-student">
          <div className="popup-header">
            <h3>Edit Student</h3>
            <button onClick={handleClose}>Close</button>
          </div>
          <div className="popup-content">
            <form onSubmit={handleSubmit}>
              <div className="first-row">
                <div className="input-box">
                  <label>
                    LRN
                    <input
                      type="text"
                      name="lrn"
                      value={formData.lrn}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              <div className="first-row">
                <div className="grade-level">
                  <label>
                    Select Program
                    <label>
                      <input
                        type="checkbox"
                        name="program"
                        value="Junior Highschool"
                        checked={juniorHighschoolChecked}
                        onChange={handleInputChange}
                      />
                      Junior Highschool
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="program"
                        value="Senior Highschool"
                        checked={seniorHighschoolChecked}
                        onChange={handleInputChange}
                      />
                      Senior Highschool
                    </label>
                  </label>
                </div>
              </div>

              <div className="first-row">
                <div className="input-box">
                  <label>
                    Grade Level
                    <select
                      name="grade_level"
                      value={formData.grade_level}
                      onChange={handleInputChange}
                      disabled
                    >
                      {juniorHighschoolChecked && (
                        <>
                          <option value=""></option>
                          <option value="7">Grade 7</option>
                          <option value="8">Grade 8</option>
                          <option value="9">Grade 9</option>
                          <option value="10">Grade 10</option>
                        </>
                      )}
                      {seniorHighschoolChecked && (
                        <>
                          <option value=""></option>
                          <option value="11">Grade 11</option>
                          <option value="12">Grade 12</option>
                        </>
                      )}
                    </select>
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Strand
                    <select
                      name="strand"
                      value={formData.strand}
                      onChange={handleInputChange}
                      disabled={juniorHighschoolChecked}
                    >
                      {seniorHighschoolChecked && (
                        <>
                          <option value=""></option>
                          <option value="Science, Technology, Engineering and Mathematics (STEM)">
                            Science, Technology, Engineering and Mathematics
                            (STEM)
                          </option>
                          <option value="Accountancy, Business and Management (ABM)">
                            Accountancy, Business and Management (ABM)
                          </option>
                          <option value="Humanities and Social Sciences (HUMSS)">
                            Humanities and Social Sciences (HUMSS)
                          </option>
                          <option value="TVL - Industrial Arts (TVL- IA)">
                            TVL - Industrial Arts (TVL-IA)
                          </option>
                          <option value="TVL - Home Economics (TVL-HE)">
                            TVL - Home Economics (TVL-HE)
                          </option>
                          <option value="TVL - Internet Communications Technology (TVL-ICT)">
                            TVL - Internet Communications Technology (TVL-ICT)
                          </option>
                        </>
                      )}
                    </select>
                  </label>
                </div>
              </div>

              <div className="second-row">
                <div className="input-box">
                  <label>
                    Last Name
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      disabled
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    First Name
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      disabled
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Middle Name
                    <input
                      type="text"
                      name="middle_name"
                      value={formData.middle_name}
                      onChange={handleInputChange}
                      disabled
                    />
                  </label>
                </div>
              </div>

              <div className="first-row">
                <div className="sex-box">
                  <label>
                    Sex
                    <label className="male">
                      <input
                        type="radio"
                        name="sex"
                        value="Male"
                        checked={formData.sex === "Male"}
                        onChange={handleInputChange}
                        disabled
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="sex"
                        value="Female"
                        checked={formData.sex === "Female"}
                        onChange={handleInputChange}
                        disabled
                      />
                      Female
                    </label>
                  </label>
                </div>
              </div>

              <div className="thrid-row">
                <div className="input-box">
                  <label>
                    Date of Birth
                    <input
                      type="date"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleInputChange}
                      disabled
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Place of Birth
                    <input
                      type="text"
                      name="place_of_birth"
                      value={formData.place_of_birth}
                      onChange={handleInputChange}
                      disabled
                    />
                  </label>
                </div>
              </div>

              <div className="fourth-row">
                <div className="input-box">
                  <label>
                    Nationality
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      disabled
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Religion
                    <input
                      type="text"
                      name="religion"
                      value={formData.religion}
                      onChange={handleInputChange}
                      disabled
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Civil Status
                    <input
                      type="text"
                      name="civil_status"
                      value={formData.civil_status}
                      onChange={handleInputChange}
                      disabled
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Birth Order
                    <input
                      type="text"
                      name="birth_order"
                      value={formData.birth_order}
                      onChange={handleInputChange}
                      disabled
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Contact Number
                    <input
                      type="tel"
                      name="contact_number"
                      value={formData.contact_number}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              <div className="fifth-row">
                <div className="input-box">
                  <label>
                    Financial Support
                    <select
                      name="financial_support"
                      value={formData.financial_support}
                      onChange={handleInputChange}
                    >
                      <option value=""></option>
                      <option value="Self-supporting (Working)">
                        Self-supporting (Working)
                      </option>
                      <option value="Parent's Full Support">
                        Parent's Full Support
                      </option>
                      <option value="Relatives/Family Friends">
                        Relatives/Family Friends
                      </option>
                      <option value="Scholarship/Subsidy">
                        Scholarship/Subsidy
                      </option>
                    </select>
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Scholarship/Subsidy (name of grant)
                    <input
                      type="text"
                      name="scholarship_grant"
                      value={formData.scholarship_grant}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              <div className="sixth-row">
                <div className="input-box">
                  <label>
                    House No./Street/Barangay
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              <div className="seventh-row">
                <div className="input-box">
                  <label>
                    City/Municipality
                    <input
                      type="text"
                      name="city_municipality"
                      value={formData.city_municipality}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Province
                    <input
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Country
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    ZIP Code
                    <input
                      type="text"
                      name="zip_code"
                      value={formData.zip_code}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              <div className="eighth-row">
                <div className="input-box">
                  <label>
                    School Name
                    <input
                      type="text"
                      name="school_name"
                      value={formData.school_name}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Year Attended
                    <input
                      type="text"
                      name="years_attended"
                      value={formData.years_attended}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              <div className="ninth-row">
                <div className="input-box">
                  <label>
                    Honors/Awards
                    <input
                      type="text"
                      name="honors_awards"
                      value={formData.honors_awards}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    School Address
                    <input
                      type="text"
                      name="school_address"
                      value={formData.school_address}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              {/* Father's Info */}
              <div className="tenth-row">
                <div className="input-box">
                  <label>
                    Father's Name
                    <input
                      type="text"
                      name="name_father"
                      value={formData.name_father}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Occupation
                    <input
                      type="text"
                      name="occupation_father"
                      value={formData.occupation_father}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Contact Number
                    <input
                      type="tel"
                      name="contact_father"
                      value={formData.contact_father}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              {/* Mother's Info */}
              <div className="tenth-row">
                <div className="input-box">
                  <label>
                    Mother's Name
                    <input
                      type="text"
                      name="name_mother"
                      value={formData.name_mother}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Occupation
                    <input
                      type="text"
                      name="occupation_mother"
                      value={formData.occupation_mother}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Contact Number
                    <input
                      type="tel"
                      name="contact_mother"
                      value={formData.contact_mother}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              {/* Guardian Info */}
              <div className="tenth-row">
                <div className="input-box">
                  <label>
                    Guardian Name
                    <input
                      type="text"
                      name="guardian_name"
                      value={formData.guardian_name}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Relationship
                    <input
                      type="text"
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Guardian's Address
                    <input
                      type="text"
                      name="guardian_address"
                      value={formData.guardian_address}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="input-box">
                  <label>
                    Contact Number{" "}
                    <input
                      type="tel"
                      name="contact_guardian"
                      value={formData.contact_guardian}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
              </div>

              <div class="buttons">
                <button type="submit" class="btn-box" name="edit" id="edit">
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {viewPopup.show && (
        <div className="popup-blurred-background" onClick={handleClose} />
      )}
      {viewPopup.show && (
        <div className="popup-view-student">
          <div className="popup-header">
            <h3>View Student</h3>
            <button onClick={handleClose}>Close</button>
          </div>
          <div className="popup-content">
            <p>Student ID: {viewPopup.record.student_id}</p>
            <p>Last Name: {viewPopup.record.last_name}</p>
            <p>First Name: {viewPopup.record.first_name}</p>
            <p>Middle Name: {viewPopup.record.middle_name}</p>
            <p>Program: {viewPopup.record.program}</p>
            <p>Grade Level: {viewPopup.record.grade_level}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_StudentsRecords;