import React from "react"
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
import { Box, Grid, Typography } from "@mui/material";
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



// import internaldoc from '../../assets/images/icons8-doctor-50.png'


class Specialities extends React.Component{
    state={
        speciality:[
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
                icon: <FaChildReaching enableBackground={"black"} />
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
    
    render(){
        
        return(
            <Box sx={{
                width:"100%",
                height:"700px",
                backgroundColor: "white",
                justifyContent:"center",
                alignContent:"center",
                margin:"-8px"
            }}>
                <Box sx={{textAlign:"center"}}>
                    <Typography variant="h3" color={"rgb(0,0,0)"}>تخصص مد نظر خود را برای ارتباط با دکتران و مختصصان انتخاب کنید</Typography>
                </Box>

                <Grid container spacing={1} sx={{
                    height:"80%",
                    width:"70%",
                    overflow:"hidden",
                    padding:"8px",
                    justifyContent:"space-evenly",
                    alignItems:"center",
                    marginRight:"15%"
                }}>
                    {this.state.speciality.map((item, index) => {
                        return (
                             
                                <Grid item spacing={3} key={index} sx={{
                                    
                                    width:"30%",
                                    height:"10%",
                                    // margin:"2% 1%",
                                    boxShadow:"1px 1px 1px rgba(171,171,171,0.5)",
                                    backgroundColor:"rgb(1, 33, 79)",
                                    borderRadius:"8px",
                                    display:"flex",
                                    alignItems:"center",
                                    paddingBottom:"1%",
                                    fontSize:"larger",
                                    ':hover':{
                                        width:"29.5%",
                                        height:"9.5%",
                                        opacity:"0.95"
                                    }
                                    
                                }}>
                                    <Grid sx={{
                                        width:"30%",
                                        justifyContent:"center",
                                        height:"fit-content",
                                    }}>
                                    {item.icon}
                                    </Grid>
                                    <Typography sx={{
                                        color:"white",
                                        height:"fit-content",
                                    }}>
                                        {item.name}
                                    </Typography>
                                </Grid>
                                
                                )
                                }
                            
                        )
                    }
                </Grid>

            </Box>
        )
    }
}

export default Specialities