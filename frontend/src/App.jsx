import React from 'react';
import { Outlet } from 'react-router-dom';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Content from './components/content';
import Footer from './components/footer';
import Doctors from './components/doctors.jsx';
import Speciality from './components/specials.jsx';
import Login from './components/login.jsx';
import SuccessLogin from './components/successfullyLoggedIn.jsx';
import Appointments from './components/appointment.jsx';
import Profile from './components/profile.jsx';
import NewUser from './components/newUser.jsx';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Content />} />
          </Route>
          <Route path="/search" element={<Dashboard />}>
            <Route index element={<Content />} />
          </Route>
          <Route path="/doctors" element={<Dashboard />}>
            <Route index element={<Doctors />} />
          </Route>
          <Route path="/specialties" element={<Dashboard />}>
            <Route index element={<Speciality />} />
          </Route>
          <Route path="/user-login" element={<Dashboard />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/doctor-login" element={<Dashboard />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/successfullyLoggedIn">
            <Route index element={<SuccessLogin />} />
          </Route>
          <Route path="/appointment" element={<Dashboard />}>
            <Route index element={<Appointments />} />
          </Route>
          <Route path="/profile" element={<Dashboard />}>
            <Route index element={<Profile />} />
          </Route>
          <Route path="/newUser" element={<Dashboard />}>
            <Route index element={<NewUser />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
