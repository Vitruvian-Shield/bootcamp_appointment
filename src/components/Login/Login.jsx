import React, { useState } from "react";
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa6";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Box, Typography, Input, Checkbox, Button} from "@mui/material";

const Login = (props) => {
// doctors and users login page
        const [username, setUsername] = useState("")
        const [password, setPassword] = useState("")
        
        const location = useLocation()
        const currenturl = window.location.origin + location.pathname
        
        const loginbuttonHandler = (e) =>
          (currenturl === "http://localhost:5173/doctorslogin"
            ? axios
                .get("http://127.0.0.1:8000/api/medicine/doctors", {
                  headers:{
                    "Content-Type" : "application/json",
                  }
                })
                .then((response) => console.log(response))
                .catch((err) => console.log(err))
            : axios
                .get("http://127.0.0.1:8000/api/accounts/user")
                .then((result) => console.log(result))
                .catch((err) => console.log(err)));  
        

        const pagestyle = {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
          height: '100vh',
        }

        const loginboxstyle = {
          width: '420px',
          background: 'transparent',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          backdropFilter:'blur(40px)',
          color: '#fff',
          borderRadius: '10px',
          padding: '30px 40px',
          
        }

        const inputs_style =  {
          width: '100%',
          height: '100%',
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '40px',
          fontSize: '18px',
          color: '#fff',
          '::placeholder':{
            color: '#fff',
            textAlign: 'center',
          },
          ':hover':{
            border: '2px solid rgb(1, 4, 44)',
          },
        }

        const loginsectionstyle = {
          position: 'relative',
          width: '100%',
          height: '50px',
          margin: '30px 0',
        }

        const loginiconstyle = {
          position: 'absolute',
          right: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: "16px",
        }

        const remembermestyle = {
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14.5px',
          margin: '-15px 0 15px',
        }

        const remmebermecheckboxstyle = {
          accentColor: '#fff',
        }

        const loginbuttonstyle = {
          width: "100%",
          backgroundColor:"#66cdfc",
          height: '45px',
          border: 'none',
          outline: 'none',
          borderRadius: '45px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          fontSize: '16px',
          color: '#fff',
          fontWeight: '700',
          ":hover":{
            background:"transparent",
          }
        }

        const registerlinkstyle = {
          color: '#fff',
          textDecoration: 'none',
          fontWeight: '600',
          ":hover" :{
            textDecoration: 'underline',
          }
        }
      
        return (
          <Box sx={pagestyle} className="login-page">
            <Box sx={loginboxstyle}>
              <form action="">
                <Typography variant="h1" sx={{fontSize: '36px',textAlign: 'center',}}>
                  ورود {props.LoginBy}
                </Typography>
                <Box sx={loginsectionstyle}>
                  
                  <Input disableUnderline
                  sx={inputs_style}
                  placeholder="           نام کاربری" 
                  required value={username} 
                  onChange={ e => setUsername(e.target.value)}/>
                  
                  <FaUser style={loginiconstyle} />
                </Box>
                <Box sx={loginsectionstyle}>
                  <Input disableUnderline sx={inputs_style} type="password" placeholder="           رمز عبور" required value={password} onChange={ e => setPassword(e.target.value)}/>
                  <FaLock style={loginiconstyle} />
                </Box>

                <Box sx={remembermestyle} className="remember-forget">
                  <label>
                    <Checkbox sx={remmebermecheckboxstyle} type="checkbox" />
                    <Typography sx={{display:"inline-flex"}}>من را به یاد داشته باش </Typography>
                  </label>
                  <a style={{color: '#fff',textDecoration: 'none',":hover": {textDecoration: 'underline'}}} href="#">
                    فراموشی رمز عبور؟
                  </a>

                </Box>

                <Button sx={loginbuttonstyle} onClick={loginbuttonHandler}>ورود</Button>

                <Box sx={{fontSize: '14.5px',textAlign:'center', margin:'20px 0 15px',}} className="register-link">
                  <Typography>
                    حساب کاربری ندارید?<a style={registerlinkstyle} href={props.url}>ثبت نام</a>
                  </Typography>
                </Box>
              </form>
            </Box>
          </Box>
        );
    }


export default Login