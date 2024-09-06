import { Box, Button, TextField, Typography, Modal } from '@mui/material';
import React, { useState } from 'react';
import contentImage from '../../assets/images/imgcontentlogin.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState({});

  const c292929 = '#292929';
  const c3a3a3a = '#3a3a3a';
  const c217CE6 = '#217CE6';
  const cE8F2FC = '#E8F2FC';

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSignUp = () => {
    if (phone.length !== 11) {
      setErrors({ ...errors, phone: 'شماره موبایل باید 11 رقمی باشد.' });
      return;
    }
    axios
      .post('http://127.0.0.1:8000/api/accounts/userSignin/', {
        username: name,
        email: email,
        phone_number: phone,
        password: password,
        first_name: first_name,
        last_name: last_name,
      })
      .then((res) => {
        if (res.status === 201) {
          handleOpenModal();
        }
      })
      .catch((err) => console.error(err));
  };

  const checkUsernameAvailability = () => {
    axios
      .post(`http://127.0.0.1:8000/api/accounts/usernameisavalable/${name}/`)
      .then((response) => {
        if (response.data.status === 'ok') {
          setErrors({ ...errors, username: null });
        } else {
          setErrors({ ...errors, username: 'نام کاربری موجود نیست.' });
        }
      })
      .catch(() => {
        setErrors({ ...errors, username: 'نام کاربری  باید یونیک باشد.' });
      });
  };

  const handleVerifyCode = () => {
   navigate("/userLogin")
  };

  return (
    <Box
      sx={{
        background: '#fff',
        display: 'flex',
        minHeight: { xs: '680px', xl: '800px' },
        justifyContent: 'center',
        alignItems: 'center',
        gap: '100px',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
        }}
      >
        <img src={contentImage} alt="" />
      </Box>
      <Box
        sx={{
          py: '56px',
          px: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: `${cE8F2FC}`,
          borderRadius: '16px',
          width: '500px', // Increase width for all fields
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            color: `${c292929}`,
            fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '22px' },
            fontWeight: 700,
            lineHeight: '22px',
            fontFamily: 'ykan',
            mb: '12px',
            letterSpacing: '0.2px',
            textAlign: 'center',
          }}
        >
          ثبت نام
        </Typography>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={checkUsernameAvailability} // Check username availability on blur
          placeholder="نام کاربری"
          error={!!errors.username}
          helperText={errors.username}
          sx={{ width: '100%', mb: 2 }}
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل"
          sx={{ width: '100%', mb: 2 }}
        />
        <TextField
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="نام"
          sx={{ width: '100%', mb: 2 }}
        />
        <TextField
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="نام خانوادگی"
          sx={{ width: '100%', mb: 2 }}
        />
        <TextField
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="شماره موبایل"
          dir="ltr"
          type="number"
          error={!!errors.phone}
          helperText={errors.phone}
          inputProps={{
            maxLength: 11,
          }}
          sx={{
            width: '100%',
            mb: 2,
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
              display: 'none',
            },
            '& input[type=number]': {
              MozAppearance: 'textfield',
            },
          }}
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="رمز عبور"
          type="password"
          sx={{ width: '100%', mb: 2 }}
        />
        <Button
          onClick={handleSignUp}
          sx={{
            height: '46px',
            width: '100%',
            background: `${c217CE6}`,
            textTransform: 'none',
            color: '#fff',
            fontFamily: 'ykan',
            fontSize: { xs: '12.64px', sm: '12.64px', md: '14.22px', lg: '16px' },
            fontWeight: 700,
            lineHeight: '22px',
            letterSpacing: '0.2px',
            borderRadius: '8px',
            mb: 2,
          }}
        >
          ثبت نام
        </Button>

        <Button
          sx={{
            height: '46px',
            width: '100%',
            border: `1px solid ${c217CE6}`,
            textTransform: 'none',
            color: `${c217CE6}`,
            fontFamily: 'ykan',
            fontSize: { xs: '12.64px', sm: '12.64', md: '14.22px', lg: '16px' },
            fontWeight: 700,
            lineHeight: '22px',
            letterSpacing: '0.2px',
            borderRadius: '8px',
          }}
        >
          ثبت نام با حساب گوگل
        </Button>
      </Box>

      {/* Modal for code verification */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
         
          <Typography id="modal-description" sx={{ mt: 2, color: 'black' }}>
             کاربر با موفقیت ساخته شد.
          </Typography>
          
          <Button
            onClick={handleVerifyCode}
            sx={{
              mt: 2,
              background: `${c217CE6}`,
              color: '#fff',
              width: '100%',
              textTransform: 'none',
              fontFamily: 'ykan',
              fontWeight: 700,
              borderRadius: '8px',
            }}
          >
            تایید
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default SignUp;
