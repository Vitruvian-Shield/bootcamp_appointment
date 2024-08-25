import React, { useState } from "react";
import footer from './footer.css'
import { Box } from "@mui/material";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";


class Footer extends React.Component{
    
    render(){

        // styles for tags
        const asocialsstyle = {
            paddingRight: '8px',
            display: 'inline-table',
            textDecoration: 'none',
            width: 'fit-content',
            lineHeight: '25px',
        }    

        const acontactusstyle ={
            paddingRight: '8px',
            display: 'inline-table',
            width: '100px',
            position:'sticky',
            margin: 'auto',
            textDecoration: 'none',
            width: 'fit-content',
            lineHeight: '25px',
        }

        const footertitlesstyle = {
            color:'#B9D9FF',
            textShadow: '1px 1px 0.5px black',
        }

        const footerstyle = {
            padding: '35px',
            width: 'fit-content',
            height: '200px',
            paddingRight:'80px',
            textAlign:'right',
            display:'inline-table',}

        const atags = {
            textDecoration: 'none',
            width: 'fit-content',
            lineHeight: '25px',
        }

        const mainfooterstyle = {
            margin: '-8px',
            backgroundColor: '#0C2D54',
            border: '0px 50px 0px 0px black',
        }

        return(

            <Box sx={mainfooterstyle}>
                <Box sx={footerstyle}>
                    <b style={footertitlesstyle}>شهرها</b><br></br>
                    <a href="#" style={atags}>تهران</a> <br></br>
                    <a href="#" style={atags}>مشهد</a> <br></br>
                    <a href="#" style={atags}>اصفهان</a><br></br>
                    
                </Box>
                <Box sx={footerstyle}>
                    <b style={footertitlesstyle}>تخصص های پرطرفدار</b><br></br>
                    <a href="#" style={atags}>روانشناسی</a> <br></br>
                    <a href="#" style={atags}>چشم پزشکی</a> <br></br>
                    <a href="#" style={atags}>دندان پزشکی</a><br></br>
                </Box>
                <Box sx={footerstyle}>
                    <b style={footertitlesstyle}>لینک ها</b><br></br>
                    <a href="#" style={atags}>پزشکان</a> <br></br>
                    <a href="#" style={atags}>نوبت گیری</a> <br></br>
                    <a href="#" style={atags}>تخصص ها</a><br></br>
                </Box>
                <Box sx={footerstyle}>
                    <b style={footertitlesstyle}>با ما درارتباط باشید</b><br></br>
                    <a href="tel:+989112223344" style={acontactusstyle}>
                        <Box sx={{width:"fit-content", display:"inline-flex", marginLeft:"5%" , marginRight:"-8%"}}>
                        <FaPhoneFlip />
                        </Box>
                        09112223344</a> <br></br>
                    <a href="mailto:VS_appointment@email.com" style={acontactusstyle}>
                        <Box sx={{width:"fit-content", display:"inline-flex", marginLeft:"5%" , marginRight:"-5%"}}>
                        <MdOutlineMail />
                        </Box>
                        VS_appointment@email.com</a>
                </Box>
                <Box sx={footerstyle}>
                    <b style={footertitlesstyle}>شبکه های اجتماعی</b><br></br>
                    <a href="#" style={asocialsstyle}><FaSquareInstagram /></a>
                    <a href="#" style={asocialsstyle}><FaTelegram /></a>
                    <a href="#" style={asocialsstyle}><FaLinkedin /></a>
                </Box>
            </Box>
        )
    }
}

export default Footer