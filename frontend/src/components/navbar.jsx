import React from 'react';
import './navbar.css';
import logo from '../assets/images/logo.svg';
import loginicon from '../assets/images/loginicon.svg';
import userloginicon from '../assets/images/userloginicon.svg';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-item">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-item-login">
          <a href="/doctor-login">ورود پزشکان <img src={loginicon} alt="Doctor Login" /></a>
        </div>
        <div className="navbar-item-login">
          <a href="/user-login">ورود کاربران <img src={userloginicon} alt="User Login" /></a>
        </div>
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
