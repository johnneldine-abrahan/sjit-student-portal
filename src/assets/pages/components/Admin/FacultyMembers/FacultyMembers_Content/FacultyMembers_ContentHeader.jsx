import React, {useState, useEffect} from 'react'
import './FacultyMembers_Content.css'
import { BiSearch } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";
import { RiInboxUnarchiveLine } from "react-icons/ri";

const FacultyMembers_ContentHeader = ({refreshFacultyList}) => {
  const [popup, setPopup] = useState({
    add: false,
    edit: false,
    delete: false,
    archive: false,
  });

  const [formData, setFormData] = useState({
    last_name: '',
    first_name: '',
    middle_name: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adjustedData = { ...formData };

    try {
      const response = await fetch('http://localhost:3000/registerFaculty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adjustedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Failed to register faculty: ${errorText || 'Unknown error'}`);
        return;
      }

      alert('Faculty successfully registered!');

      setFormData({
        last_name: '',
        first_name: '',
        middle_name: '',
      });

      setPopup({ add: false });

      // Refresh the faculty list after successful submission
      await refreshFacultyList();  // Call the passed function to refresh the faculty list
    } catch (error) {
      alert('Network error: Failed to reach the server.');
    }
  };

  // Disable scrolling when modal is open
  useEffect(() => {
    if (popup.add) {
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
    <div className='facultymembers-header'>
      <h1 className='header-title'>Faculty Members</h1>
      <div className='facultymembers-activity'>
        <div className='search-box'>
          <input type="text" placeholder='Search...' />
          <BiSearch className='search-icon' />
        </div>
        <div className='buttons-header'>
          <div className='buttons-act'>
            <RiAddLargeFill className='buttons-icon' onClick={() => handlePopup('add')} />
          </div>
          <div className='buttons-act'>
            <BiEditAlt className='buttons-icon' onClick={() => handlePopup('edit')}/>
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
              <div className='popup-blurred-background' onClick={handleClose} />
              <div className='popup'>
                <div className='popup-header'>
                  <h3>Add Teacher</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className='popup-content'>
                  <form onSubmit={handleSubmit}>
                    <div className='first-row'>
                      <div className='input-box'>
                        <label>Last Name<input type="text" name="last_name" value={formData.last_name} onChange={handleChange}/></label>
                      </div>
                      <div className='input-box'>
                        <label>First Name<input type="text" name="first_name" value={formData.first_name} onChange={handleChange}/></label>
                      </div>
                      <div className='input-box'>
                        <label>Middle Name<input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange}/></label>
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
                  <h3>Edit Teacher</h3>
                  <button onClick={handleClose}>Close</button>
                </div>
                <div className='popup-content'>
                <form onSubmit={handleSubmit}>
                    <div className='first-row'>
                      <div className='input-box'>
                        <label>Last Name<input type="text" name="lastName" /></label>
                      </div>
                      <div className='input-box'>
                        <label>First Name<input type="text" name="firstName" /></label>
                      </div>
                      <div className='input-box'>
                        <label>Middle Name<input type="text" name="middleName" /></label>
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
                    <h3>Delete Teacher</h3>
                    <button onClick={handleClose}>Close</button>
                  </div>
                  <div className='popup-content'>
                    <p>Are you sure you want to delete the selected teacher? This action is cannot be undone.</p>
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
                    <h3>Archive Teacher</h3>
                    <button onClick={handleClose}>Close</button>
                  </div>
                  <div className='popup-content'>
                  <p>Do you want to archive the selected teacher?</p>
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

export default FacultyMembers_ContentHeader
