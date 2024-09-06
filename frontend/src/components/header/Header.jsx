import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.svg';
import loginicon from '../../assets/images/loginicon.svg';
import userloginicon from '../../assets/images/userloginicon.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [loginbtn, setLoginbtn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication tokens on component mount
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");

    if (refresh == null | access == null) {
      setLoginbtn(true); // User is not authenticated
    } else {
      setLoginbtn(false); // User is authenticated
    }
  }); // Empty dependency array ensures this runs only once on mount

  const handleProfile = () => {
    
    navigate('/userProfile'); // Redirect to login page
  };

  let navItems ={}
  if (localStorage.getItem("access") != null) {
    navItems = [
    { name: 'جستجو', link: '/' },
    { name: 'نوبت ها', link: '/appointment/mine' },
    { name: 'پزشکان', link: '/doctors' },
    { name: 'تخصص ها', link: '/ourSpecialty' },
    { name: 'تماس با ما', link: '#' },
  ];
  } else {
    navItems = [
    { name: 'جستجو', link: '/' },
    { name: 'پزشکان', link: '/doctors' },
    { name: 'تخصص ها', link: '/ourSpecialty' },
    { name: 'تماس با ما', link: '#' },
  ];
    
  }
  
 

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        px: { xs: '20px', sm: '48px' },
        pt: '22px',
        pb: '14px',
        background: 'linear-gradient(180deg, rgba(12, 45, 84, 0.80) 0%, rgba(12, 45, 84, 0.80) 100%)',
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '32px', boxSizing: 'border-box' }}>
        <Box>
          <img src={logo} alt="Logo" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            boxSizing: 'border-box',
            flexWrap: 'wrap',
          }}
        >
          {navItems.map((item, index) => (
            <Box
              key={index}
              onClick={() => navigate(item.link)}
              sx={{
                borderBottom: `${window.location.pathname === item.link ? `3px solid #ffffff` : 'none'}`,
                py: '9px',
                boxSizing: 'border-box',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'ykan',
                  fontSize: { xs: '14px', md: '16px', lg: '18px' },
                  fontWeight: 700,
                  lineHeight: '22px',
                  color: '#ffffff',
                }}
              >
                {item.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {loginbtn ? (
          <>
            <Button
              onClick={() => navigate('/doctorsLogin')}
              sx={{
                height: '44px',
                width: '143px',
                textTransform: 'none',
                color: '#ffffff',
                fontFamily: 'ykan',
                display: `${window.location.pathname === '/doctorsLogin' ? 'none' : 'flex'}`,
                alignItems: 'center',
                gap: '8px',
                border: `2px solid #ffffff`,
                borderRadius: '8px',
                ":hover": { opacity: '0.7' },
              }}
            >
              <img src={loginicon} alt="Doctor Login" />
              ورود پزشکان
            </Button>
            <Button
              onClick={() => navigate('/userLogin')}
              sx={{
                height: '44px',
                width: '143px',
                textTransform: 'none',
                color: '#ffffff',
                fontFamily: 'ykan',
                display: `${window.location.pathname === '/userLogin' ? 'none' : 'flex'}`,
                alignItems: 'center',
                gap: '8px',
                background: '#217CE6',
                border: `2px solid #ffffff`,
                borderRadius: '8px',
              }}
            >
              <img src={userloginicon} alt="User Login" />
              ورود کاربران
            </Button>
          </>
        ) : (
          <Button
            onClick={handleProfile}
            sx={{
              height: '44px',
              width: '143px',
              textTransform: 'none',
              color: '#ffffff',
              fontFamily: 'ykan',
              alignItems: 'center',
              gap: '8px',
              background: '#217CE6',
              border: `2px solid #ffffff`,
              borderRadius: '8px',
            }}
          >
            پروفایل
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
