import React, {useState} from 'react'
import './FacultyMembers_Content.css'
import { BiSearch } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { RiAddLargeFill, RiDeleteBin6Line } from "react-icons/ri";
import { RiInboxUnarchiveLine } from "react-icons/ri";

const FacultyMembers_ContentHeader = () => {
  const [popup, setPopup] = useState({
    add: false,
    edit: false,
    delete: false,
    archive: false,
  });

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
                  {/* Add form or content here */}
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
                    <h3>Delete Teacher</h3>
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
                    <h3>Archive Teacher</h3>
                    <button onClick={handleClose}>Close</button>
                  </div>
                  <div className='popup-content'>
                    {/* Add form or content here */}
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
