import React from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './components/main/Main'
import SearchPage from './components/searchpage/SearchPage'
import Specialities from './components/specialities/Specialities'
import Profile from './components/Profile/Profile'
import Footer from './components/Footer/Footer'
import Header from "./components/header/Header";
import Login from "./components/Login/Login";
import DoctorsRegistration from './components/doctorsRegistration/doctorsRegistration';
import UsersRegistration from './components/usersRegistration/userRegistration';
import Reservation from './components/reservation/reservation';
import ContactUs from './components/contactUs/contactUs';
import DoctorProfile from './components/doctorsprofile/DoctorsProfile'
import AuthProvider from './AuthProvider'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>  
        <Header />
        <Routes>
        
          <Route path="/" Component={Main} />
          <Route path="/search" Component={SearchPage} />
          <Route path="/specialities" Component={Specialities} />
          <Route path="/profile/:id" Component={Profile} />
          <Route
            path="/userslogin"
            element={<Login LoginBy="کاربران" url="/usersRegister" />}
          />
          <Route
            path="/doctorslogin"
            element={<Login LoginBy="پزشکان" url="/doctorsRegister" />}
          />
          <Route path="/doctorsRegister" Component={DoctorsRegistration} />
          <Route path="/usersRegister" Component={UsersRegistration} />
          <Route path="/reservation" Component={Reservation} />
          <Route path="/contact-us" Component={ContactUs} />
          <Route path='/doctorprofile/:id' Component={DoctorProfile} />
          
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
    
  )
}

export default App
