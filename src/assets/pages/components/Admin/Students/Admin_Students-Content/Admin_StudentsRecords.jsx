import React, { useState, useEffect } from 'react';
import { FaRegEye } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import axios from 'axios';

const Admin_StudentsRecords = ({ selectedStudentIds, studentId = '', studentRecords, onSelectStudent }) => {
  const [popup, setPopup] = useState({ show: false, record: null });
  const [editPopup, setEditPopup] = useState({ show: false, record: null });
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    lrn: '',
    birth_date: '',
    sex: '',
    place_of_birth: '',
    nationality: '',
    religion: '',
    civil_status: '',
    birth_order: '',
    contact_number: '',
    program: '',
    grade_level: '',
    strand: '',
    financial_support: '',
    scholarship_grant: '',
    school_name: '',
    years_attended: '',
    honors_awards: '',
    school_address: '',
    address: '',
    city_municipality: '',
    province: '',
    country: '',
    zip_code: '',
    name_father: '',
    occupation_father: '',
    contact_father: '',
    name_mother: '',
    occupation_mother: '',
    contact_mother: '',
    guardian_name: '',
    relationship: '',
    guardian_address: '',
    contact_guardian: ''
  });

  const [juniorHighschoolChecked, setJuniorHighschoolChecked] = useState(false);
  const [seniorHighschoolChecked, setSeniorHighschoolChecked] = useState(false);

  const formatToDateInput = (isoDate) => {
  // Check if the date is valid and in ISO format
  if (isoDate) {
    return isoDate.split('T')[0]; // Split on 'T' and return the first part (yyyy-MM-dd)
  }
  return ''; // Return an empty string if no date is provided
};

  useEffect(() => {
    console.log('Student ID:', studentId); // Add this line for debugging
    if (studentId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/getStudentData/${studentId}`);
          console.log(response.data); // Log the response data
        } catch (error) {
          console.error('Error:', error);
        }
      };
      fetchData();
    } else {
      console.warn('No student ID provided');
    }
  }, [studentId]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData); // Log the form data
    try {
      const response = await axios.put(`http://localhost:3000/updateStudentData/${editPopup.record.student_id}`, formData);
      console.log('Response:', response); // Log the response
      alert('Student data updated successfully');
      setEditPopup({ show: false, record: null });
    } catch (error) {
      console.error('Error occurred while updating student data:', error); // More specific error logging
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Request made but no response received:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
    }
  };
  

  const handlePopup = (record) => {
    setPopup({ show: true, record });
  };

  const handleEditPopup = async (record) => {
    try {
      const response = await axios.get(`http://localhost:3000/getStudentData/${record.student_id}`);
      const data = response.data;

      setFormData({
        first_name: data?.accountData?.first_name || '',
        middle_name: data?.accountData?.middle_name || '',
        last_name: data?.accountData?.last_name || '',
        lrn: data?.studentData?.lrn || '',
        birth_date: data?.studentData?.birth_date || '',
        sex: data?.studentData?.sex || '',
        place_of_birth: data?.studentData?.place_of_birth || '',
        nationality: data?.studentData?.nationality || '',
        religion: data?.studentData?.religion || '',
        civil_status: data?.studentData?.civil_status || '',
        birth_order: data?.studentData?.birth_order || '',
        contact_number: data?.studentData?.contact_number || '',
        program: data?.studentData?.program || '',
        grade_level: data?.studentData?.grade_level || '',
        strand: data?.studentData?.strand || '',
        financial_support: data?.studentData?.financial_support || '',
        scholarship_grant: data?.studentData?.scholarship_grant || '',
        school_name: data?.schoolHistoryData?.school_name || '',
        years_attended: data?.schoolHistoryData?.years_attended || '',
        honors_awards: data?.schoolHistoryData?.honors_awards || '',
        school_address: data?.schoolHistoryData?.school_address || '',
        address: data?.addressData?.address || '',
        city_municipality: data?.addressData?.city_municipality || '',
        province: data?.addressData?.province || '',
        country: data?.addressData?.country || '',
        zip_code: data?.addressData?.zip_code || '',
        name_father: data?.contactData?.name_father || '',
        occupation_father: data?.contactData?.occupation_father || '',
        contact_father: data?.contactData?.contact_father || '',
        name_mother: data?.contactData?.name_mother || '',
        occupation_mother: data?.contactData?.occupation_mother || '',
        contact_mother: data?.contactData?.contact_mother || '',
        guardian_name: data?.emergencyContactData?.guardian_name || '',
        relationship: data?.emergencyContactData?.relationship || '',
        guardian_address: data?.emergencyContactData?.guardian_address || '',
        contact_guardian: data?.emergencyContactData?.contact_guardian || ''
      });

      setJuniorHighschoolChecked(data?.studentData?.program === 'Junior Highschool');
      setSeniorHighschoolChecked(data?.studentData?.program === 'Senior Highschool');

      setEditPopup({ show: true, record });
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleClose = () => {
    setPopup({ show: false, record: null });
    setEditPopup({ show: false, record: null });
    setFormData({
      first_name: '',
      middle_name: '',
      last_name: '',
      lrn: '',
      birth_date: '',
      sex: '',
      place_of_birth: '',
      nationality: '',
      religion: '',
      civil_status: '',
      birth_order: '',
      contact_number: '',
      program: '',
      grade_level: '',
      strand: '',
      financial_support: '',
      scholarship_grant: '',
      school_name: '',
      years_attended: '',
      honors_awards: '',
      school_address: '',
      address: '',
      city_municipality: '',
      province: '',
      country: '',
      zip_code: '',
      name_father: '',
      occupation_father: '',
      contact_father: '',
      name_mother: '',
      occupation_mother: '',
      contact_mother: '',
      guardian_name: '',
      relationship: '',
      guardian_address: '',
      contact_guardian: ''
    });
  };

  return (
    <div className="student-records">
      <div className="recordslist-container">
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Student ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name </th>
              <th>Program</th>
              <th>Grade Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentRecords.map((record) => (
              <tr
                key={record.student_id}
                className={selectedStudentIds.includes(record.student_id) ? "checked" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudentIds.includes(record.student_id)}
                    onChange={() => onSelectStudent(record.student_id)}
                  />
                </td>
                <td>{record.student_id}</td>
                <td>{record.last_name}</td>
                <td>{record.first_name}</td>
                <td>{record.middle_name}</td>
                <td>{record.program}</td>
                <td>{record.grade_level}</td>
                <td>
                  <span
                    className="view-details-link"
                    onClick={() => handlePopup(record)}
                  >
                    <FaRegEye />
                  </span>
                  <button
                    className="edit-button"
                    onClick={() => handleEditPopup(record)}
                    style={{ marginLeft: "10px" }}
                  >
                    <BiEditAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
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

              <div className='first-row'>
                <div className='input-box'>
                  <label>LRN<input type="text" name="lrn" value={formData.lrn} onChange={handleInputChange} /></label>
                </div>
              </div>

              <div className='first-row'>
                <div className='grade-level'>
                  <label>Select Program
                    <label><input type="checkbox" name="program" value="Junior Highschool" checked={juniorHighschoolChecked} onChange={handleInputChange} />Junior Highschool</label>
                    <label><input type="checkbox" name="program" value="Senior Highschool" checked={seniorHighschoolChecked} onChange={handleInputChange} />Senior Highschool</label>
                  </label>
                </div>
              </div>

              <div className='first-row'>
                <div className='input-box'>
                  <label>Grade Level
                    <select name="grade_level" value={formData.grade_level} onChange={handleInputChange}>
                      {juniorHighschoolChecked && (
                        <>
                          <option value=""></option>
                          <option value="Grade 7">Grade 7</option>
                          <option value="Grade 8">Grade 8</option>
                          <option value="Grade 9">Grade 9</option>
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
                <div className='input-box'>
                  <label>Strand
                    <select name="strand" value={formData.strand} onChange={handleInputChange} disabled={juniorHighschoolChecked}>
                      {seniorHighschoolChecked && (
                        <>
                          <option value=""></option>
                          <option value="Science, Technology, Engineering and Mathematics (STEM)">Science, Technology, Engineering and Mathematics (STEM)</option>
                          <option value="Accountancy, Business and Management (ABM)">Accountancy, Business and Management (ABM)</option>
                          <option value="Humanities and Social Sciences (HUMSS)">Humanities and Social Sciences (HUMSS)</option>
                          <option value="TVL - Industrial Arts (TVL- IA)">TVL - Industrial Arts (TVL-IA)</option>
                          <option value="TVL - Home Economics (TVL-HE)">TVL - Home Economics (TVL-HE)</option>
                          <option value="TVL - Internet Communications Technology (TVL-ICT)">TVL - Internet Communications Technology (TVL-ICT)</option>
                        </>
                      )}
                    </select>
                  </label>
                </div>
              </div>

              <div className='second-row'>
                <div className='input-box'>
                  <label>Last Name<input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} /></label>
                </ div>
                <div className='input-box'>
                  < label>First Name<input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Middle Name<input type="text" name="middle_name" value={formData.middle_name} onChange={handleInputChange} /></label>
                </div>
              </div>

              <div className='first-row'>
                <div className='sex-box'>
                  <label>Sex
                    <label className='male'><input type="radio" name="sex" value="Male" checked={formData.sex === 'Male'} onChange={handleInputChange} />Male</label>
                    <label><input type="radio" name="sex" value="Female" checked={formData.sex === 'Female'} onChange={handleInputChange} />Female</label>
                  </label>
                </div>
              </div>

              <div className='thrid-row'>
                <div className='input-box'>
                  <label>Date of Birth<input type='date' name='birth_date' value={formData.birth_date} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Place of Birth<input type='text' name='place_of_birth' value={formData.place_of_birth} onChange={handleInputChange} /></label>
                </div>
              </div>

              <div className='fourth-row'>
                <div className='input-box'>
                  <label>Nationality<input type='text' name='nationality' value={formData.nationality} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Religion<input type='text' name='religion' value={formData.religion} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Civil Status<input type='text' name='civil_status' value={formData.civil_status} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Birth Order<input type='text' name='birth_order' value={formData.birth_order} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Contact Number<input type='tel' name='contact_number' value={formData.contact_number} onChange={handleInputChange} /></label>
                </div>
              </div>

              <div className='fifth-row'>
                <div className='input-box'>
                  <label>Financial Support
                    <select name="financial_support" value={formData.financial_support} onChange={handleInputChange}>
                      <option value=""></option>
                      <option value="Self-supporting (Working)">Self-supporting (Working)</option>
                      <option value="Parent's Full Support">Parent's Full Support</option>
                      <option value="Relatives/Family Friends">Relatives/Family Friends</option>
                      <option value="Scholarship/Subsidy">Scholarship/Subsidy</option>
                    </select>
                  </label>
                </div>
                <div className='input-box'>
                  <label>Scholarship/Subsidy (name of grant)<input type='text' name="scholarship_grant" value={formData.scholarship_grant} onChange={handleInputChange} /></label>
                </div>
              </div>

              <div className='sixth-row'>
                <div className='input-box'>
                  <label>House No./Street/Barangay<input type='text' name='address' value={formData.address} onChange={handleInputChange} /></label>
                </div>
              </div>

              <div className='seventh-row'>
                <div className='input-box'>
                  <label>City/Municipality<input type='text' name='city_municipality' value={formData.city_municipality} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Province<input type='text' name='province' value={formData.province} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Country<input type='text' name='country' value={formData.country} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>ZIP Code<input type='text' name='zip_code' value={formData.zip_code} onChange={handleInputChange} /></label>
                </div>
              </div>

              <div className='eighth-row'>
                <div className='input-box'>
                  <label>School Name<input type='text' name='school_name' value={formData.school_name} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Year Attended<input type='text' name='years_attended' value={formData.years_attended} onChange={handleInputChange} /></label >
                </div>
              </div>

              <div className='ninth-row'>
                <div className='input-box'>
                  <label>Honors/Awards<input type='text' name='honors_awards' value={formData.honors_awards} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>School Address<input type='text' name='school_address' value={formData.school_address} onChange={handleInputChange} /></label>
                </div>
              </div>

              {/* Father's Info */}
              <div className='tenth-row'>
                <div className='input-box'>
                  <label>Father's Name<input type='text' name='name_father' value={formData.name_father} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Occupation<input type='text' name='occupation_father' value={formData.occupation_father} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Contact Number<input type='tel' name='contact_father' value={formData.contact_father} onChange={handleInputChange} /></label>
                </div>
              </div>

              {/* Mother's Info */}
              <div className='tenth-row'>
                <div className='input-box'>
                  <label>Mother's Name<input type='text' name='name_mother' value={formData.name_mother} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Occupation<input type='text' name='occupation_mother' value={formData.occupation_mother} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Contact Number<input type='tel' name='contact_mother' value={formData.contact_mother} onChange={handleInputChange} /></label>
                </div>
              </div>

              {/* Guardian Info */}
              <div className='tenth-row'>
                <div className='input-box'>
                  <label>Guardian Name<input type='text' name='guardian_name' value={formData.guardian_name} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Relationship<input type='text' name='relationship' value={formData.relationship} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Guardian's Address<input type='text' name='guardian_address' value={formData.guardian_address} onChange={handleInputChange} /></label>
                </div>
                <div className='input-box'>
                  <label>Contact Number<input type='tel' name='contact_guardian' value={formData.contact_guardian} onChange={handleInputChange} /></label>
                </div>
              </div>

              <div class='buttons'>
                <button type="submit" class="btn-box" name="edit" id="edit">Done</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin_StudentsRecords;