import React, { useEffect, useState } from 'react';
import './appointment.css';
import docimg from "../assets/images/person-circle.svg";

function Appointment() {
    const [data, setData] = useState(null);
    const [service, setService] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState(''); // New state to track selected service
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch appointment details
        fetch('http://127.0.0.1:8000/api/appointment/create/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setData(data);
            console.log(data); // only for debugging
            document.getElementById('accountInfo').innerHTML = `وارد شده به عنوان ${data.username}`;
            document.getElementById('username').value = `${data.username}`;
            document.getElementById('phone_number').value = `${data.phone_number}`;
            document.getElementById('email').value = `${data.email}`;
        })
        .catch(error => {
            document.getElementById('accountInfo').innerHTML = `لطفا اول وارد اکانت شوید`;
            console.error('Error:', error);
        });

    }, [token]);

    useEffect(() => {
        // Fetch services data
        fetch('http://127.0.0.1:8000/api/medicine/services/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(service => {
            setService(service);
            console.log("service:", service); // only for debugging
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    }, [token]);

    const docInfo = localStorage.getItem("doctorName");

    function sendAppointment(){
        const year = document.getElementById("year").value;
        const month = document.getElementById("month").value;
        const day = document.getElementById("day").value;

        // Format the date
        const appointmentDate = new Date(year, month - 1, day).toISOString().split('T')[0];

        const appointmentData = {
            "user": data.pk,
            "provider": localStorage.getItem("doctorId"),
            "service": selectedServiceId, // Use the selected service ID
            "date": appointmentDate,
            "patient_first_name": data.first_name,
            "patient_last_name": data.last_name,
            "patient_phone_number": document.getElementById("phone_number").value,
            "patient_national_id": document.getElementById("nationalId").value,
            "patient_gender": document.getElementById("gender").value
        }

        fetch('http://127.0.0.1:8000/api/appointment/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(appointmentData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data); // remove this, only for debugging
        })
        .catch(error => {
            console.error('Error:', error); // remove this, only for debugging
        });
    }

    const handleServiceClick = (id) => {
        setSelectedServiceId(id); // Update the selected service ID state
    }

    return (
        <div id='root' dir='rtl'>
            <div id='caution'>
                <img src={docimg} id='docimg' alt="Doctor" />
                <div id='docDetail'>
                    <h2>دکتر انتخاب شده: <b>{docInfo}</b></h2>
                </div>
                <h4>اگر پزشک مورد نظر شما نیست از بخش پزشکان پزشک دیگری انتخاب کنید</h4>
            </div>
            <div id='content'>
                <div id='comments'>
                    <h1>کامنت ها</h1>
                </div>
                
                <div id='form-container'>
                    <h1 id='accountInfo' dir='rtl'></h1>
                    <label htmlFor="username">نام بیمار</label>
                    <input type="text" id='username' readOnly />
                    <label htmlFor="phone_number">شماره موبایل بیمار</label>
                    <input type="text" id='phone_number' readOnly />
                    <label htmlFor="nationalId">کد ملی</label>
                    <input type="text" id="nationalId" />
                    <label htmlFor="email">ایمیل بیمار</label>
                    <input type="email" id="email" readOnly />
                    <div id='labelInputInARow'>
                        <label htmlFor="serviceId"> سرویس:</label>
                        <input type="number" id="serviceId" name="service" value={selectedServiceId} readOnly /> {/* Bind to selected service ID */}
                    </div>
                    <div id='labelInputInARow'>
                        <label htmlFor="year">سال:</label>
                        <input type="number" placeholder='year' id="year" name="year" min="2024" max="2025" />
                        <label htmlFor="month">ماه:</label>
                        <input type="number" placeholder='month' id="month" name="month" min="1" max="12" />
                        <label htmlFor="day">روز:</label>
                        <input type="number" placeholder='day' id="day" name="day" min="1" max="31" />
                    </div>
                    <label htmlFor="gender">جنسیت:</label>
                    <select id="gender">
                        <option value="male">مرد</option>
                        <option value="female">زن</option>
                        <option value="preferNot">ترجیح می‌دهم نگویم</option>
                    </select>
                    <button type='submit' onClick={sendAppointment}>تایید</button>
                </div>
                <div id='list-container'>
                    <h3>لیست سرویس ها</h3>
                    <ul>
                        {service.map((item, index) => (
                            <li key={index} onClick={() => handleServiceClick(item.id)} style={{cursor: 'pointer'}}>
                                {item.id} - {item.name}: {item.price} تومان
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
