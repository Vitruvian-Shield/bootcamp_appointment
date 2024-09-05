import React, { useState } from "react";
import './login.css';
import contentImage from '../assets/images/imgcontentlogin.svg';
import googleIcon from '../assets/images/google.svg';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [loginMethod, setLoginMethod] = useState('username'); // 'username' or 'phone'

    const UserOrDoc = () => {
        if (window.location.pathname === "/user-login") {
            return "ورود کاربران";
        }
        if (window.location.pathname === "/doctor-login") {
            return "ورود پزشکان";
        }
    };

    const sendCode = () => {
        fetch('http://127.0.0.1:8000/api/accounts/send-code/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone_number: phoneNumber }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("پیامک ارسال شد!");
            } else {
                alert("شماره یافت نشد!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const submitBtn = () => {
        const loginData = loginMethod === 'username' ? { username, password } : { phone_number: phoneNumber, code: verificationCode };

        fetch(loginMethod === "username" ? 'http://127.0.0.1:8000/api/accounts/login/' :"http://127.0.0.1:8000/api/accounts/loginWithPhone/" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.access) {
                localStorage.setItem("token", data.access);
                localStorage.setItem("refresh", data.refresh);
                window.location.href = "/successfullyLoggedIn";
            } else {
                alert("رمز یا پسوورد غلط است... دوباره تلاش کنید!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
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
                    <div>
                        <button onClick={() => setLoginMethod('username')}>ورود با یوزرنیم</button>
                        <button onClick={() => setLoginMethod('phone')}>ورود با شماره</button>
                    </div>
                    {loginMethod === 'username' ? (
                        <>
                            <input
                                type="text"
                                placeholder="یوزرنیم"
                                dir="rtl"
                                id="number-input"
                                className="user"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="پسوورد"
                                dir="rtl"
                                id="number-input"
                                className="pass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="شماره موبایل"
                                dir="rtl"
                                id="number-input"
                                className="user"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <button onClick={sendCode}>Send Code</button>
                            <input
                                type="text"
                                placeholder="کد ارسالی"
                                dir="rtl"
                                id="number-input"
                                className="pass"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                        </>
                    )}
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
                    <a href="/newUser" id="create-user">
                        اگر اکانت نداری اینجا کلیک کن...
                    </a>
                </div>
            </div>
        </div>
    );
}
alert
export default Login;
