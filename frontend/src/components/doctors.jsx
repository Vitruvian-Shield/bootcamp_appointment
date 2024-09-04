import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './doctors.css';
import docimg from '../assets/images/person-circle.svg';

function Doctors() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); 
      const selectedCity = localStorage.getItem('selectedCity');
      const speciality = localStorage.getItem('speciality');
      const queryParams = new URLSearchParams({
        speciality: speciality,
        location: selectedCity,
        page: currentPage, 
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
        console.log(response);
        setTotalPages(Math.ceil(response.data.count / response.data.page_size));

        // Check if there is a next page
        setHasNextPage(response.data.next !== null);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('وارد اکانت خود شوید!')
      }
    };
  
    fetchData();
  }, [currentPage]);

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
      <div id="pagination">
        <button 
          onClick={() => setCurrentPage(prev => prev + 1)} 
          disabled={!hasNextPage}
        >
          Next
        </button>
        <span id="page">Page {currentPage}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </div>
    </div>
  );  
}

export default Doctors;
