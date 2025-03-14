import React, { useState, useEffect } from "react";
import "./Registrar_Students-Content.css";
import { BiSearch } from "react-icons/bi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";
import { RiInboxUnarchiveLine } from "react-icons/ri";

const Registrar_Students_ContentHeader = ({
  selectedStudentIds,
  onDelete,
  updateStudentRecords,
}) => {
  const [popup, setPopup] = useState({
    add: false,
    edit: false,
    delete: false,
    archive: false,
  });

  const [formData, setFormData] = useState({
    lrn: "",
    first_name: "",
    middle_name: "",
    last_name: "",
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

  const [juniorHighschoolChecked, setJuniorHighschoolChecked] = useState(false);
  const [seniorHighschoolChecked, setSeniorHighschoolChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "program") {
      if (value === "Junior Highschool") {
        setJuniorHighschoolChecked(true);
        setSeniorHighschoolChecked(false);
      } else if (value === "Senior Highschool") {
        setJuniorHighschoolChecked(false);
        setSeniorHighschoolChecked(true);
      }
    }
  };

  const handlePopup = (type) => {
    setPopup((prevPopup) => ({ ...prevPopup, [type]: !prevPopup[type] }));
  };

  const handleClose = () => {
    setPopup({
      add: false,
      edit: false,
      delete: false,
      archive: false,
    });
  };

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
      "school_address",
      "years_attended",
      "financial_support"
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
  //alert(errorMessage);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const adjustedData = { ...formData };

    const formatDate = (dateString) => {
      if (!dateString) return ""; // Handle empty date strings gracefully
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Zero-padded month
      const day = String(date.getDate()).padStart(2, "0"); // Zero-padded day
      return `${year}-${month}-${day}`; // Return formatted date in YYYY-MM-DD format
    };
    const handleDeleteClick = () => {
      // Update this condition to match the logic of your checkbox selection
      const hasSelectedStudent = checkIfStudentIsSelected(); // Implement this function based on your logic
      setIsStudentSelected(hasSelectedStudent);
    };
    const integerFields = ["lrn"];
    integerFields.forEach((field) => {
      adjustedData[field] =
        adjustedData[field] === "" ? null : adjustedData[field];
    });

    try {
      const response = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/registerStudent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adjustedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Failed to register student: ${errorText || "Unknown error"}`);
        return;
      }

      alert("Student successfully registered!");

      // Fetch updated student records
      const updatedResponse = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/students");
      const updatedRecords = await updatedResponse.json();
      updateStudentRecords(updatedRecords); // Update parent state

      // Reset the form and close the popup
      setFormData({
        lrn: "",
        first_name: "",
        middle_name: "",
        last_name: "",
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
      }); // Reset form data
      setPopup({ add: false });
    } catch (error) {
      alert("Network error: Failed to reach the server.");
    }
  };

  const handleArchive = async () => {
    try {
      const response = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/archiveStudents", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentIds: selectedStudentIds,
          newStatus: formData.student_status, // Send student_status from formData
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Failed to archive student: ${errorText || "Unknown error"}`);
        return;
      }

      alert("Student successfully archived!");

      // Fetch updated student records
      const updatedResponse = await fetch("https://san-juan-institute-of-technology-backend.onrender.com/students");
      const updatedRecords = await updatedResponse.json();
      updateStudentRecords(updatedRecords); // Update parent state

      // Close the popup
      handleClose();
    } catch (error) {
      alert("Network error: Failed to reach the server.");
    }
  };

  // Disable scrolling when modal is open
  useEffect(() => {
    if (popup.add || popup.edit || popup.delete || popup.archive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset"; // Reset overflow when modal is closed
    }

    // Clean up the effect when the component unmounts or modal closes
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [popup]);

  return (
    <div className="admin-student-header">
      <h1 className="header-title">Students</h1>
      <div className="admin-student-activity">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <BiSearch className="search-icon" />
        </div>
        <div className="buttons-header">
          <div className="buttons-act">
            <RiAddLargeFill
              className="buttons-icon"
              onClick={() => handlePopup("add")}
            />
          </div>
          <div className="buttons-act">
            <RiDeleteBin6Line
              className="buttons-icon"
              onClick={() => handlePopup("delete")}
            />
          </div>
          <div className="buttons-act">
            <RiInboxUnarchiveLine
              className="buttons-icon"
              onClick={() => handlePopup("archive")}
            />
          </div>

          {/* Add Pop-up */}
          {popup.add && (
            <>
              <div className="popup-blurred-background" />
              <div className="popup-add-edit-student">
                <div className="popup-header">
                  <h3 className="popup-title">Add Student</h3>
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
                            onChange={handleChange}
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
                              onChange={handleChange}
                            />
                            Junior Highschool
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              name="program"
                              value="Senior Highschool"
                              checked={seniorHighschoolChecked}
                              onChange={handleChange}
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
                            onChange={handleChange}
                          >
                            {juniorHighschoolChecked && (
                              <>
                                <option value=""></option>
                                <option value="Grade 7">Grade 7</option>
                                <option value="Grade 8">Grade 8</option>
                                <option value=" Grade 9">Grade 9</option>
                                <option value="Grade 10">Grade 10</option>
                              </>
                            )}
                            {seniorHighschoolChecked && (
                              <>
                                <option value=""></option>
                                <option value="Grade 11">Grade 11</option>
                                <option value="Grade 12">Grade 12</option>
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
                            onChange={handleChange}
                            disabled={juniorHighschoolChecked}
                          >
                            {seniorHighschoolChecked && (
                              <>
                                <option value=""></option>
                                <option value="Science, Technology, Engineering and Mathematics (STEM)">
                                  Science, Technology, Engineering and
                                  Mathematics (STEM)
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
                                  TVL - Information Communications Technology
                                  (TVL-ICT)
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                              onChange={handleChange}
                            />
                            Male
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="sex"
                              value="Female"
                              checked={formData.sex === "Female"}
                              onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                      <div className="input-box">
                        <label>
                          Contact Number
                          <input
                            type="tel"
                            name="contact_guardian"
                            value={formData.contact_guardian}
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                    </div>

                    <div class="buttons">
                      <button type="submit" class="btn-box" name="add" id="add">
                        Done
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}

          {/* Delete Pop-up */}
          {popup.delete && (
            <>
              <div className="popup-blurred-background" onClick={handleClose} />
              <div className="popup">
                <div className="popup-header">
                  <h3>Delete Student</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className="popup-content">
                  {selectedStudentIds.length > 0 ? (
                    <>
                      <p>
                        Are you sure you want to delete the selected student?
                        This action cannot be undone.
                      </p>
                      <div className="buttons">
                        <button
                          type="button"
                          class="btn-box"
                          onClick={() => {
                            onDelete();
                            handleClose();
                            window.location.reload();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <p>No student selected.</p>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Archive Pop-up */}
          {popup.archive && (
            <>
              <div className="popup-blurred-background" onClick={handleClose} />
              <div className="popup">
                <div className="popup-header">
                  <h3>Archive Student</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className="popup-content">
                  {selectedStudentIds.length > 0 ? (
                    <>
                      <p>
                        Please select the archive type of the selected
                        student(s)
                      </p>
                      <div className="buttons">
                        <select
                          className="form-select"
                          aria-label="Select Archive Type"
                          name="student_status"
                          value={formData.student_status}
                          onChange={handleChange}
                        >
                          <option value=""></option>
                          <option value="Dropped">Dropped</option>
                          <option value="Transferred">Transferred</option>
                          <option value="Graduated">Graduated</option>
                          <option value="Completer">Completer</option>
                        </select>
                        <button
                          type="button"
                          className="btn-box-archive"
                          name="archive"
                          id="archive"
                          onClick={handleArchive}
                        >
                          Archive
                        </button>
                      </div>
                    </>
                  ) : (
                    <p>No student selected to archive.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );F
};

export default Registrar_Students_ContentHeader;