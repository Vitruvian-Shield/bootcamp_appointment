import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './doctors.css';
import docimg from '../assets/images/person-circle.svg';

function Doctors() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); 
      const selectedCity = localStorage.getItem("selectedCity");
      const speciality = localStorage.getItem('speciality');
      const queryParams = new URLSearchParams({
        speciality: speciality,
        location: selectedCity,
      }).toString();
  
      const url = `http://127.0.0.1:8000/api/medicine/provider/?${queryParams}`;
  
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });
        setData(response.data.results);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('وارد اکانت خود شوید!')
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div id="doctors-container">
      <input type="text" value={" شهر انتخابی " + localStorage.getItem("selectedCity")} readOnly id='city' />
      <button onClick={()=>{localStorage.setItem('speciality',"");localStorage.setItem('selectedCity',""); window.location.href = "/doctors";}}>بدون فیلتر</button>
      <div id="doctors">
        {Array.isArray(data) ? (
          data.map((doctor) => (
            <div key={doctor.id} id="profile">
              <div id="picture">
                <img src={docimg} alt="Doctor" />
              </div>
              <div id="name">
                <p><b>{doctor.user.first_name} {doctor.user.last_name}</b></p>
                <p>{doctor.speciality}</p>
                <p>{doctor.location.state}, {doctor.location.city}</p>
                <button 
                  type='submit' 
                  onClick={() => {
                    localStorage.setItem("doctorId", `${doctor.id}`); 
                    localStorage.setItem("doctorName", `${doctor.user.first_name} ${doctor.user.last_name}`); 
                    window.location.href = "/appointment";
                  }}>
                  نوبت گیری
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
}

export default Doctors;
