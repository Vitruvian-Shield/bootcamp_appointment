import React from "react"
// import './Header.css'
import logo from '../../assets/images/logo.svg'
import { Link } from "react-router-dom";
import { FaSearch, FaHandPaper, FaPhone } from "react-icons/fa";
import { FaStethoscope } from "react-icons/fa6";
import { RiStethoscopeFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { ImHome3 } from "react-icons/im";
import {Box , Typography, Grid2, Button} from '@mui/material'



const Header = () => {
  // website header


  const a_navbarstyle = {
    width:"fit-content",
    minWidth:"2%",
    height:"35px",
    color: '#e4dfdf',
    textDecoration:"none",
    fontSize :"18px"
    
  }

  const navbarunderlinestyle = {
    width:"fit-content",
    minWidth:"2%",
    height:"35px",
    color: '#e4dfdf',
    borderBottom: '2px solid white',
    textDecoration:"none",
    fontSize:"18px"

  }
  const docloginbuttonstyle = {
    width:"120px",
    minWidth:"2%",
    height:"50px",
    marginLeft:"15px",
    display:"inline-flex",
    backgroundColor:"transparent",
    border: '2px solid #ffff',
    color: 'rgb(255, 255, 255)',

    ":hover" :{
      backgroundColor: 'rgb(0, 149, 255)',
      border: '3px solid #ffff',
    }
  }

  const userloginbuttonstyle = {
    width:"120px",
    minWidth:"2%",
    height:"50px",
    display:"inline-flex",
    backgroundColor: 'rgb(0, 149, 255)',
    border: '2px solid #ffff',
    color: 'rgb(255, 255, 255)',
    ":hover" :{
      backgroundColor:"transparent",
      border: '3px solid #ffff',
    }
  }
  
  const navigationstyle = {
    width:"50%",
    height:"20%",
    display: "inline-flex",
    justifyContent:"space-around",
    marginInlineStart:"20px"
  }

      return (
        <Box style={{
          width:"100%",
          height:"100px",
          backgroundColor: '#0C2D54',
          display:"inline-flex",
          alignItems:"center",
          justifyContent:"space-between"
          }}>

          <nav style={navigationstyle}
            >
            <a href="/" /*style={{margin:"0px 15px 10px 0px",}}*/>
              <img style={{float: 'right' , width:"45px", marginTop:"-18px"}} src={logo} /> 
            </a>
            <a
              style={window.location.pathname === "/" ? navbarunderlinestyle  : a_navbarstyle }
              href="/"
            >
              <ImHome3 /> <b> خانه</b>
            </a>

            <a
            style={window.location.pathname === "/search" ? navbarunderlinestyle  : a_navbarstyle }
              href="/search"
            >
              <FaSearch /> <b> جستجو</b>
            </a>

            <a
            style={window.location.pathname === "/reservation" ? navbarunderlinestyle  : a_navbarstyle }
              href="/reservation"
            >
              <FaHandPaper /> <b>نوبت گیری</b>
            </a>

            <a
            style={window.location.pathname === "/specialities" ? navbarunderlinestyle  : a_navbarstyle }
              href="/specialities"
            >
              <FaStethoscope /> <b>تخصص ها</b>
            </a>

            <a
            style={window.location.pathname === "/contact-us" ? navbarunderlinestyle :a_navbarstyle }
              href="/contact-us"
            >
              <FaPhone /> <b> تماس با ما</b>
            </a>

          </nav>

          <Box sx={{
            marginInline:"50px",
            width:'fit-content',
            }}>  

            <Link to="/doctorslogin">
              <Button sx={docloginbuttonstyle}>
                <Typography> <RiStethoscopeFill style={{marginLeft:"5px"}} />
                ورود پزشکان</Typography>
              </Button>
            </Link>

            <Link to="/userslogin">
              <Button sx={userloginbuttonstyle}>
                <Typography><FaRegUser style={{marginLeft:"5px"}} />ورود کاربران</Typography> 
              </Button>
            </Link>

          </Box>
          
        </Box>
      );
    }

export default Header