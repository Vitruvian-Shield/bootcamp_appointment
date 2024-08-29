import React from 'react';
import './doctors.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const doctorsData = [
  { id: 1, name: 'آقا دکتر', speciality: "متخصص گوش و حلق و بینی"},
  { id: 2, name: 'خانم دکتر',speciality: "متخصص گوش و حلق و بینی"},
  { id: 3, name: 'خانم دکتر', speciality: "متخصص گوش و حلق و بینی"},
  { id: 4, name: 'آقا دکتر', speciality: "متخصص گوش و حلق و بینی"},
  { id: 5, name: 'خانم دکتر', speciality: "متخصص گوش و حلق و بینی"},
  { id: 6, name: 'خانم دکتر', speciality: "متخصص گوش و حلق و بینی"},
  { id: 7, name: 'آقا دکتر', speciality: "متخصص گوش و حلق و بینی"},
  { id: 8, name: 'خانم دکتر', speciality: "متخصص گوش و حلق و بینی"},
  { id: 9, name: 'خانم دکتر', speciality: "متخصص گوش و حلق و بینی"},
  { id: 10, name: 'خانم دکتر', speciality: "متخصص گوش و حلق و بینی"},
];



function Doctors() {

    const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0ODY3MzEyLCJpYXQiOjE3MjQ4NjMyNzgsImp0aSI6ImZkODk5Mjc4NjkxOTRlYzRiNDgzNDg3MjI4YWUyMGZiIiwidXNlcl9pZCI6MX0.Q27U4pH4fR6zNqFtBlO__bTJ5Y21Jx6KumscrIkYLPU"; // Get the access token from localStorage

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/medicine/provider/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Access token might be expired, try refreshing it
          const newToken = await refreshToken();

          if (newToken) {
            // Retry the request with the new token
            const retryResponse = await axios.get('http://127.0.0.1:8000/api/medicine/provider/', {
              headers: {
                'Authorization': `Bearer ${newToken}`,
              },
            });
            setData(retryResponse.data);
          } else {
            console.error('Failed to refresh token');
          }
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, []);

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/refresh/', {
        token: refreshToken,
      });

      if (response.status === 200) {
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken); // Save the new access token
        return accessToken;
      } else {
        console.error('Token refresh failed');
        return null;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };

  console.log(data) // testing the api
  return (
    <div id="doctors">
      {doctorsData.map((doctor) => (
        <a href="" key={doctor.id}>
          <div id="profile">
            <div id="picture">

            </div>
            <div id="name">
              <p><b>{doctor.name}</b></p>
              <p>{doctor.speciality}</p>
              <button type="button" id='assign'>نوبت گرفتن</button>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export {doctorsData}
export default Doctors;
