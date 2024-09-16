import React, {useState} from 'react'
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
    studySupport: '',
    address: '',
    cityMunicipality: '',
    province: '',
    country: '',
    zipCode: '',
    schoolAttended: '',
    yearAttended: '',
    schoolAddress: '',
    awards: '',
    classification: '',


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
                      <div className='grade-level'>
                        <label>Junior Highschool</label>
                        <label><input type="checkbox" name="grade7" onChange={handleChange} />Grade 7</label>
                        <label><input type="checkbox" name="grade8" onChange={handleChange} />Grade 8</label>
                        <label><input type="checkbox" name="grade9" onChange={handleChange} />Grade 9</label>
                        <label><input type="checkbox" name="grade10" onChange={handleChange} />Grade 10</label>
                      </div>
                    </div>

                    <div className='first-row'>
                      <div className='grade-level'>
                        <label>Senior Highschool</label>
                        <label><input type="checkbox" name="grade11" onChange={handleChange} />Grade 11</label>
                        <label><input type="checkbox" name="grade12" onChange={handleChange} />Grade 12</label>
                      </div>
                      <div className='grade-level'>
                        <label>Strand</label>
                        <label><input type="checkbox" name="grade11" onChange={handleChange} />STEM</label>
                        <label><input type="checkbox" name="grade12" onChange={handleChange} />ABM</label>
                        <label><input type="checkbox" name="grade12" onChange={handleChange} />HUMSS</label>
                        <label><input type="checkbox" name="grade12" onChange={handleChange} />IA</label>
                        <label><input type="checkbox" name="grade12" onChange={handleChange} />ICT</label>
                        <label><input type="checkbox" name="grade12" onChange={handleChange} />HE</label>
                      </div>
                    </div>

                    <div className='second-row'>
                      <div className='input-box'>
                        <label>Last Name<input type="text" name="lastName" /></label>
                      </div>
                      <div className='input-box'>
                        <label>First Name<input type="text" name="firstName" /></label>
                      </div>
                      <div className='input-box'>
                        <label>Middle Name<input type="text" name="firstName" /></label>
                      </div>
                    </div>

                    <div className='thrid-row'>
                      <div className='input-box'>
                        <label>Date of Birth<input type='date' name='dateOfBirth' /></label>
                      </div>
                      <div className='row'>
                        <div className='sex-box'>
                          <div className='sex-options'>
                            <label>Sex</label>
                            <div className='sex'>
                              <label htmlFor='Male'><input type='radio' name='sex' value='Male' />Male</label>
                            </div>
                            <div className='sex'>
                              <label htmlFor='Female'><input type='radio' name='sex' value='Female' />Female</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='input-box'>
                        <label>Place of Birth<input type='text' name='placeOfBirth' /></label>
                      </div>
                    </div>

                    <div className='fourth-row'>
                      <div className='input-box'>
                        <label>Nationality<input type='text' name='nationality' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Religion<input type='text' name='religion' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Civil Status<input type='text' name='civilStatus' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Birth Order<input type='text' name='birthOrder' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number<input type='tel' name='contactNumber' /></label>
                      </div>
                    </div>

                    <div className='fifth-row'>
                      
                    </div>

                    <div className='sixth-row'>
                      <div className='input-box'>
                        <label>House No./Street/Barangay<input type='text' name='address' /></label>
                      </div>
                    </div>

                    <div className='seventh-row'>
                      <div className='input-box'>
                        <label>City/Municipality<input type='text' name='cityMunicipality' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Province<input type='text' name='province' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Country<input type='text' name='country' /></label>
                      </div>
                      <div className='input-box'>
                        <label>ZIP Code<input type='text' name='zipCode' /></label>
                      </div>
                    </div>

                    <div className='eighth-row'>
                      <div className='input-box'>
                        <label>School Name<input type='text' name='schoolName' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Year Attended<input type='text' name='yearAttended' /></label>
                      </div>
                    </div>

                    <div className='ninth-row'>
                      <div className='input-box'>
                        <label>School Address<input type='text' name='schoolAddress' /></label>
                      </div>
                    </div>

                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Father's Name<input type='text' name='fatherName' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Occupation<input type='text' name='occupationFather' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number<input type='tel' name='contactFather' /></label>
                      </div>
                    </div>

                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Mother's Name<input type='text' name='motherName' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Occupation<input type='text' name='occupationMother' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number<input type='tel' name='contactMother' /></label>
                      </div>
                    </div>

                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Guardian Name<input type='text' name='guardianName' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Relationship<input type='text' name='guardianRelationship' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Guardian's Address<input type='text' name='guardianAddress' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number<input type='tel' name='contactGuardian' /></label>
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

                  <div className='second-row'>
                      <div className='input-box'>
                        <label>Last Name<input type="text" name="lastName" /></label>
                      </div>
                      <div className='input-box'>
                        <label>First Name<input type="text" name="firstName" /></label>
                      </div>
                      <div className='input-box'>
                        <label>Middle Name<input type="text" name="firstName" /></label>
                      </div>
                    </div>

                    <div className='thrid-row'>
                      <div className='input-box'>
                        <label>Date of Birth<input type='date' name='dateOfBirth' /></label>
                      </div>
                      <div className='row'>
                        <div className='sex-box'>
                          <div className='sex-options'>
                            <label>Sex</label>
                            <div className='sex'>
                              <label htmlFor='Male'><input type='radio' name='sex' value='Male' />Male</label>
                            </div>
                            <div className='sex'>
                              <label htmlFor='Female'><input type='radio' name='sex' value='Female' />Female</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='input-box'>
                        <label>Place of Birth<input type='text' name='placeOfBirth' /></label>
                      </div>
                    </div>

                    <div className='fourth-row'>
                      <div className='input-box'>
                        <label>Nationality<input type='text' name='nationality' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Religion<input type='text' name='religion' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Civil Status<input type='text' name='civilStatus' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Birth Order<input type='text' name='birthOrder' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number<input type='tel' name='contactNumber' /></label>
                      </div>
                    </div>

                    <div className='fifth-row'>
                      
                    </div>

                    <div className='sixth-row'>
                      <div className='input-box'>
                        <label>House No./Street/Barangay<input type='text' name='address' /></label>
                      </div>
                    </div>

                    <div className='seventh-row'>
                      <div className='input-box'>
                        <label>City/Municipality<input type='text' name='cityMunicipality' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Province<input type='text' name='province' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Country<input type='text' name='country' /></label>
                      </div>
                      <div className='input-box'>
                        <label>ZIP Code<input type='text' name='zipCode' /></label>
                      </div>
                    </div>

                    <div className='eighth-row'>
                      <div className='input-box'>
                        <label>School Name<input type='text' name='schoolName' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Year Attended<input type='text' name='yearAttended' /></label>
                      </div>
                    </div>

                    <div className='ninth-row'>
                      <div className='input-box'>
                        <label>School Address<input type='text' name='schoolAddress' /></label>
                      </div>
                    </div>

                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Father's Name<input type='text' name='fatherName' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Occupation<input type='text' name='occupationFather' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number<input type='tel' name='contactFather' /></label>
                      </div>
                    </div>

                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Mother's Name<input type='text' name='motherName' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Occupation<input type='text' name='occupationMother' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number<input type='tel' name='contactMother' /></label>
                      </div>
                    </div>

                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Guardian Name<input type='text' name='guardianName' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Relationship<input type='text' name='guardianRelationship' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Guardian's Address<input type='text' name='guardianAddress' /></label>
                      </div>
                      <div className='input-box'>
                        <label>Contact Number<input type='tel' name='contactGuardian' /></label>
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
