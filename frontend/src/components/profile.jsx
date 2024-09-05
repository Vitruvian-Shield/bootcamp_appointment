import React, { useState, useEffect } from "react";
import './profile.css';
import profileimg from '../assets/images/person-circleBlack.svg';

function Profile() {
    const [user, setUser] = useState({});
    const [appointmentData, setAppointmentData] = useState([]);

    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/accounts/profile/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://127.0.0.1:8000/api/accounts/user/${user.id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Profile updated successfully:', data);
            setUser(data);
            window.location.href = "/profile"
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/appointment/list/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log("Appointments:", data);
            setAppointmentData(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    return (
        <div id="profile-container">
            <div id="profile-content">
                <form id="profile-box" onSubmit={handleSubmit}>
                    <img src={profileimg} alt="Profile" />
                    <h1>
                        <label htmlFor="username">نام کاربری:</label>
                        <input type="text" id="username" value={user.username || ''} readOnly />
                    </h1>
                    <div className="input-row">
                        <label htmlFor="first_name">نام:</label>
                        <input type="text" id="first_name" value={user.first_name || ''} onChange={handleChange} />
                    </div>
                    <div className="input-row">
                        <label htmlFor="last_name">نام خانوادگی:</label>
                        <input type="text" id="last_name" value={user.last_name || ''} onChange={handleChange} />
                    </div>
                    <div className="input-row">
                        <label htmlFor="email">ایمیل:</label>
                        <input type="email" id="email" value={user.email || ''} onChange={handleChange} />
                    </div>
                    <div className="input-row">
                        <label htmlFor="phone_number">شماره تلفن:</label>
                        <input type="tel" id="phone_number" value={user.phone_number || ''} onChange={handleChange} />
                    </div>
                    <div className="input-row">
                        <label htmlFor="updated_at">آخرین بروزرسانی:</label>
                        <input type="text" id="updated_at" value={user.updated_at || ''} readOnly />
                    </div>
                    <div className="input-row">
                        <label htmlFor="created_at">تاریخ ساخت اکانت:</label>
                        <input type="text" id="created_at" value={user.created_at || ''} readOnly />
                    </div>
                    <button type="submit">ذخیره اطلاعات</button>
                </form>

                <div id="additional-box">
                    <h2>رزرو شده ها</h2>
                    <ul>
                        {appointmentData.map((appointment, index) => (
                            <li key={index}>
                                <p><strong>تاریخ:</strong> {appointment.date}</p>
                                <p><strong>کد ملی:</strong> {appointment.patient_national_id}</p>
                                <p><strong>سرویس:</strong> {appointment.service}</p>
                                <p><strong>وضعیت:</strong> {appointment.status===0?"طبق زمان بندی":appointment.status===1?"کنسل شده":"انجام شده"}</p>
                                <p>-----------------------------------------------</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Profile;
