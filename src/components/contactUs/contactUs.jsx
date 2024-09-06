import React, { useState } from "react";
import image from "../../assets/images/contact-us.jpg";
import {Box, Typography, Grid2, Input, Button} from '@mui/material'
import axios from "axios";

const ContactUs = () => {
  // contact us page



  const contactusbuttonHandler = e => {
    axios.post("http://127.0.0.1:8000/api/contactus/contactus", advice, {headers: {
      "Content-Type" : "application/json;charset=UTF-8",
    }})
    .then( result => console.log(result) )
    .catch(err => console.log(err))
  } 


  const [advice, setAdvice] = useState({})
  
    const inputs_style = {
      width:"300px",
      height:"50px",
      backgroundColor: 'azure',
      margin: '15px 15px',
      border: '0.5px solid rgba(70, 69, 69, 0.72)',
      borderRadius: '8px',
      textAlign: 'center',
      ":hover" :{
        border:'0.5px solid #217CE6',
      },
      "::placeholder" :{
        textAlign: 'center',
        color: 'rgb(116, 115, 115)',
        fontSize: '16px',
      }
    }

    const submitbuttonstyle = {
      width: '25%',
      height: '40px',
      margin: '30px 0',
      border: '1px solid black',
      borderRadius: '5px',
      backgroundColor: 'rgb(3, 51, 68)',
      color: '#fff',
      fontSize: '20px',
      fontWeight: '500',
      ":hover":{
        backgroundColor: 'transparent',
        color: 'black',
      }
    }

    const textareastyle = {
      width: '660px',
      minWidth:"450px",
      height: '150px',
      padding: '12px 20px',
      backgroundColor: 'azure',
      boxSizing: 'border-box',
      borderRadius: '5px',
      resize: 'none',
      border: '1px solid black',
      color:"black",
      ": hover":{
        backgroundColor: 'transparent',
        boxShadow: '2px 2px 5px 2px rgba(0, 0, 0, 0.2)',
      }
    }

    return (
      <Box sx={{
        width:"100%",
        justifyContent: 'center',
        display: 'flex',
        backgroundColor:"azure",
        alignItems:"center"
      }}>
        <Box sx={{
          padding: '10px',
          marginX:"20%",
          marginTop: '50px',
          borderRadius: '8px',
          marginBottom: '50px',
          minWidth:"400px",
          backgroundColor: 'azure',
          boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, .2)',
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'center',
          }}
          >
            <img src={image} alt="picture is not available" style={{
                width: '100%',
                height: '400px',
                borderRadius: '5px',
            }} />
            <Typography sx={{fontSize:"20px", color:"black"}}>با ما در ارتباط باشید</Typography>
            <Typography sx={{fontSize:"20px", color:"black"}}>
              با استفاده از فرم زیر انتقادات و پیشنهادات خود را با ما در میان
              بگذارید...
            </Typography>
          </Box>

          <Grid2 container spacing={2} sx={{
            display: "flex",
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <Grid2>
              <Input
                disableUnderline
                type="text"
                placeholder=" نام"
                required
                sx={inputs_style}
                value={advice.first_name}
              />
            </Grid2>

            <Grid2>
              <Input
                disableUnderline
                type="text"
                className="information"
                placeholder=" نام خانوادگی"
                required
                sx={inputs_style}
                value={advice.last_name}
              />
            </Grid2>

            <Grid2 item>
              <Input
                disableUnderline
                placeholder=" شماره تماس "
                required
                sx={inputs_style}
                value={advice.phonenumber}
              />
            </Grid2>

            <Grid2>
              <Input
                disableUnderline
                type="Email"
                placeholder="  ایمیل "
                id="email"
                required
                sx={inputs_style}
                value={advice.email}
              />
            </Grid2>

            <textarea
              placeholder=" نظرات خود را با ما در میان بگذارید... "
              style={textareastyle}
              value={advice.body}
            />
            <Button sx={submitbuttonstyle} onClick={contactusbuttonHandler}> ارسال نظر </Button>
          </Grid2>
        </Box>
      </Box>
    );
  }


export default ContactUs;
