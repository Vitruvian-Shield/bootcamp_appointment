import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { MdToys } from "react-icons/md";
import { GiKidneys } from "react-icons/gi";
import { FaTooth } from "react-icons/fa";
import { GiStomach } from "react-icons/gi";
import { GiFruitBowl } from "react-icons/gi";
import { FaChildReaching } from "react-icons/fa6";
import { IoIosEye } from "react-icons/io";
import { IoEar } from "react-icons/io5";
import { PiBone } from "react-icons/pi";
import { RiUserVoiceLine } from "react-icons/ri";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { RiPsychotherapyLine } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { RiBrainLine } from "react-icons/ri";
import { TbRibbonHealth } from "react-icons/tb";
import { TbLungsFilled } from "react-icons/tb";
import { RiBodyScanFill } from "react-icons/ri";
import { GiBrain } from "react-icons/gi";
import { LuScanFace } from "react-icons/lu";
import { FaHandSparkles } from "react-icons/fa";
import { GiIntricateNecklace } from "react-icons/gi";


const Specialities = ()=> {

    const [speciality, setSpeciality] = useState({})

    useEffect(() =>{
    axios.get("localhost:3000/api/medicine/speciality/list/")
    .then(({ data }) => setSpeciality(data))
    .catch(err => console.log(err))},[])

    
    

    // data for speciality fields
    const state={
        specialities:[
            {
                name: 'متخصص اطفال',
                icon: <MdToys />
            },
            {
                name: 'فوق تخصص کلیه (نفرولوژیست)',
                icon: <GiKidneys />
            },
            {
                name: 'متخصص گوارش',
                icon: <GiStomach />

            },
            {
                name: 'دندانپزشک',
                icon: <FaTooth />

            },
            {
                name: 'متخصص تغذیه',
                icon: <GiFruitBowl />
            },
            {
                name: 'متخصص مامایی',
                icon: <FaChildReaching />
            },
            {
                name: 'متخصص چشم پزشک',
                icon: <IoIosEye />
            },
            {
                name: 'دکتر گوش، حلق و بینی',
                icon: <IoEar />
            },
            {
                name: 'متخصص ارتوپدی',
                icon: <PiBone />
            },
            {
                name: 'دکتر متخصص گفتار درمانی',
                icon: <RiUserVoiceLine />
            },
            {
                name: 'متخصص پوست، مو و زیبایی',
                icon: <FaHandSparkles />
            },
            {
                name: 'روانشناس',
                icon: <RiPsychotherapyLine />
            },
            {
                name: 'دکتر داخلی',
                icon: <FaUserDoctor />
            },
            {
                name: 'متخصص مغز و اعصاب (نورولوژی)',
                icon: <RiBrainLine />
            },
            {
                name: 'متخصص اورولوژی',
                icon: <TbRibbonHealth />
            },
            {
                name: 'جراح مغز و اعصاب',
                icon: <GiBrain />
            },
            {
                name: 'پزشک عمومی',
                icon: <FaUserDoctor />
            },
            {
                name: 'رادیوتراپیست',
                icon: <LuScanFace />
            },
            {
                name: 'متخصص رادیولوژی و سونوگرافی',
                icon: <RiBodyScanFill />
            },
            {
                name: 'متخصص غدد',
                icon: <GiIntricateNecklace />
            },
            {
                name: 'متخصص ریه',
                icon: <TbLungsFilled />
           },
        ]
    }
        
    const navigate = useNavigate()

        return(
            <Box sx={{
                width:"100%",
                height:"700px",
                backgroundColor: "white",
                justifyContent:"center",
                alignContent:"center",
                color:"azure",
            }}>

                {/* ///// header ////// */}

                <Box  sx={{textAlign:"center"}}>
                    <Typography variant="h3" color={"rgb(0,0,0)"} marginY={"30px"}>تخصص مد نظر خود را برای ارتباط با پزشکان و مختصصان انتخاب کنید</Typography>
                </Box>

                <Grid2 container spacing={1} sx={{
                    height:"80%",
                    width:"70%",
                    justifyContent:"space-evenly",
                    alignItems:"center",
                    marginRight:"15%"
                }}>


                    {/* ///// speciality fields /////// */}

                    {state.specialities.map((item, index) => {
                        return (
                             
                                <Button onClick={() => navigate(`/search/?speciality${item.name}`)} sx={{
                                    width:"30%",
                                    height:"10%",
                                    boxShadow:"1px 1px 1px rgba(171,171,171,0.5)",
                                    backgroundColor:"rgb(1, 33, 79)",
                                    color:"azure",
                                    borderRadius:"8px",
                                    fontSize:"larger",
                                    justifyContent:"flex-start",
                                    ':hover':{
                                        width:"29.5%",
                                        height:"9.5%",
                                        opacity:"0.95",
                                        backgroundColor:"rgb(1, 33, 79)",
                                    }

                                }}>
                                    <Grid2 sx={{
                                        width:"fit-content",
                                        marginInline:"10%",
                                        display:"inline-flex",
                                        height:"fit-content",
                                        }}>
                                    {item.icon}
                                    </Grid2>
                                    <Typography sx={{
                                        color:"white",
                                        height:"fit-content",
                                        textAlign:"right"

                                    }}>
                                        {item.name}
                                    </Typography>
                                </Button>
                                
                                )
                                }
                        )
                    }
                </Grid2>

            </Box>
        )
    }

export default Specialities