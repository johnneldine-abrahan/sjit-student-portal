import React, { useState } from 'react';
import { FiFilter, FiEdit, FiTrash } from "react-icons/fi";
import { RiAddLargeFill } from "react-icons/ri";
import "./ManageSchedule_Content.css";

const ManageSchedule_ContentHeader = () => {
  const [popup, setPopup] = useState({
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

  const [roomAssignment, setRoomAssignment] = useState('');
  const [slot, setSlot] = useState('');

  const handlePopup = (message) => {
    setPopup({
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
      <div className="filteradd">
        <div className="filterschedule-section">
          <div className="filterschedule-header">
            <FiFilter className="filter-ico" />
            <h3 className="filterschedule-title">Filter</h3>
          </div>
        </div>
        <div className='admin-manage-schedule'>
          <button type='submit' className='add-subjectnsection-btn' onClick={() => handlePopup('Add Subject and Section')}>Add Subject and Section</button>
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
                    <label>Strand</label>
                    <select>
                      <option value=''></option>
                      <option value="stem">Science, Technology, Engineering and Mathematics (STEM)</option>
                      <option value="abm">Accountancy, Business and Management (ABM)</option>
                      <option value="humss">Humanities and Social Sciences (HUMSS)</option>
                      <option value="tvl-ia">TVL - Industrial Arts (TVL-IA)</option>
                      <option value="tvl-he">TVL - Home Economics (TVL-HE)</option>
                      <option value="tvl-ict">TVL - Internet Communications Technology (TVL-ICT)</option>
                    </select>
                  </div>
                </div>

                <div className='second-row'>
                  <div className='input-box'>
                    <label>Subject</label>
                    <select>
                      <option value=''></option>
                    </select>
                  </div>
                  <div className='input-box'>
                    <label>Instructor</label>
                    <select>
                      <option value=''></option>
                    </select>
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
                            <button type='button' className='edit-btn'><FiEdit className='actions-ico' /></button>
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
    </div>
  );
}

export default ManageSchedule_ContentHeader;
