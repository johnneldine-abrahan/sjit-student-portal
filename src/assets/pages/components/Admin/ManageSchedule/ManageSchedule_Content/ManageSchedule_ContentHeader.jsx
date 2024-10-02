import React, { useState } from 'react';
import { BiSearch } from "react-icons/bi";
import { FiEdit, FiTrash } from "react-icons/fi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import "./ManageSchedule_Content.css";

const ManageSchedule_ContentHeader = () => {
  const [popup, setPopup] = useState({
    show: false,
    message: null,
  });

  const [popupEdit, setPopupEdit] = useState({
    show: false,
    message: null,
  });

  const [popupDelete, setPopupDelete] = useState({
    show: false,
    message: null,
  });

  const [checked, setChecked] = useState({
    jhs: false,
    shs: false,
  });

  const [formData, setFormData] = useState({
    gradeLevel: '',
    strand: '',
    subjectName: '',
    instructor: '',
  });

  const [schedule, setSchedule] = useState({
    day: '',
    startTime: '',
    endTime: '',
  });

  const handlePopup = (message) => {
    setPopup({
      show: true,
      message: message,
    });
  };

  const handlePopupEdit = (message) => {
    setPopupEdit({
      show: true,
      message: message,
    });
  };

  const handlePopupDelete = (message) => {
    setPopupDelete({
      show: true,
      message: message,
    });
  };

  const handleClose = () => {
    setPopup({
      show: false,
      message: null,
    });
  };

  const handleEditClose = () => {
    setPopupEdit({
      show: false,
      message: null,
    });
  };

  const handleDeleteClose = () => {
    setPopupDelete({
      show: false,
      message: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    handleClose();  // Close the popup after submitting
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setChecked((prevChecked) => ({
      ...prevChecked,
      [name]: checked,
      [name === 'jhs' ? 'shs' : 'jhs']: false,
    }));
  };

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleScheduleChange = (event) => {
    const { name, value } = event.target;
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className='manage-schedule-header'>
      <h1 className='header-title'>Manage Schedule</h1>
        <div className='admin-manage-schedule'>
          <div className='search-box'>
            <input type="text" placeholder='Search...' />
            <BiSearch className='search-icon' />
          </div>
          <div className='buttons-header'>
            <div className='buttons-act'>
              <RiAddLargeFill className='buttons-icon' onClick={() => handlePopup('Add Subject and Section')} />
            </div>
            <div className='buttons-act'>
            <RiDeleteBin6Line className='buttons-icon' onClick={() => handlePopupDelete('Delete Subject and Section')}/>
          </div>
          </div>
        </div>

      {popup.show && (
        <>
          <div className='popup-blurred-background' onClick={handleClose} />
          <div className='popup-manage-schedule'>
            <div className='popup-header'>
              <h3>{popup.message}</h3>
              <button onClick={handleClose}>Close</button>
            </div>
            <div className='popup-content'>
              <form onSubmit={handleSubmit}>
                <div className='first-row'>
                  <div className='input-box'>
                    <label>School Year<input type="text" name='schoolyear' /></label>
                  </div>
                </div>
                <div className='first-row'>
                  <div className='grade-level'>
                    <label>Select Program</label>
                    <label><input type="checkbox" name="program" value="jhs" onChange={handleChange} />Junior Highschool</label>
                    <label><input type="checkbox" name="program" value="shs" onChange={handleChange} />Senior Highschool</label>
                  </div>
                </div>

                <div className='second-row'>
                    <div className='grade-level'>
                      <div className='second-row'>
                        <label>Select Semester</label>
                        <label><input type="checkbox" name="semester" value="first" onChange={handleChange} />FIRST</label>
                        <label><input type="checkbox" name="semester" value="second" onChange={handleChange} />SECOND</label>
                        <label><input type="checkbox" name="semester" value="summer" onChange={handleChange} />SUMMER</label>
                      </div>
                    </div>
                </div>

                <div className='first-row'>
                  <div className='input-box'>
                    <label>Grade Level</label>
                    <select>
                      <option value=''></option>
                    </select>
                  </div>
                  <div className='input-box'>
                    <label>Strand<select>
                      <option value=''></option>
                      <option value="stem">Science, Technology, Engineering and Mathematics (STEM)</option>
                      <option value="abm">Accountancy, Business and Management (ABM)</option>
                      <option value="humss">Humanities and Social Sciences (HUMSS)</option>
                      <option value="tvl-ia">TVL - Industrial Arts (TVL-IA)</option>
                      <option value="tvl-he">TVL - Home Economics (TVL-HE)</option>
                      <option value="tvl-ict">TVL - Internet Communications Technology (TVL-ICT)</option>
                    </select></label>
                  </div>
                  <div class='input-box'>
                    <label>Section<input type='text' name='section' /></label>
                  </div>
                </div>

                <div className='second-row'>
                  <div className='input-box'>
                    <label>Subject
                    <select>
                      <option value=''></option>
                    </select>
                    </label>
                  </div>
                  <div className='input-box'>
                    <label>Instructor
                    <select>
                      <option value=''></option>
                    </select>
                    </label>
                  </div>
                </div>

                <div style={{ marginTop: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Day</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Start Time</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>End Time</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                          <select name="day" value={schedule.day} onChange={handleScheduleChange}>
                            <option value=""></option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </select>
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                          <input type="time" name="startTime" value={schedule.startTime} onChange={handleScheduleChange} />
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                          <input type="time" name="endTime" value={schedule.endTime} onChange={handleScheduleChange} />
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                          <div className='actions'>
                            <button type='button' className='delete-btn'><FiTrash className='actions-ico' /></button>
                            <button type='button' className='add-btn'><RiAddLargeFill className='actions-ico'/></button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className='thrid-row'>
                  <div className='input-box'>
                    <label>Room Assignment <input type='text' name="room" /></label>
                  </div>
                  <div className='input-box'>
                    <label>Slot<input type='text' name='slot' /></label>
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

      {popupDelete.show && (
        <>
          <div className='popup-blurred-background' onClick={handleDeleteClose} />
          <div className='popup-manage-schedule'>
            <div className='popup-header'>
              <h3>{popupDelete.message}</h3>
              <button onClick={handleDeleteClose}>Close</button>
            </div>
            <div className='popup-content'>
              <p>Are you sure you want to delete the selected schedule? This action is cannot be undone.</p>
              <div class='buttons'>
                <button type="submit" class="btn-box" name="add" id="add">Done</button>
                </div>
            </div>
          </div>
        </>
      )}


    </div>
  );
}

export default ManageSchedule_ContentHeader;
