import React, { useState, useEffect } from "react";
import './Liabilities_Students.css'; 

const Liabilities_Students = ({ schoolYear, semester }) => {
  const [liabilities, setLiabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiabilities = async () => {
      try {
        const response = await fetch(`https://san-juan-institute-of-technology-backend.onrender.com/student-liabilities?modalSchoolYear=${schoolYear}&modalSemester=${semester}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 404) {
          throw new Error('There are no liabilities found for the specified school year and semester.');
        }

        if (!response.ok) {
          throw new Error('Please select school year and semester to view liabilities');
        }

        const data = await response.json();
        setLiabilities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLiabilities();
  }, [schoolYear, semester]); // Change dependencies to use props

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error message directly
  }

  return (
    <div className="container-liab">
      {liabilities.length > 0 ? (
        liabilities.map((liability, index) => (
          <div className="box" key={index}>
            <p className="text-lg">
              {liability.liability_description}
              {liability.amount}
            </p>
            <p className="text-sm mt-2">{liability.semester} / {liability.school_year}</p>
            <p className="text-sm mt-1">Created at : {new Date(liability.created_at).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>There are no liabilities found...</p> // Updated message here
      )}
    </div>
  );
};

export default Liabilities_Students;