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
                        <label>Last Name</label>
                        <input type="text" name="lastName" />
                      </div>
                      <div className='input-box'>
                        <label>First Name</label>
                        <input type="text" name="firstName" />
                      </div>
                      <div className='input-box'>
                        <label>Middle Name</label>
                        <input type="text" name="firstName" />
                      </div>
                    </div>

                    <div className='thrid-row'>
                      <div className='input-box'>
                        <label>Date of Birth</label>
                        <input type='date' name='dateOfBirth' />
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
                        <label>Place of Birth</label>
                        <input type='text' name='placeOfBirth' />
                      </div>
                    </div>

                    <div className='fourth-row'>
                      <div className='input-box'>
                        <label>Nationality</label>
                        <input type='text' name='nationality' />
                      </div>
                      <div className='input-box'>
                        <label>Religion</label>
                        <input type='text' name='religion' />
                      </div>
                      <div className='input-box'>
                        <label>Civil Status</label>
                        <input type='text' name='civilStatus' />
                      </div>
                      <div className='input-box'>
                        <label>Birth Order</label>
                        <input type='text' name='birthOrder' />
                      </div>
                      <div className='input-box'>
                        <label>Contact Number</label>
                        <input type='tel' name='contactNumber' />
                      </div>
                    </div>

                    <div className='fifth-row'>
                      
                    </div>

                    <div className='sixth-row'>
                      <div className='input-box'>
                        <label>House No./Street/Barangay</label>
                        <input type='text' name='address' />
                      </div>
                    </div>

                    <div className='seventh-row'>
                      <div className='input-box'>
                        <label>City/Municipality</label>
                        <input type='text' name='cityMunicipality' />
                      </div>
                      <div className='input-box'>
                        <label>Province</label>
                        <input type='text' name='province' />
                      </div>
                      <div className='input-box'>
                        <label>Country</label>
                        <input type='text' name='country' />
                      </div>
                      <div className='input-box'>
                        <label>ZIP Code</label>
                        <input type='text' name='zipCode' />
                      </div>
                    </div>

                    <div className='eighth-row'>
                      <div className='input-box'>
                        <label>School Name</label>
                        <input type='text' name='schoolName' />
                      </div>
                      <div className='input-box'>
                        <label>Year Attended</label>
                        <input type='text' name='yearAttended' />
                      </div>
                    </div>

                    <div className='ninth-row'>
                      <div className='input-box'>
                        <label>School Address</label>
                        <input type='text' name='schoolAddress' />
                      </div>
                    </div>

                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Father's Name</label>
                        <input type='text' name='fatherName' />
                      </div>
                      <div className='input-box'>
                        <label>Occupation</label>
                        <input type='text' name='occupationFather' />
                      </div>
                      <div className='input-box'>
                        <label>Contact Number</label>
                        <input type='tel' name='contactFather' />
                      </div>
                    </div>

                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Mother's Name</label>
                        <input type='text' name='motherName' />
                      </div>
                      <div className='input-box'>
                        <label>Occupation</label>
                        <input type='text' name='occupationMother' />
                      </div>
                      <div className='input-box'>
                        <label>Contact Number</label>
                        <input type='tel' name='contactMother' />
                      </div>
                    </div>

                    <div className='tenth-row'>
                      <div className='input-box'>
                        <label>Guardian Name</label>
                        <input type='text' name='guardianName' />
                      </div>
                      <div className='input-box'>
                        <label>Relationship</label>
                        <input type='text' name='guardianRelationship' />
                      </div>
                      <div className='input-box'>
                        <label>Guardian's Address</label>
                        <input type='text' name='guardianAddress' />
                      </div>
                      <div className='input-box'>
                        <label>Contact Number</label>
                        <input type='tel' name='contactGuardian' />
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
              <div className='popup'>
                <div className='popup-header'>
                  <h3>Edit Student</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className='popup-content'>
                  {/* Add form or content here */}
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
                  {/* Add form or content here */}
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
