import React, { useState } from "react";
import './login.css';
import contentImage from '../assets/images/imgcontentlogin.svg';
import googleIcon from '../assets/images/google.svg';
import { redirect } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const UserOrDoc = () => {
        if (window.location.pathname === "/user-login") {
            return "ورود کاربران";
        }
        if (window.location.pathname === "/doctor-login") {
            return "ورود پزشکان";
        }
    };

    const submitBtn = () => {
        const loginData = {
            username,
            password,
        };

        fetch('http://127.0.0.1:8000/api/accounts/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data); //remove this, only for debug
            if (data.access){
                localStorage.setItem("token", data.access);
                localStorage.setItem("refresh", data.refresh);
                window.location.href = "/successfullyLoggedIn";
            }
            else{
                alert("wrong username or password!");
            }
            
            // Handle successful login
        })
        .catch(error => {
            console.error('Error:', error); //remove this, only for debug
            // Handle login error
        });
    };

    return (
        <div id="background-container">
            <div id="content-container">
                <div id="picLogo">
                    <img src={contentImage} alt="Content Logo" />
                </div>
                <div id="login-main">
                    <p id="title"><b>{UserOrDoc()}</b></p>
                    <p id="mobile-text">برای ورود لطفا اطلاعات خود را وارد کنید.</p>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        dir="ltr" 
                        id="number-input" 
                        className="user" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        dir="ltr" 
                        id="number-input" 
                        className="pass" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <input 
                        type="button" 
                        value="ورود" 
                        id="submit-btn" 
                        onClick={submitBtn} 
                    />
                    <button id="google-btn">
                        ورود با گوگل
                        <img src={googleIcon} alt="Google Icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
