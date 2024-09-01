import React, { useEffect, useState } from 'react';
import './appointment.css';
import docimg from "../assets/images/person-circle.svg";

function Appointment() {
    const [data, setData] = useState({});
    const [service, setService] = useState([]);
    const [comments, setComments] = useState([]);  // State for comments
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const token = localStorage.getItem('token');
    const docInfo = localStorage.getItem("doctorName");
    const doctorId = localStorage.getItem("doctorId");

    useEffect(() => {
        // Fetch user details
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
        // Fetch services
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
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }, [token]);

    useEffect(() => {
        // Fetch comments related to the selected provider
        if (doctorId) {
            fetch(`http://127.0.0.1:8000/api/medicine/provider/${doctorId}/comments/`, {
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
            .then(comments => {
                setComments(comments);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, [token, doctorId]);  

    const sendAppointment = () => {
        if(document.getElementById("nationalId").value && document.getElementById("day").value && document.getElementById("month").value && document.getElementById("year").value){ 
            const year = document.getElementById("year").value;
            const month = document.getElementById("month").value;
            const day = document.getElementById("day").value;

            const appointmentDate = new Date(year, month - 1, day).toISOString().split('T')[0];

            const appointmentData = {
                "user": data.pk,
                "provider": doctorId,
                "service": selectedServiceId,
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
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(appointmentData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            document.getElementById("day").value = ""
            document.getElementById("month").value = ""
            document.getElementById("year").value = ""
            document.getElementById("nationalId").value = ""
            document.getElementById("serviceId").value = ""
            alert('با موفقیت رزرو شد...')
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    else{
        alert("لطفا تمام اطلاعاتو وارد کنید!")
    }
}

    const handleServiceClick = (id) => {
        setSelectedServiceId(id); 
    }

    function sendComment(){
        const commentData = {
            "user": data.id,
            "email": data.email,
            "name": `${data.first_name} ${data.last_name}`,
            "body": document.getElementById('commentBody').value,
            "rating": document.getElementById('rating').value
        }
        document.getElementById('commentBody').value = ""
        fetch(`http://127.0.0.1:8000/api/medicine/provider/${doctorId}/comments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(commentData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data); 
        })
        .catch(error => {
            console.error('Error:', error);
        });}
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
        <div id='commentAdd'>
            <p><b>نام: {`${data.first_name} ${data.last_name}`}</b></p>
            <p>ایمیل: {data.email}</p>
            <textarea id="commentBody" placeholder='کامنتتو اینجا بزار'></textarea>
            <div>
                <button onClick={sendComment}>ارسال</button>
                <label htmlFor="quantity" id='ratingLabel'>از 1 تا 5 به دکتر نمره دهید:</label>
                <input type="number" id="rating" min="1" max="5"></input>
            </div>
        </div>
        <ul id='allComments'>
            {comments.map((comment, index) => (
                <li key={index}>
                    <p><b>{comment.name}:</b> {comment.body}</p>
                    <p id='rating'>
                        {Array.from({ length: comment.rating }, (_, i) => (
                            <span key={i}>⭐</span>
                        ))}
                    </p>
                </li>
            ))}
        </ul>
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
                        <input type="number" id="serviceId" name="service" value={selectedServiceId} readOnly />
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
