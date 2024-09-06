import React, { useEffect, useState } from "react";
import {Box, Grid2, Typography} from '@mui/material';
import axios from "axios";


const DoctorProfile = () =>{
    
    useEffect(() =>{ 
    axios.get("http://127.0.0.1:8000/api/medicine/doctorprofile")
    .then(({ data }) => setDoctor({
        first_name : data.first_name,
        last_name :data.last_name,
        speciality: data.speciality,
        skills:data.skills,
        location : data.location,
    }))
    .catch(err => console.log(err)) },[])
    

    axios.get("http://127.0.0.1:8000/api/appointment/appointment")
    .then(({ data }) => setAppointments(data))

    const [appointments, setAppointments] = useState([])
    const [doctor,setDoctor] = useState({})


    //data for test

    // const doctor = {
    //     name:"آرش",
    //     lastname:"سلگی",
    //     img : img,
    //     speciality:"جراح",
    //     skills:"جراحی",
    //     location:"آمل",
    // }

    // const appointments = [
    //     {
    //         name:"آرش",
    //         lastname:"سلگی",
    //         nationalcode:369852147,
    //         date:"23/8/1403",
    //         time:"10:30",
    //         sex:"آقا"
    //     },
    //     {
    //         name:"mamad",
    //         lastname:"sfr",
    //         nationalcode:369852147,
    //         date:"23/8/1403",
    //         time:"10:30",
    //         sex:"male"
    //     },
    //     {
    //         name:"mamad",
    //         lastname:"sfr",
    //         nationalcode:369852147,
    //         date:"23/8/1403",
    //         time:"10:30",
    //         sex:"male"
    //     },
    //     {
    //         name:"mamad",
    //         lastname:"sfr",
    //         nationalcode:369852147,
    //         date:"23/8/1403",
    //         time:"10:30",
    //         sex:"male"
    //     },  
        
    // ]

    const mainpagestyle ={
        display:"inline-flex",
        justifyContent:"space-between",
        width:"100%",    
        height:"500px",
        alignItems:"center",
        background: `radial-gradient(rgba(0, 186, 251, 0.2) 25%,rgba(0, 186, 251, 0.5)  60%, rgba(0, 186, 251, 0.8) 80%),#217CE6` ,

    }

    const textinfostyle = {
        display:"inline-flex",
        flexDirection:"column",
        width:"33%",
        height:"380px",
        color:"#fff",
        padding:"15px",
        alignItems:"center", 
        textAlign:"center",
        borderRadius :"8px",
        backgroundColor:'azure',
    }

    const docimgstyle = {
        borderRadius :"50%",
        width:"150px",
        height:"150px"
    }

    const appointmentsstyle = {
        width:"40%",
        height:"100px",
        alignContent:"center",
        padding:"15px",
        borderRadius:"8px",
        textShadow:"0.5px 0.5px 0.5px rgba(0,0,0,0.1)",
        border :"1px solid rgba(0,0,0,0.1) ",
        backgroundColor:"azure",
        color:"#00bafb",
    }

    const docinfodatastyle = {
        marginY:"15px",
        color:"#217ce6",
        fontSize:"18px",
        textShadow:"0.5px 0.5px 0.5px rgba(0,0,0,0.3)"
    }

    return (
        <Box sx={mainpagestyle}>
            <Grid2 container columnGap={"150px"} sx={{flexWrap:'nowrap', padding:"50px",}} >
                <Box sx={textinfostyle}>
                    <Box>
                        <img style={docimgstyle} src={doctor.img} alt="" />
                        <Typography sx={{
                            marginY:"15px",
                            fontWeight:800,
                            fontSize:"24px",
                            color:"#144278"   
                        }} >دکتر {doctor.name} {doctor.lastname}</Typography>
                        <Typography sx={docinfodatastyle} fontWeight={400}>{doctor.speciality}</Typography>
                    </Box>
                    <Box>
                        <Typography sx={docinfodatastyle}>{doctor.skills}</Typography>
                        <Typography sx={docinfodatastyle}>{doctor.location}</Typography>
                    </Box>
                </Box>
                <Grid2 sx={{
                    marginX:"25px",
                    overflow:"auto",
                    borderRadius:"8px",
                    padding:"25px",
                }} container columnSpacing={8} rowGap={"25px"}> 
                <Typography width={"100%"} color="#fff" fontSize={"24px"}> نوبت های گرفته شده </Typography>
                    {appointments.map((item,index) => (
                        <Box key={index} sx={appointmentsstyle}>
                            <Typography color="#217CE6"> نام بیمار : {item.name} {item.lastname}</Typography>
                            <Typography> کدملی بیمار : {item.nationalcode}</Typography>
                            <Typography> جنسیت : {item.sex}</Typography>
                            <Typography> زمان نوبت : {item.date} {item.time}</Typography>

                        </Box>
                    ))}
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default DoctorProfile