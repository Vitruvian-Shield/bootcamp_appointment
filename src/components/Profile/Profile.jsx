import { Box, Button, MenuItem, Rating, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Phoneicon from "../../assets/images/icons8-phone-50.png"
import lociconblack from '../../assets/images/icons8-location-50.png'
// import rate from '../../img/pngtree-four-star-rating-sign-png-image_8436650.png'
import drImg from '../../assets/images/41808433_l.jpg'
import commenticon from '../../assets/images/icons8-comment-50.png'

const Profile = () => {
    const { id } = useParams()

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

    // state with hook
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState()
    const [nationalCode, setNationalCode] = useState()
    const [dateValue, setDateValue] = useState()

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
    ]


    // data for comments
    const comments = [
        {
            username: 'نام کاربری',
            date: '1403/02/16',
            comment: "فکر نکنم",
            rate: 5
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
            rate: 5
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
            rate: 5
        },
    ]

    // style for date input 
    const dateinputstyle ={
        height: '60px',
        borderRadius: { xs: '5px', md: '8px' },
        width: '100%',
        fontSize: { xs: '14.22px', mdd: '16px', md: '20px', lg: '23px' },
        '& input': {
        fontSize: { xs: '14.22px' },
        fontWeight: 500,
        height: { xs: '20px', md: '30px' }
        },
        border:"1px solid gray",
        '& fieldset': {

        height: { xs: '55px', mdd: '60px', md: '62px' },
        paddingLeft: (theme) => theme.spacing(1),
        // color: 'red',
        fontSize: { xs: '14.22px', sm: '16px', md: '20px' },
        borderRadius: { xs: '5px', sm: '8px' },
        border: { xs: `1px solid #595959`, md: `1px solid #595959` },
    },

    '&:focus-within fieldset, &:focus-visible fieldset': {
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
                px: { xs: '10px', sm: '30px', md: '50px', lg: '60px', xl: '80px' },
                pt: { xs: '20px', sm: '30px', md: '40px', lg: '50px', xl: '64px' },

            }}
        >
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
                نوبت‌دهی اینترنتی مطب دکتر حاج محمد
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
                        <img src={drImg} alt="" style={{
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
                            >دکتر  حاج محمد</Typography>
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
                                تخصص کودکان و نوزادان
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
                        <b style={{color:`${c5f5f5f}`,textShadow:"none"}}>خدمات:</b>  درمان اختلالات رشد و کوتاهی قد، بلوغ رودرس و تاخیر بلوغ ، درمان دیابت نوع 1 و 2 به همراه آموزش مصرف انسولین های جدید ، کم کاری و پرکاری تیرویید، چاقی و لاغری و بیماریهای متابولیک ارثی، تغذیه و رژیم درمانی.
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
                        >0911 222 33 44 - 0912 111 34 56
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
                            
                            تهران، خیابان شریعتی، کوچه صدرا، پلاک 20، طبقه ی اول
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

                        {/* <img src={rate} alt='' style={{width:"25%"}} /> */}
                        <Rating sx={{backgroundColor:`${fcfc00}`}} readOnly defaultValue={4} />
                        1099
                        نفر
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                mt: '44px',
                                color: `${c4c4c4c}`,
                                fontSize: { xs: '13px', sm: '14px', md: '14.22px', lg: '16px' },
                                fontFamily: 'ykan',
                                fontWeight: 700,
                                letterSpacing: '0.2px',
                                lineHeight: '24px',
                                marginBottom: '20px'
                            }}
                        >
                            نظــرات
                        </Typography>
                        <Box
                            sx={{
                                maxHeight: '312px',
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
                                                marginTop: '24px',
                                                direction: 'rtl'
                                            }}
                                        >

                                            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between', width: '100%', }}>
                                                <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center',  }}>
                                                    <img src={commenticon} alt="" style={{width:"20px",height:"20px"}} />
                                                    <Typography
                                                        sx={{
                                                            color: `${c515151}`,
                                                            fontSize: { xs: '12px', sm: '12.64px', md: '14px', lg: '14px' },
                                                            fontFamily: 'ykan',
                                                            fontWeight: 400,
                                                            letterSpacing: '0.2px',
                                                            lineHeight: '24px',
                                                            width:"100%"
                                                        }}
                                                    >

                                                        {item.comment}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            color: `${c868686}`,
                                                            fontSize: { xs: '8', sm: '9px', md: '9px', lg: '10px' },
                                                            fontFamily: 'ykan',
                                                            fontWeight: 400,
                                                            letterSpacing: '0.2px',
                                                            lineHeight: '24px',
                                                        }}
                                                    >
                                                        {item.date}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Rating name="half-rating-read" defaultValue={item.rate} readOnly />
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
                                                    marginTop: '8px',
                                                    
                                                }}
                                            >
                                                {
                                                    item.comment
                                                }
                                            </Typography>
                                        </Box>
                                    )
                                })
                            }
                        </Box>

                    </Box>
                </Box>
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%', lg: '55%' },
                        boxSizing: 'border-box',
                        paddingX: { xs: '10px', sm: '20px', md: '25px', lg: '32px' },
                        paddingY: { xs: '18px', sm: '28px', md: '38px', lg: '48px' },
                        height:'fit-content',
                        border: '1px solid #D4E8FB',
                        borderRadius: '16px',
                        marginTop:'2rem',
                        // bgcolor:"rgba(75, 174, 239,0.1)"
                    }}>
                    <Typography
                        sx={{
                            color: `${c4c4c4c}`,
                            fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '22px' },
                            fontFamily: 'ykan',
                            fontWeight: 700,
                            letterSpacing: '0.2px',
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
                            marginTop: { xs: '20px', sm: '30px', md: '35px', lg: '40px', xl: '44px' },


                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: {xs:'40px',md:'20px',lg:'40px'}
                            }}
                        >

                            {
                                inputs.map((item, index) => {
                                    return (
                                        <Box
                                            key={index}
                                        >
                                            <Typography
                                                sx={{
                                                    color: `${c4c4c4c}`,
                                                    fontSize: { xs: '12.64px', sm: '14px', md: '14.22px', lg: '16px' },
                                                    fontFamily: 'ykan',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.2px',
                                                    lineHeight: '22px',
                                                    marginBottom: '8px'
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
                            gap: '40px',
                            alignItems: { xs: 'start', md: 'center' },
                            marginTop: '32px',
                            flexDirection: { xs: 'column', md: 'row' } }}>
                            <Box>
                                <Typography
                                    sx={{
                                        color: `${c4c4c4c}`,
                                        fontSize: { xs: '12.64px', sm: '14px', md: '14.22px', lg: '16px' },
                                        fontFamily: 'ykan',
                                        fontWeight: 700,
                                        letterSpacing: '0.2px',
                                        lineHeight: '22px',
                                        marginBottom: '8px'
                                    }}
                                >تاریخ  *</Typography>
                                <Box>


                                <input type="date" style={dateinputstyle}></input>

                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: {xs:'56px',md:'0px',lg:'10px',xl:'40px'}, alignItems: 'center' }}>
                                <Typography
                                    sx={{
                                        color: `${c4c4c4c}`,
                                        fontSize: { xs: '12.64px', sm: '14px', md: '14.22px', lg: '16px' },
                                        fontFamily: 'ykan',
                                        fontWeight: 700,
                                        letterSpacing: '0.2px',
                                        lineHeight: '22px',
                                        marginBottom: '8px'
                                    }}
                                >جنسیت: </Typography>
                                
                                <Select sx={{
                                    color:`${c4c4c4c}`, backgroundClip:`${c1f1f1f}`, marginRight:"-80%", width:"50%"
                                    }}
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
                                width:'100%',

                            }}>

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