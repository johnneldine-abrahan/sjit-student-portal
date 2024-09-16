import React, { useState } from 'react';
import './Subjects_and_Schedule.css';

const Subjects_and_Schedule = () => {
  const [view, setView] = useState('list');
  const [activeButton, setActiveButton] = useState(null);

  const handleListView = () => {
    setView('list');
    setActiveButton('list');
  };

  const handleTableView = () => {
    setView('table');
    setActiveButton('table');
  };

  return (
    <div>
      <button
        onClick={handleListView}
        className={activeButton === 'list' ? 'active' : ''}
      >
        List View
      </button>
      <button
        onClick={handleTableView}
        className={activeButton === 'table' ? 'active' : ''}
      >
        Table View
      </button>
      {view === 'list' ? (
        <ListView />
      ) : (
        <TableView />
      )}
    </div>
  );
};

const ListView = () => {
  return (
    <div>
      <div className="list-item">
        <div>IT 412 - Platform Technologies (3 units)</div>
        <div>IT-BA-4104 / ALANGILAN</div>
        <div>LUTERO, LIGAYA F.</div>
        <div>
          <span>Monday</span>
          <span>08:30 AM-10:00 AM / 401</span>
        </div>
        <div>
          <span>Wednesday</span>
          <span>02:30 PM-04:00 PM / 106</span>
        </div>
      </div>
      <div className="list-item">
        {/* Add more list items here */}
      </div>
    </div>
  );
};

const TableView = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Description</th>
          <th>Units</th>
          <th>Section</th>
          <th>Instructor</th>
          <th>Schedules</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>IT 412</td>
          <td>Platform Technologies</td>
          <td>3</td>
          <td>IT-BA-4104 / ALANGILAN</td>
          <td>LUTERO, LIGAYA F.</td>
          <td>
            MON - 08:30 AM-10:00 AM / 401
            <br />
            WED - 02:30 PM-04:00 PM / 106
          </td>
        </tr>
        <tr>
          <td>IT 414</td>
          <td>Systems Quality Assurance</td>
          <td>3</td>
          <td>IT-BA-4104 / ALANGILAN</td>
          <td>LUTERO, LIGAYA F.</td>
          <td>
            MON - 01:00 PM-03:00 PM / 401
            <br />
            TUE - 10:00 AM-01:00 PM / ITL
          </td>
        </tr>
        {/* Add more table rows here */}
      </tbody>
    </table>
  );
};

export default Subjects_and_Schedule;