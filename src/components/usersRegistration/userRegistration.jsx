import React, { useState } from "react";
import "./userRegistration.css";
import axios from "axios";
import {Box, Typography, Input, Button} from '@mui/material'
import { useNavigate } from "react-router-dom";

const UsersRegistration = () => {
// user registration page 

// states for registration
const [first_name, setFirst_name] = useState("");
const [last_name, setLast_name] = useState("");
const [phonenumber, setPhonenumber] = useState("");
const [email, setEmail] = useState("");
const [nationalcode, setNationalcode] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [repassword, setRepassword] = useState("")

const navigate = useNavigate()

const userdata = {
  first_name: first_name,
  last_name: last_name,
  nationalcode:nationalcode,
  phone_number: phonenumber,
  email: email,
  username: username,
  password: password,
};

const registerbuttonHandler = (e) =>{
  if (password === repassword) {
  axios.post("http://127.0.0.1:8000/api/account/user",
    userdata,{ headers :{
      "Content-Type" : "application/json:charset=UTF-8"
      }
    }
  )
.then(result => console.log(result))
.catch(err => console.log(err))
.then(navigate("/"))
}
else{
  alert("passwords does not match !")
}
}



const mainpagestyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '70vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}

const pageboxregisterstyle = {
  width: '920px',
  background: 'transparent',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  backdropFilter: 'blur(20px)',
  color: '#fff',
  borderRadius: "10px",
  padding: '30px 40px',
  margin: '40px 0',

}

const inputsectionstyle = {
  display: 'inline-flex',
  position: 'relative',
  width: '45%',
  height: '50px',
  margin: '20px 20px',
}

const boxinputstyle = {
  textAlign: 'center',
  width: '100%',
  height: '100%',
  background: 'transparent',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  outline: "none",
  borderRadius: '40px',
  fontSize: '19px',
  color: '#fff',
  padding: '0 0 0 10px',
  '::placeholder': {
    color: '#fff',
    textAlign: 'center',
  },

  ':hover' :{
    border: '1px solid black',
    boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.1)',
  }
}

const registerbuttonstyle = {
  width: '40%',
  height: '45px',
  background: '#66cdfc',
  color:"#fff",
  border: 'none',
  outline: 'none',
  borderRadius: '45px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '700',
  ":hover" :{
    backgroundColor:"transparent",
  }
}
  return (
    <Box sx={mainpagestyle} className="user-registeration">
      <Box sx={pageboxregisterstyle} className="user-registeration-box">
        <form action="">
          <Typography sx={{fontSize: '36px',textAlign: 'center',}}> ثبت نام کاربران </Typography>

          <Box sx={inputsectionstyle} className="inputbox">
            <Input
              disableUnderline
              sx={boxinputstyle}
              type="text"
              placeholder="  نام "
              required
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            />
          </Box>

          <Box sx={inputsectionstyle} className="inputbox">
            <Input
              disableUnderline
              sx={boxinputstyle}
              type="text"
              placeholder="  نام خانوادگی "
              required
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
            />
          </Box>

          <Box sx={inputsectionstyle} className="inputbox">
            <Input
              disableUnderline
              sx={boxinputstyle}
              placeholder="  شماره تماس "
              required
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </Box>

          <Box sx={inputsectionstyle} className="inputbox">
            <Input
              disableUnderline
              sx={boxinputstyle}
              type="text"
              placeholder="  کدملی"
              required
              value={nationalcode}
              onChange={(e) => setNationalcode(e.target.value)}
            />
          </Box>

          <Box sx={inputsectionstyle} className="inputbox">
            <Input
              disableUnderline
              sx={boxinputstyle}
              type="Email"
              placeholder="  ایمیل "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box sx={inputsectionstyle} className="inputbox">
            <Input
              disableUnderline
              sx={boxinputstyle}
              type="text"
              placeholder="  نام کاربری"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>

          <Box sx={inputsectionstyle} className="inputbox">
            <Input
              disableUnderline
              sx={boxinputstyle}
              type="password"
              placeholder="  رمز عبور"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Box sx={inputsectionstyle} className="inputbox">
            <Input
              disableUnderline
              sx={boxinputstyle}
              type="password"
              placeholder="  تکرار رمز عبور"
              required
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
          </Box>
          <Box sx={{display: 'flex',justifyContent: 'center',}} className="user-registeration-button">
            <Button sx={registerbuttonstyle} type="submit" onClick={registerbuttonHandler}>ثبت نام</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
  }


export default UsersRegistration;
