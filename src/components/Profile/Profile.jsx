import { Box, Button, Grid2, MenuItem, Modal, Rating, Select, Switch, TextField, Typography } from '@mui/material'
import React, { useState , useEffect} from 'react'
import Phoneicon from "../../assets/images/icons8-phone-50.png"
import lociconblack from '../../assets/images/icons8-location-50.png'
import commenticon from '../../assets/images/icons8-comment-50.png'
import axios from 'axios'

const Profile = () => {

    // page for reserve an appointment and seeing doctor details


    useEffect(() =>{
    axios.get("http://127.0.0.1:8000/api/medicine/doctors/", {
        headers:{
          "Content-Type" : "application/json;charset=UTF-8",
        }
      })
      .then(({ data }) => { setDoctor(data) })
      .catch((err) => console.log(err))},[])


    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/appointment/comments")
        .then(({ data }) => setComments(data) )
        .catch(err => console.log(err))
    },[])


    const addcommentHandler = e => {
        axios.post("http://127.0.0.1:8000/api/appointment/comments",addedcomment,{
            headers:{
                "Content-Type" : "application/json;charset=UTF-8",
            }
        })
        .then(result => console.log(result))
        .catch(err => console.log(err))
    } 

    const appointmentbuttonHandler = e =>{
        axios.post("http://127.0.0.1:8000/api/medicine/doctors",appointmentdata, {
            headers:{
            "Content-Type" : "application/json;charset=UTF-8",
            }
        })
        .then(({ data }) => { setDoctor(data) })
        .catch((err) => console.log(err))
    }
    //colors for styling
    const c144278 = '#144278'
    const c217CE6 = '#217CE6'
    const c5f5f5f = '#5f5f5f'
    const c8c8c8c = '#8c8c8c'
    const c4c4c4c = '#4c4c4c'
    const c515151 = '#515151'
    const c868686 = '#868686'
    const c1f1f1f = '#1f1f1f'
    const c3771C8 = '#3771C8'
    const fcfc00 = '#fcfc00'

    // state with hook for reservation
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username,setUsername] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [nationalCode, setNationalCode] = useState()
    const [dateValue, setDateValue] = useState()
    const [sex,setSex] = useState(Boolean)
    const [illness, setIllness] = useState('')

    // state with hook for profile and comments
    const [addedcomment , setAddedcomment] = useState({})
    const [comments, setComments] = useState([])
    const [doctor, setDoctor] = useState({})
    
    const appointmentdata = {
        first_name : name,
        last_name :lastName,
        phonenumber:phoneNumber,
        nationalCode: nationalCode,
        date: dateValue,
        sex: sex,
    }

    //data for inputs
    const inputs = [
        {
            label: 'نام *',
            value: name,
            setValue: setName,
            placeHolder: 'نام خود را وارد کنید',
            type: 'text',
            name: 'firsName'
        },
        {
            label: 'نام خانوادگی *',
            value: lastName,
            setValue: setLastName,
            placeHolder: 'نام خانوادگی خود را وارد کنید',
            type: 'text',
            name: 'lastName'
        },
        {
            label: 'شماره تلفن*',
            value: phoneNumber,
            setValue: setPhoneNumber,
            placeHolder: '+98 911 234 56 78',
            type: 'number',
            name: 'phoneNumber'
        },
        {
            label: 'کد ملی ',
            value: nationalCode,
            setValue: setNationalCode,
            placeHolder: 'کد ملی خود را وارد کنید',
            type: 'number',
            name: 'nationalCode'
        },
        // {
        //     label:"شرح حال بیمار",
        //     value:illness,
        //     setvalue: setIllness,
        //     placeHolder:"شرح حال بیمار را وارد کنید",
        //     type:"text",
        //     name:"illness"
        // }
    ]


    // data for comments
    const comment = [
        {
            username: 'نام کاربری',
            date: '1403/02/16',
            comment: "فکر نکنم",
            rate: 2
        },
        {
            username: 'نام کاربری',
            date: '1403/02/16',
            comment: 'این پزشک را پیشنهاد میکنم',
            rate: 4
        },
        {
            username: 'نام کاربری',
            date: '1403/02/16',
            comment: 'این پزشک را پیشنهاد میکنم',
            rate: 5
        },
        {
            username: 'نام کاربری',
            date: '1403/02/16',
            comment: 'این پزشک را پیشنهاد میکنم',
            rate: 3
        },
        {
            username: 'نام کاربری',
            date: '1403/02/16',
            comment: 'این پزشک را پیشنهاد میکنم',
            rate: 5
        },
    ]
    // style for date input 
    const dateinputstyle ={
        height: '60px',
        borderRadius: '8px',
        width: '100%',  
        border:"1px solid gray",
        fontSize: '16px',
        '& input': {
        fontSize: "15px",
        fontWeight: 500,
        },

        '& fieldset': {

        height: { xs: '55px', mdd: '60px', md: '62px' },
        paddingLeft: (theme) => theme.spacing(1),
        fontSize: { xs: '14.22px', sm: '16px', md: '20px' },
        borderRadius: { xs: '5px', sm: '8px' },
        border: { xs: `1px solid #595959`, md: `1px solid #595959` },
    },

    '&:focusWithin fieldset, &:focusVisible fieldset': {
        border: { xs: `1px solid #545454!important`, md: `1px solid #545454!important` },
        borderRadius: { xs: '5px', sm: '8px' },

    },
}

    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                minHeight: '1000px',
                boxSizing: 'border-box',
                paddingX: { xs: '10px', sm: '30px', md: '50px', lg: '60px', xl: '80px' },
                paddingTop: { xs: '20px', sm: '30px', md: '40px', lg: '50px', xl: '64px' },
            }}
        >

            {/* /////// doctor profile field //////// */}


            <Typography
                sx={{
                    color: `${c144278}`,
                    fontSize: { xs: '18px', sm: '20px', md: '22px', lg: '24px' },
                    fontFamily: 'ykan',
                    fontWeight: 400,
                    letterSpacing: '0.2px',
                    lineHeight: '22px',
                    whiteSpace: 'nowrap',
                }}
            >
                نوبت‌دهی اینترنتی مطب دکتر {doctor.first_name}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: '40px'
                }}
            >
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%', lg: '45%' },
                        boxSizing: 'border-box'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '16px',
                            alignItems: 'center',
                            mt: '45px',
                            mb: '20px'
                        }}
                    >
                        <img src={doctor.image} alt="" style={{
                            width:"100px",
                            height:"100px",
                            borderRadius:"50%",
                            border:"1px solid rgb(33,28,190)"
                        }} />
                        <Box>
                            <Typography
                                sx={{
                                    color: `${c144278}`,
                                    fontSize: { xs: '14.22px', sm: '16px', md: '18px', lg: '20px' },
                                    fontFamily: 'ykan',
                                    fontWeight: 700,
                                    letterSpacing: '0.2px',
                                    lineHeight: '24px',
                                    whiteSpace: 'nowrap',
                                }}
                            >دکتر  {doctor.name}</Typography>
                            <Typography
                                sx={{
                                    color: `${c217CE6}`,
                                    fontSize: { xs: '13px', sm: '14px', md: '14.22px', lg: '16px' },
                                    fontFamily: 'ykan',
                                    fontWeight: 500,
                                    letterSpacing: '0.2px',
                                    lineHeight: '24px',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                               {doctor.speciality}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography
                        sx={{
                            width: { xs: '100%', md: '80%' },
                            color: `${c5f5f5f}`,
                            fontSize: { xs: '13px', sm: '14px', md: '14.22px', lg: '16px' },
                            fontFamily: 'ykan',
                            fontWeight: 400,
                            letterSpacing: '0.2px',
                            lineHeight: '24px',
                        }}
                    >
                        <b style={{color:`${c5f5f5f}`,textShadow:"none"}}>خدمات:</b> {doctor.description}
                    </Typography>
                    <Box
                        sx={{
                            mt: '20px',
                            mb: '8px',
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                        }}
                    >

                        <img src={Phoneicon} alt="" style={{width:"25px"}} />
                        <Typography
                            sx={{
                                direction: 'ltr',
                                color: `${c8c8c8c}`,
                                fontSize: { xs: '12px', sm: '12.64px', md: '14px', lg: '14px' },
                                fontFamily: 'ykan',
                                fontWeight: 400,
                                letterSpacing: '0.2px',
                                lineHeight: '24px',
                                textAlign:"right"
                            }}
                            >{doctor.docphonenumber}
                        </Typography>


                    </Box>

                    <Box
                        sx={{
                            mt: '20px',
                            mb: '8px',
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                        }}
                    >
                        
                        <img src={lociconblack} alt="" style={{width:"25px"}} /> 
                        <Typography
                            sx={{
                                color: `${c8c8c8c}`,
                                fontSize: { xs: '12px', sm: '12.64px', md: '14px', lg: '14px' },
                                fontFamily: 'ykan',
                                fontWeight: 400,
                                letterSpacing: '0.2px',
                                lineHeight: '24px',
                                display:"flex"
                            }}
                        >

                        {doctor.loc}                            
                        </Typography>


                    </Box>
                    <Box sx={{
                        display: 'flex',
                        color: `${c8c8c8c}`,
                        fontSize: '12px',
                        fontFamily: 'ykan',
                        fontWeight: 400,
                        letterSpacing: '0.2px',
                        alignItems: 'center',
                        gap: '8px',
                        lineHeight: '22px',
                        marginTop: '8px'
                        
                    }}>

                        <Rating value={3} readOnly />
                        
                        1099
                        نفر
                    
                    </Box>


                    {/* //////// comment section //////// */}

                    <Box>
                        <Typography
                            sx={{
                                marginTop: '20px',
                                color: `${c4c4c4c}`,
                                fontSize: { xs: '13px', sm: '14px', md: '14.22px', lg: '16px' },
                                fontFamily: 'ykan',
                                fontWeight: 700,
                                letterSpacing: '0.2px',
                                lineHeight: '24px',
                                marginBottom: '10px'
                            }}
                        >
                            نظــرات
                        </Typography>
                        <Box
                            sx={{
                                maxHeight: '250px',
                                overflow: 'auto',
                                direction: 'ltr',
                                paddingRight: '10px',
                                '&::-webkit-scrollbar': {
                                    width: '0.3em',
                                    borderRadius: '18px',
                                    zIndex: 100,
                                },
                                '&::-webkit-scrollbar-track': {
                                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                    overflow: 'hidden',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(0,0,0,.1)',
                                    borderRadius: '10px',
                                },
                            }}
                        >

                            {
                                comments.map((item, index) => {
                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                marginTop: '20px',
                                                direction: 'rtl',
                                                color:"black"
                                            }}
                                        >

                                            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between', width: '100%', }}>
                                                <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center',  }}>
                                                    <img src={commenticon} alt="" style={{width:"20px",height:"20px"}} />
                                                    <Typography
                                                        sx={{
                                                            color: `${c515151}`,
                                                            fontSize: { xs: '12px', sm: '12.64px', md: '14px', lg: '14px' },
                                                            fontFamily: 'ykan',
                                                            fontWeight: 400,
                                                            letterSpacing: '0.2px',
                                                            lineHeight: '20px',
                                                            width:"100%"
                                                        }}
                                                    >

                                                        {item.name}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            color: `${c868686}`,
                                                            fontSize: { xs: '8', sm: '9px', md: '9px', lg: '10px' },
                                                            fontFamily: 'ykan',
                                                            fontWeight: 400,
                                                            letterSpacing: '0.2px',
                                                            lineHeight: '20px',
                                                        }}
                                                    >
                                                        {item.year}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Rating defaultValue={item.id} readOnly />
                                                </Box>
                                            </Box>
                                            <Typography
                                                sx={{
                                                    color: `${c1f1f1f}`,
                                                    fontSize: { xs: '16px', sm: '18px', md: '18px', lg: '20px', xl: '22px' },
                                                    fontFamily: 'ykan',
                                                    fontWeight: 400,
                                                    letterSpacing: '0.2px',
                                                    lineHeight: '24px',
                                                    marginTop: '5px',
                                                    
                                                }}
                                            >
                                                {
                                                    item.color
                                                }
                                            </Typography>
                                        </Box>
                                    )
                                })
                            }
                        </Box>

                    </Box>

                    <Grid2 container sx={{justifyContent:"space-between",alignItems:"center", marginRight:"10px"}}>
                        <Typography sx={{
                           marginTop: '20px',
                           color: `${c4c4c4c}`,
                           fontSize: { xs: '13px', sm: '14px', md: '14.22px', lg: '16px' },
                           fontFamily: 'ykan',
                           fontWeight: 700,
                           letterSpacing: '0.2px',
                           lineHeight: '24px',
                           marginBottom: '10px',
                           width:"fit-content"
                        }}>ثبت نظر</Typography>
                        <Rating dir='ltr' onChange={(e) => setAddedcomment({rate : e.target.value})}></Rating>
                        <TextField placeholder={"نظر خود را اینجا به اشتراک بگذارید"} sx={{
                            marginY:"10px",
                            width:"100%",
                            borderRadius: '8px',
                            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                display: "none",
                            },
                            "& input[type=number]":{
                                    MozAppearance: "textfield",
                            },
                            "& input": {
                                borderRadius: '8px',
                                fontFamily: 'ykan',
                                padding: '0!important',
                                height: '38px',
                                paddingX: '10px!important',
                                paddingBottom: '5px!important',
                            },
                            "& input::placeHolder": {
                                fontFamily: 'ykan!important',
                                fontSize: '14px!important',
                            },    
                            "& fieldset": {
                                borderRadius: '8px',
                                fontFamily: 'ykan',
                                height: '46px',
                                boxSizing: 'border-box'
                            },
                        }}
                        onChange={(e) => setAddedcomment({body: e.target.value})}>
                        </TextField>
                        
                        
                        
                        <Button sx={{
                            color:"azure",
                            width:"100%",
                            backgroundColor:"#217CE6"
                        }}
                       onSubmit={addcommentHandler}>ثبت نظر</Button>
                        
                    </Grid2>

                </Box>


                {/* //////// appointment section //////// */}


                <Box
                    sx={{
                        width: "50%",
                        boxSizing: 'border-box',
                        padding: '50px',
                        height:'fit-content',
                        border: '1px solid #D4E8FB',
                        borderRadius: '16px',
                        marginTop:'2rem',
                        // bgcolor:"rgba(75, 174, 239,0.1)"
                    }}>
                    <Typography
                        sx={{
                            color: `${c4c4c4c}`,
                            fontSize: "24px",
                            fontFamily: 'ykan',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            lineHeight: '22px',
                            whiteSpace: 'nowrap',
                            textAlign: 'center',
                            marginBottom: '12px'
                        }}
                    >
                        فرم نوبت گیری
                    </Typography>
                    <Typography
                        sx={{
                            color: `${c3771C8}`,
                            fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '22px' },
                            fontFamily: 'ykan',
                            fontWeight: 400,
                            letterSpacing: '0.2px',
                            lineHeight: '22px',
                            whiteSpace: 'nowrap',
                            textAlign: 'center'
                        }}
                    >
                        جهت دریافت نوبت اطلاعات زیر را تکمیل نمایید.
                    </Typography>
                    <Box
                        sx={{
                            marginTop: '50px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent:"space-around",
                            }}
                        >

                            {
                                inputs.map((item, index) => {
                                    return (
                                        <Box key={index}>
                                            <Typography
                                                sx={{
                                                    color: `${c4c4c4c}`,
                                                    fontSize: "16px",
                                                    fontFamily: 'ykan',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.2px',
                                                    lineHeight: '22px',
                                                    marginY: '15px'
                                                }}
                                            >{item.label}</Typography>
                                            <TextField
                                                value={item.value}
                                                name={item.name}
                                                placeholder={item.placeHolder}
                                                onChange={(event) => item.setValue(event.target.value)}
                                                type={item.type}
                                                sx={{
                                                    borderRadius: '8px',
                                                    direction: `${item.name === 'phoneNumber' ? 'ltr' : 'rtl'}`,
                                                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                                        display: "none",
                                                    },
                                                    "& input[type=number]": {
                                                        MozAppearance: "textfield",
                                                    },
                                                    "& input": {
                                                        borderRadius: '8px',
                                                        fontFamily: 'ykan',
                                                        padding: '0!important',
                                                        height: '38px',
                                                        paddingX: '10px!important',
                                                        paddingBottom: '5px!important',
                                                    },
                                                    "& input::placeHolder": {
                                                        fontFamily: 'ykan!important',
                                                        fontSize: '14px!important',
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: '8px',
                                                        fontFamily: 'ykan',
                                                        height: '46px',
                                                        boxSizing: 'border-box'

                                                    },

                                                }}
                                            />
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: { xs: 'start', md: 'center' },
                            marginTop: '32px',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent:"space-around" }}>
                            <Box sx={{display:'inline-flex', flexDirection:"column"}}>
                                <Typography
                                    sx={{
                                        color: `${c4c4c4c}`,
                                        fontSize: "16px",
                                        fontFamily: 'ykan',
                                        fontWeight: 700,
                                        letterSpacing: '0.2px',
                                        lineHeight: '22px',
                                        marginBottom: '8px'
                                    }}
                                >تاریخ  *</Typography>
                                <Box>


                                <input  type="date" style={dateinputstyle} value={dateValue} required></input>

                                </Box>
                            </Box>
                            
                                <Box sx={{display:"flex", flexDirection:"column"}}>

                                    <Typography sx={{
                                        color: `${c4c4c4c}`,
                                        fontSize: { xs: '12px', sm: '14px', md: '15px', lg: '17px' },
                                        fontFamily: 'ykan',
                                        fontWeight: 700,
                                        letterSpacing: '0.2px',
                                        lineHeight: '22px',
                                        marginBottom: '8px'
                                    }}>
                                        ساعت * 
                                    </Typography>
                                    <input type="time" required style={dateinputstyle}></input>
                                </Box>

                                <Box sx={{
                                    display:"inline-flex",
                                    flexDirection:"column"}}>

                                <Typography
                                    sx={{
                                        color: `${c4c4c4c}`,
                                        fontSize: { xs: '12px', sm: '14px', md: '15px', lg: '17px' },
                                        fontFamily: 'ykan',
                                        fontWeight: 700,
                                        letterSpacing: '0.2px',
                                        lineHeight: '22px',
                                        marginBottom: '8px'
                                    }}
                                >جنسیت: </Typography>
                                
                                <Select sx={{
                                    color:`${c4c4c4c}`, backgroundClip:`${c1f1f1f}`,
                                    minWidth:"80px"}}
                                    onChange={setSex}
                                    >
                                    <MenuItem value="خانم" sx={{color: `${c4c4c4c}`}}>
                                                    خانم
                                        </MenuItem>
                                        <MenuItem value="آقا" sx={{color: `${c4c4c4c}`}}>
                                                    آقا
                                        </MenuItem>
                                </Select>
                            
                            </Box>
                        </Box>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop:'44px',
                                width:'100%',}}>

                                <Button
                                    sx={{
                                        width:'90%',
                                        textTransform: 'none',
                                        color: '#fff',
                                        backgroundColor: '#217CE6',
                                        height:'46px',
                                        fontFamily:'ykan',
                                        fontSize: { xs: '14px', md: '14.22px', lg: '16px' },
                                        ":hover":{
                                            Color:`${c144278}`,
                                        }
                                    }}
                                    onClick={appointmentbuttonHandler}
                                >
                                    ثبت اطلاعات
                                </Button>
                            </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Profile