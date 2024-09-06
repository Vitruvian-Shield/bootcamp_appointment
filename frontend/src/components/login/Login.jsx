import { Box, Button, TextField, Typography, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import contentImage from '../../assets/images/imgcontentlogin.svg'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, codeSet] = useState("");
  const [phone, phoneSet] = useState("");
  
  const c292929='#292929';
  const c3a3a3a='#3a3a3a';
  const c217CE6 ='#217CE6';
  const cE8F2FC ='#E8F2FC';
  const navigate = useNavigate();
  useEffect(() => {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");

    if (refresh == null | access == null) {
      
    } else { navigate("/") }
    
  },[])

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    sendLogin();
    setIsModalOpen(false);
  };

  const sendCode = () => {
    axios.post("http://127.0.0.1:8000/api/accounts/login/code/", { "phone_number": phone })
      
      .then(res => { 
        if (res.status === 200) {
          handleOpenModal();
        }
      })
      .catch(err => console.error(err));
  };

  const sendLogin = () => {
    axios.post("http://127.0.0.1:8000/api/accounts/login/accept/", { "phone_number": phone, "code": code })
      
      .then(res => {
        console.log(res)
        localStorage.setItem("access", res.data.access)
        localStorage.setItem("refresh", res.data.refresh)
        localStorage.setItem("is_doctor",res.data.is_doctor)
        navigate("/")
      })
      .catch(err => console.error(err));
  };

  return (
    <Box
      sx={{
        background:'#fff',
        display:'flex',
        minHeight: { xs: '680px', xl: '800px' },
        justifyContent:'center',
        alignItems:'center',
        gap:'64px',
        boxSizing:'border-box'
      }}
    >
      <Box
        sx={{
          display:{xs:'none',md:'block'}
        }}
      >
        <img src={contentImage} alt="" />
      </Box>
      <Box
        sx={{
          py: '56px',
          px: '32px',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          background: `${cE8F2FC}`,
          borderRadius:'16px',
          height:'fit-content',
          alignItems:'center'
        }}
      >
        <Box>
          <Typography
            sx={{
              color:`${c292929}`,
              fontSize:{xs:'14px',sm:'16px',md:'18px',lg:'22px'},
              fontWeight:700,
              lineHeight:'22px',
              fontFamily:'ykan',
              mb:'12px',
              letterSpacing:'0.2px',
              textAlign:'center'
            }}
          >
            { window.location.pathname === '/userLogin' ? 'ورود کاربران' :'ورود پزشکان' }
          </Typography>
          <Typography
            sx={{
              color: `${c3a3a3a}`,
              fontSize: { xs: '12.64px', sm: '14.22px', md: '16px', lg: '18px' },
              fontWeight: 400,
              lineHeight: '22px',
              fontFamily: 'ykan',
              letterSpacing: '0.2px',
              mb:'40px',
              textAlign:'center'
            }}
          >
            برای ورود لطفا شماره موبایل خود را وارد کنید.
          </Typography>
        </Box>
        <TextField
          value={phone}
          onChange={e => phoneSet(e.target.value)}
          placeholder='09119112233'
          dir='ltr'
          type='number'
          inputProps={{
            maxLength: 11,
          }}
          sx={{
            width:'100%',
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
              display: "none",
            },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          }}
        />
        <Box sx={{
          display:'flex',
          flexDirection:'column',
          mt:'24px',
          width:'100%',
          gap:'8px'
        }}>
          <Button
            onClick={sendCode}
            sx={{
              height:'46px',
              width:'100%',
              background:`${c217CE6}`,
              textTransform:'none',
              color:`#fff`,
              fontFamily:'ykan',
              fontSize: { xs: '12.64px', sm: '12.64', md: '14.22px', lg: '16px' },
              fontWeight: 700,
              lineHeight: '22px',
              letterSpacing: '0.2px',
              borderRadius:'8px'
            }}
          >ارسال کد تایید</Button>
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
              borderRadius: '8px'
            }}
          >
            ورود با حساب گوگل
          </Button>
           <Typography>
            {window.location.pathname === '/userLogin' ? (
              <Button
                onClick={()=>navigate("/userSignin")}
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
              borderRadius: '8px'
            }}
          >
              ثبت نام
            </Button>) : <></>}
          </Typography>
        </Box>
      </Box>
      
      {/* Modal for code confirmation */}
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
            gap: '16px'
          }}
        >
          <Typography id="modal-title" sx={{ color: "black" }} variant="h6" component="h2">
            تایید کد
          </Typography>
         
          <Typography id="modal-description" sx={{ mt: 2, color:"black" }}>
            لطفا کد تایید 8 رقمی ارسال شده به شماره موبایل خود را وارد کنید.
          </Typography>
          <TextField
            value={code}
            onChange={e => codeSet(e.target.value)}
            placeholder="کد تایید"
            dir="ltr"
            inputProps={{ maxLength: 8 }}
            sx={{ width: '100%' }}
          />
          <Button
            onClick={handleCloseModal}
            sx={{
              mt: 2,
              background:`${c217CE6}`,
              color:'#fff',
              width:'100%',
              textTransform:'none',
              fontFamily:'ykan',
              fontWeight:700,
              borderRadius:'8px'
            }}
          >
            تایید
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Login;
