import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Importing an icon from react-icons
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

const SuccessLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/search');
    }, 2000);
  }, [navigate]);
  

  return (
    <div style={styles.container}>
      <FaCheckCircle style={styles.icon} />
      <h2 style={styles.message}>ورود موفقیت آمیز!</h2>
      
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  },
  icon: {
    color: 'green',
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  message: {
    color: '#333',
    fontSize: '1.5rem',
    fontFamily: 'Arial, sans-serif',
  },
};

export default SuccessLogin;
