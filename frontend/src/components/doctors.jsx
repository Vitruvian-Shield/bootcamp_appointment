import React, { useState, useEffect } from 'react';
import './doctors.css';
import docimg from '../assets/images/person-circle.svg';

function Doctors() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage
  
      try {
        const response = await fetch('http://127.0.0.1:8000/api/medicine/provider/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();

        setData(result.results);
        console.log(result) //only for debugging
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div id="doctors">
      {Array.isArray(data) ? (
        data.map((doctor) => (
          <div key={doctor.id} id="profile">
            <div id="picture">
              <img src={docimg}/>
            </div>
            <div id="name">
              <p><b>{doctor.user.first_name} {doctor.user.last_name}</b></p>
              <p>{doctor.speciality}</p>
              <p>{doctor.location.name}, {doctor.location.city}</p>
              <button type='submit' onClick={() => {localStorage.setItem("doctorId", `${doctor.id}`); localStorage.setItem("doctorName", `${doctor.user.first_name} ${doctor.user.last_name}`); window.location.href = "/appointment"}}>نوبت گیری</button>
            </div>
          </div>
        ))
      ) : (
        <p>No doctors found.</p> // Message to show if no data is found
      )}
    </div>
  );
}

export default Doctors;
