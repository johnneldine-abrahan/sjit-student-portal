import React, { useState } from 'react';
import './Grades_Students.css';

const Grades_Students = () => {
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
    <table>
    <div>
      <div className="list-item">
        <div>BAT 401 - Fundamentals of Business Analytics (3 units)</div>
        <div>MARASIGAN, KIMBERLY I.</div>
        <div>
          <span>1.50</span>
        </div>
      </div>
        <div>
        <div className="list-item">
        <div>BAT 402 - Fundamentals of Analytics Modeling (3 units)</div>
        <div>RAMOS, DEAN CHARLIEMAGNE F.</div>
        <div>
          <span>1.50</span>
        </div>
      </div>
    </div>
    </div>
    </table>
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
          <th>Grade</th>
          <th>Status</th>
          <th>Instructor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>BAT 401</td>
          <td>Fundamentals of Business Analytics</td>
          <td>3</td>
          <td>1.50</td>
          <td><span style={{ color: 'green' }}>&#10004;</span></td>
          <td>MARASIGAN, KIMBERLY I.</td>
        </tr>
        <tr>
          <td>BAT 401</td>
          <td>Fundamentals of Analytics Modeling</td>
          <td>3</td>
          <td>1.00</td>
          <td><span style={{ color: 'green' }}>&#10004;</span></td>
          <td>RAMOS, DEAN CHARLIEMAGNE F.</td>
        </tr>
        {/ Add more table rows here /}
      </tbody>
    </table>
  );
};

export default Grades_Students;