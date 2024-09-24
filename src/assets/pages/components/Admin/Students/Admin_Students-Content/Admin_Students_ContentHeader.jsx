import React, {useState, useEffect} from 'react'
import './Admin_Students-Content.css'
import { BiSearch } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";
import { RiInboxUnarchiveLine } from "react-icons/ri";

const Admin_Students_ContentHeader = () => {
  const [popup, setPopup] = useState({
    add: false,
    edit: false,
    delete: false,
    archive: false,
  });

  const [formData, setFormData] = useState({
    lrn: '',
    lastName: '',
    firstName: '',
    middleName: '',
    dateOfBirth: '',
    sex: '',
    placeOfBirth: '',
    nationality: '',
    religion: '',
    civilStatus: '',
    birthOrder: '',
    contactNumber: '',
    studySupport: '',  // For financial support
    scholarshipName: '',  // Added based on 'schaolarship-name'
    address: '',
    cityMunicipality: '',
    province: '',
    country: '',
    zipCode: '',
    schoolName: '',  // Added from 'School Name'
    yearAttended: '',
    schoolAddress: '',
    honorsAwards: '',  // Added from 'Honors/Awards'
    classification: '',
    program: '',  // For checkbox options "jhs", "shs"
    strand: '',  // For strand selection
    fatherName: '',  // Added from 'Father's Name'
    occupationFather: '',  // Added from 'Father's Occupation'
    contactFather: '',  // Added from 'Father's Contact Number'
    motherName: '',  // Added from 'Mother's Name'
    occupationMother: '',  // Added from 'Mother's Occupation'
    contactMother: '',  // Added from 'Mother's Contact Number'
    guardianName: '',  // Added from 'Guardian Name'
    guardianRelationship: '',  // Added from 'Guardian Relationship'
    guardianAddress: '',  // Added from 'Guardian's Address'
    contactGuardian: '',  // Added from 'Guardian's Contact Number'
  });
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    handleClose();  // Close the popup after submitting
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

  // Disable scrolling when modal is open
   useEffect(() => {
    if (popup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset'; // Reset overflow when modal is closed
    }

    // Clean up the effect when the component unmounts or modal closes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [popup]);

  return (
    <div className='admin-student-header'>
      <h1 className='header-title'>Students</h1>
      <div className='admin-student-activity'>
        <div className='search-box'>
          <input type="text" placeholder='Search...' />
          <BiSearch className='search-icon' />
        </div>
        <div className='buttons-header'>
          <div className='buttons-act'>
            <RiAddLargeFill className='buttons-icon' onClick={() => handlePopup('add')} />
          </div>
          <div className='buttons-act'>
            <BiEditAlt className='buttons-icon' onClick={() => handlePopup('edit')} />
          </div>
          <div className='buttons-act'>
            <RiDeleteBin6Line className='buttons-icon' onClick={() => handlePopup('delete')} />
          </div>
          <div className='buttons-act'>
            <RiInboxUnarchiveLine className='buttons-icon' onClick={() => handlePopup('archive')} />
          </div>

          {/* Add Pop-up */}
          {popup.add && (
            <>
              <div className='popup-blurred-background' />
              <div className='popup-add-edit-student'>
                <div className='popup-header'>
                  <h3 className='popup-title'>Add Student</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className='popup-content'>
                  <form onSubmit={handleSubmit}>
                    <div className='first-row'>
                      <div className='input-box'>
                        <label>LRN<input type="text" name="lrn" value={formData.lrn} onChange={handleChange} /></label>
                      </div>
                    </div>

                    <div className='first-row'>
                      <div className='grade-level'>
                        <label>Select Program</label>
                        <label><input type="checkbox" name="program" value="jhs" checked={formData.program === 'jhs'} onChange={handleChange} />Junior Highschool</label>
                        <label><input type="checkbox" name="program" value="shs" checked={formData.program === 'shs'} onChange={handleChange} />Senior Highschool</label>
                      </div>
                    </div>

                    <div className='first-row'>
                      <div className='input-box'>
                        <label>Grade Level
                          <select name="gradeLevel" value={formData.gradeLevel} onChange={handleChange}>
                            <option value=""></option>
                            <option value="grade7">Grade 7</option>
                            <option value="grade8">Grade 8</option>
                            <option value="grade9">Grade 9</option>
                            <option value="grade10">Grade 10</option>
                          </select>
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Strand
                          <select name="strand" value={formData.strand} onChange={handleChange}>
                            <option value=""></option>
                            <option value="stem">Science, Technology, Engineering and Mathematics (STEM)</option>
                            <option value="abm">Accountancy, Business and Management (ABM)</option>
                            <option value="humss">Humanities and Social Sciences (HUMSS)</option>
                            <option value="tvl-ia">TVL - Industrial Arts (TVL-IA)</option>
                            <option value="tvl-he">TVL - Home Economics (TVL-HE)</option>
                            <option value="tvl-ict">TVL - Internet Communications Technology (TVL-ICT)</option>
                          </select>
                        </label>
                      </div>
                    </div>

                    <div className='second-row'>
                      <div className='input-box'>
                        <label>Last Name<input type="text" name="lastName" value={formData.lastName} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>First Name<input type="text" name="firstName" value={formData.firstName} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Middle Name<input type="text" name="middleName" value={formData.middleName} onChange={handleChange} /></label>
                      </div>
                    </div>

                    <div className='first-row'>
                      <div className='sex-box'>
                        <label>Sex</label>
                        <label><input type="radio" name="sex" value="male" checked={formData.sex === 'male'} onChange={handleChange} />Male</label>
                        <label><input type="radio" name="sex" value="female" checked={formData.sex === 'female'} onChange={handleChange} />Female</label>
                      </div>
                    </div>

                    <div className='thrid-row'>
                      <div className='input-box'>
                        <label>Date of Birth<input type='date' name='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Place of Birth<input type='text' name='placeOfBirth' value={formData.placeOfBirth} onChange={handleChange} /></label>
                      </div>
                    </div>

                    <div className='fourth-row'>
                      <div className='input-box'>
                        <label>Nationality<input type='text' name='nationality' value={formData.nationality} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Religion<input type='text' name='religion' value={formData.religion} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Civil Status<input type='text' name='civilStatus' value={formData.civilStatus} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Birth Order<input type='text' name='birthOrder' value={formData.birthOrder} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number<input type='tel' name='contactNumber' value={formData.contactNumber} onChange={handleChange} /></label>
                      </div>
                    </div>

                    <div className='fifth-row'>
                      <div className='input-box'>
                        <label>Financial Support
                          <select name="studySupport" value={formData.studySupport} onChange={handleChange}>
                            <option value=""></option>
                            <option value="self-supporting">Self-supporting (Working)</option>
                            <option value="parents-support">Parent's Full Support</option>
                            <option value="relatives-support">Relatives/Family Friends</option>
                            <option value="scholarship">Scholarship/Subsidy</option>
                          </select>
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Scholarship/Subsidy (name of grant)<input type='text' name="scholarshipName" value={formData.scholarshipName} onChange={handleChange} /></label>
                      </div>
                    </div>

                    <div className='sixth-row'>
                      <div className='input-box'>
                        <label>House No./Street/Barangay<input type='text' name='address' value={formData.address} onChange={handleChange} /></label>
                      </div>
                    </div>

                    <div className='seventh-row'>
                      <div className='input-box'>
                        <label>City/Municipality<input type='text' name='cityMunicipality' value={formData.cityMunicipality} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Province<input type='text' name='province' value={formData.province} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Country<input type='text' name='country' value={formData.country} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>ZIP Code<input type='text' name='zipCode' value={formData.zipCode} onChange={handleChange} /></label>
                      </div>
                    </div>

                    <div className='eighth-row'>
                      <div className='input-box'>
                        <label>School Name<input type='text' name='schoolName' value={formData.schoolName} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Year Attended<input type='text' name='yearAttended' value={formData.yearAttended} onChange={handleChange} /></label>
                      </div>
                    </div>

                    <div className='ninth-row'>
                      <div className='input-box'>
                        <label>Honors/Awards<input type='text' name='honorsAwards' value={formData.honorsAwards} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>School Address<input type='text' name='schoolAddress' value={formData.schoolAddress} onChange={handleChange} /></label>
                      </div>
                    </div>

                    {/* Father's Info */}
                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Father's Name<input type='text' name='fatherName' value={formData.fatherName} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Occupation<input type='text' name='occupationFather' value={formData.occupationFather} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number<input type='tel' name='contactFather' value={formData.contactFather} onChange={handleChange} /></label>
                      </div>
                    </div>

                    {/* Mother's Info */}
                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Mother's Name<input type='text' name='motherName' value={formData.motherName} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Occupation<input type='text' name='occupationMother' value={formData.occupationMother} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number<input type='tel' name='contactMother' value={formData.contactMother} onChange={handleChange} /></label>
                      </div>
                    </div>

                    {/* Guardian Info */}
                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Guardian Name<input type='text' name='guardianName' value={formData.guardianName} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Relationship<input type='text' name='guardianRelationship' value={formData.guardianRelationship} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Guardian's Address<input type='text' name='guardianAddress' value={formData.guardianAddress} onChange={handleChange} /></label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number<input type='tel' name='contactGuardian' value={formData.contactGuardian} onChange={handleChange} /></label>
                      </div>
                    </div>

                    <div class='buttons'>
                      <button type="submit" class="btn-box" name="add" id="add">Done</button>
                    </div>

                  </form>
                </div>
              </div>
            </>
          )}

          {/* Edit Pop-up */}
          {popup.edit && (
            <>
              <div className='popup-blurred-background' onClick={handleClose} />
              <div className='popup-add-edit-student'>
                <div className='popup-header'>
                  <h3>Edit Student</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className='popup-content'>
                  <form onSubmit={handleSubmit}>
                    <div className='first-row'>
                      <div className='input-box'>
                        <label>LRN
                          <input type="text" name="lrn" value={formData.lrn} onChange={handleChange} />
                        </label>
                      </div>
                    </div>

                    <div className='second-row'>
                      <div className='input-box'>
                        <label>Last Name
                          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>First Name
                          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Middle Name
                          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
                        </label>
                      </div>
                    </div>

                    <div className='first-row'>
                      <div className='sex-box'>
                        <label>Sex</label>
                        <label><input type="radio" name="sex" value="male" checked={formData.sex === 'male'} onChange={handleChange} /> Male</label>
                        <label><input type="radio" name="sex" value="female" checked={formData.sex === 'female'} onChange={handleChange} /> Female</label>
                      </div>
                    </div>

                    <div className='third-row'>
                      <div className='input-box'>
                        <label>Date of Birth
                          <input type='date' name='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Place of Birth
                          <input type='text' name='placeOfBirth' value={formData.placeOfBirth} onChange={handleChange} />
                        </label>
                      </div>
                    </div>

                    <div className='fourth-row'>
                      <div className='input-box'>
                        <label>Nationality
                          <input type='text' name='nationality' value={formData.nationality} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Religion
                          <input type='text' name='religion' value={formData.religion} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Civil Status
                          <input type='text' name='civilStatus' value={formData.civilStatus} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Birth Order
                          <input type='text' name='birthOrder' value={formData.birthOrder} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number
                          <input type='tel' name='contactNumber' value={formData.contactNumber} onChange={handleChange} />
                        </label>
                      </div>
                    </div>

                    <div className='fifth-row'>
                      <div className='input-box'>
                        <label>Financial Support
                          <select name="studySupport" value={formData.studySupport} onChange={handleChange}>
                            <option value=""></option>
                            <option value="self-supporting">Self-supporting (Working)</option>
                            <option value="parents-support">Parent's Full Support</option>
                            <option value="relatives-support">Relatives/Family Friends</option>
                            <option value="scholarship">Scholarship/Subsidy</option>
                          </select>
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Scholarship/Subsidy (name of grant)
                          <input type='text' name="scholarshipName" value={formData.scholarshipName} onChange={handleChange} />
                        </label>
                      </div>
                    </div>

                    <div className='sixth-row'>
                      <div className='input-box'>
                        <label>House No./Street/Barangay
                          <input type='text' name='address' value={formData.address} onChange={handleChange} />
                        </label>
                      </div>
                    </div>

                    <div className='seventh-row'>
                      <div className='input-box'>
                        <label>City/Municipality
                          <input type='text' name='cityMunicipality' value={formData.cityMunicipality} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Province
                          <input type='text' name='province' value={formData.province} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Country
                          <input type='text' name='country' value={formData.country} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>ZIP Code
                          <input type='text' name='zipCode' value={formData.zipCode} onChange={handleChange} />
                        </label>
                      </div>
                    </div>

                    <div className='eighth-row'>
                      <div className='input-box'>
                        <label>School Name
                          <input type='text' name='schoolName' value={formData.schoolName} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Year Attended
                          <input type='text' name='yearAttended' value={formData.yearAttended} onChange={handleChange} />
                        </label>
                      </div>
                    </div>

                    <div className='ninth-row'>
                      <div className='input-box'>
                        <label>School Address
                          <input type='text' name='schoolAddress' value={formData.schoolAddress} onChange={handleChange} />
                        </label>
                      </div>
                    </div>

                    {/* Father's Info */}
                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Father's Name
                          <input type='text' name='fatherName' value={formData.fatherName} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Occupation
                          <input type='text' name='occupationFather' value={formData.occupationFather} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number
                          <input type='tel' name='contactFather' value={formData.contactFather} onChange={handleChange} />
                        </label>
                      </div>
                    </div>

                    {/* Mother's Info */}
                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Mother's Name
                          <input type='text' name='motherName' value={formData.motherName} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Occupation
                          <input type='text' name='occupationMother' value={formData.occupationMother} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number
                          <input type='tel' name='contactMother' value={formData.contactMother} onChange={handleChange} />
                        </label>
                      </div>
                    </div>

                    {/* Guardian Info */}
                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Guardian Name
                          <input type='text' name='guardianName' value={formData.guardianName} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Relationship
                          <input type='text' name='guardianRelationship' value={formData.guardianRelationship} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Guardian's Address
                          <input type='text' name='guardianAddress' value={formData.guardianAddress} onChange={handleChange} />
                        </label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number
                          <input type='tel' name='contactGuardian' value={formData.contactGuardian} onChange={handleChange} />
                        </label>
                      </div>
                    </div>

                    <div className='buttons'>
                      <button type="submit" className="btn-box" name="add" id="add">Done</button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}


          {/* Delete Pop-up */}
          {popup.delete && (
            <>
              <div className='popup-blurred-background' onClick={handleClose} />
              <div className='popup'>
                <div className='popup-header'>
                  <h3>Delete Student</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className='popup-content'>
                  <p>Are you sure you want to delete the selected student? This action is cannot be undone.</p>
                  <div className='buttons'>
                    <button type="submit" class="btn-box" name="delete" id="delete">Delete</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Archive Pop-up */}
          {popup.archive && (
            <>
              <div className='popup-blurred-background' onClick={handleClose} />
              <div className='popup'>
                <div className='popup-header'>
                  <h3>Archive Student</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className='popup-content'>
                  <p>Do you want to archive the selected student?</p>
                  <div className='buttons'>
                    <button type="submit" class="btn-box" name="archive" id="archive">Archive</button>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

    </div>
  )
}

export default Admin_Students_ContentHeader
