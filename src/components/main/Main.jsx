import React from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import {Box, Typography, Input, Button} from '@mui/material'


const Main = () => {
   

    // onChange function
    const navigate = useNavigate()

    const mainboxes = {
        /* min-width: 1010px; */
        overflow: 'auto',
        width: '100%',
        height:'700px',
        background: `linear-gradient(180deg, rgba(31, 31, 31, 0.72) 100%, rgba(31, 31, 31, 0.18) 150%),url(${'/src/assets//images/Alinea+Soma_small.jpg'}) lightgray 50% / cover no-repeat`,
        position: 'relative',
        backgroundAttachment:'fixed',
        textAlign: 'center',
        backgroundRepeat: 'no-repeat',
        textShadow: '1.7px 1.7px 1.7px black',
        fontSize: 'larger',
        color: 'azure',
        
    }

    const hstyles = {
        paddingTop: '50mm !important',
        backgroundAttachment: 'fixed',
        height: 'auto',
        width: 'auto',
        color: 'azure',
    }

    const searchsectionstyle ={
        paddingTop: '200px',
        height: '700px',
        textAlign: 'right',
        paddingRight: '25px',
        position: 'relative',
        textShadow:"1.7px 1.7px 1.7px black",
        background: `linear-gradient(270deg, rgba(70, 69, 69, 0.72) 30%, rgba(31, 31, 31, 0.18) 100%),url(${'/src/assets/images/bgcontent.svg'}) lightgray 50% / cover no-repeat` ,
    }

    const inputstyle = {
        width: '70%',
        minWidth: '150px',
        height: '70px',
        textAlign: 'right',
        borderRadius: '8px',
        color: '#fff',
        border: 'none',
        opacity: '0.8',
        background: 'none',
        position:'static',
        "::placeholder" :{
            color: 'rgb(254, 254, 255)',
            fontSize:'22px',
            paddingRight: '5px',
        
        }
    }

    const searchbuttonstyle = {
        minWidth: '70px',
        height: '70px',
        marginLeft: '2px',
        borderRadius: '8px',
        color:'white',
        backgroundColor: 'rgb(1, 1, 126)',
        justifyContent: 'space-evenly',
        textShadow: '1px 1px 1px  rgb(48, 49, 50)',
        border: 'none',
        display: 'inline-flex',
        opacity: '0.8',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column-reverse',
        ':hover':{
            background: 'none',
            color:'rgb(255, 255, 255)',
        }
    }

    const searchspanstyle = {
        width: '40%',
        minWidth:"250px",
        height: 'max-content',
        display:'inline-flex',
        backgroundColor:' rgb(157, 158, 158)',
        opacity: '0.8',
        borderRadius:'8px',
        boxSizing: 'border-box',
    
    }

    const searchiconstyle = {
        display: 'inline',
        position:"sticky",
        marginRight: '-40px',
        position: 'static',
        width: '30%',
        marginLeft: '-40px',
    }
        return(
            <Box>
                
                {/* /////// header //////// */}
                <Box sx={mainboxes}>
                    <Typography variant="h1" fontSize={"72px"}sx={hstyles}>به سامانه نوبت دهی آنلاین ویترووین شیلد خوش آمدید</Typography>
                    <Typography variant="p" sx= {{
                        backgroundAttachment: 'fixed',
                        color:'azure',
                    }}>
                    با استفاده از سیستم نوبت دهی انلاین ما ، به راحتی میتوانید پزشکان مورد نظر خود را بیابید و نوبت بگیرید.</Typography>
                </Box>

                {/* //////// search section //////// */}
                <Box sx={searchsectionstyle}>
                    <Typography variant="h2" fontSize={"50px"} marginBottom={"45px"} sx={hstyles}> فقط کافیست نام پزشک یا تخصص مورد نظر خود را در باکس جستجو وارد کنید<br></br> و از خدمات باکیفیت ما بهره‌مند شوید. </Typography>
                    <span style={searchspanstyle} id="searchspan">
                        
                        <Button sx={searchbuttonstyle} onClick= {navigate('/search')} ><b>جستجو</b>
                        <FaSearch style={searchiconstyle} id="searchicon" />
                        </Button>
                        
                        <Input sx={inputstyle} placeholder=" نام پزشک ، تخصص ، بیماری و شهر و . . ." type="text" />
                        
                    </span>
                </Box>
            </Box>
        )
    }


export default Main