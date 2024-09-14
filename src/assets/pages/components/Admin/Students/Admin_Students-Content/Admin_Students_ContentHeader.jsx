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
