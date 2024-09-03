import React, { useState, useEffect } from 'react';
import './navbar.css';
import logo from '../assets/images/logo.svg';
import loginicon from '../assets/images/loginicon.svg';
import userloginicon from '../assets/images/userloginicon.svg';
import logoutimg from '../assets/images/logout.svg'
import profileimg from '../assets/images/person-circle.svg'
function Navbar() {
  const [checkLogin, setCheckLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
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
        setCheckLogin(true);
      })
      .catch(error => {
        console.error('Error:', error);
        setCheckLogin(false);
      });

  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-item">
          <img src={logo} alt="Logo" />
        </div>
        {!checkLogin && (
          <div>
            <div className="navbar-item-login">
              <a href="/doctor-login">
                ورود پزشکان <img src={loginicon} alt="Doctor Login" />
              </a>
            </div>
            <div className="navbar-item-login">
              <a href="/user-login">
                ورود کاربران <img src={userloginicon} alt="User Login" />
              </a>
            </div>
          </div>
        )||(
          <div className='navbar-item-login'>
            <a onClick={()=>{localStorage.removeItem('token'); window.location.reload()}}>خروج از اکانت<img src={logoutimg} alt="User Login" /></a>
            <a href="/profile">پنل کاربری<img src={profileimg} alt="User Logout" /></a>
          </div>
        )}
      </div>

      <ul className="navbar-right navbar-menu">
        <li className="navbar-item"><a href="/Specialties">تخصص ها</a></li>
        <li className="navbar-item"><a href="/doctors">پزشکان</a></li>
        <li className="navbar-item"><a href="/appointment">نوبت‌گیری</a></li>
        <li className="navbar-item"><a href="/search">جستجو</a></li>
        <li className="navbar-item"><a href="/">خانه</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
