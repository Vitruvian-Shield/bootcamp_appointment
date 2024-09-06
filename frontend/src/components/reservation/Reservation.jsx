import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Rating, TextField, Typography, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import drHashemiImg from '../../assets/images/drHashemiImg.svg'
import telicon from '../../assets/images/teleiconblack.svg'
import lociconblack from '../../assets/images/lociconblack.svg'
import commenticon from '../../assets/images/comenticon.svg'
import apiRequest from '../apiRequest'; 
import { useNavigate, useLocation } from 'react-router-dom'



/////import for date picker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios'
import { Description, Sync } from '@mui/icons-material'

const Reservation = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const location = useLocation()

    const c144278 = '#144278'
    const c217CE6 = '#217CE6'
    const c5f5f5f = '#5f5f5f'
    const c8c8c8c = '#8c8c8c'
    const c4c4c4c = '#4c4c4c'
    const c515151 = '#515151'
    const c868686 = '#868686'
    const c1f1f1f = '#1f1f1f'
    const c3771C8 = '#3771C8'

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState()
    const [nationalCode, setNationalCode] = useState()
    const [dateValue, setDateValue] = useState()
    const [serviceName, setServiceName] = useState("")
    const [serviceDescription, setServiceDescription] = useState("")
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [provider, setProvider] = useState([])

    const [address, setAddress] = useState("")
    const [fullname, setFullname] = useState("")
    const [speciality, setSpecialty] = useState("")
    const [services, setServices] = useState("")
    const [drphone, setDrphone] = useState("")
    const [rate_sum, setRateSum] = useState(0)
    const [rate_num, setRateNum] = useState(0)
    const [rate, setRate] = useState(0)

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    /////////////////////////inputs datas
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
        }, {
            label: 'بیماری',
            value: serviceName,
            setValue: setServiceName,
            placeHolder: 'بیماری تان را بصورت خلاصه بنویسید',
            type: 'text',
            name: 'serviceName'
        },
        {
            label: 'توضیحات',
            value: serviceDescription,
            setValue: setServiceDescription,
            placeHolder: 'توضیحات بیشتر',
            type: 'text',
            name: 'serviceName'
        }
    ]
    
  const addReserve = () => {
    const formattedDate = dayjs(dateValue).format('YYYY-MM-DD');

    const data = {
        patient_first_name: name,
        patient_last_name: lastName,
        patient_phone_number: phoneNumber,
        patient_national_id: nationalCode,
        patient_gender: sexValue,
        date: formattedDate,
        provider: id,
        service: {
            name: serviceName,
            description: serviceDescription
        }
    };

    console.log(data);

    const sendReserve = async () => {
        try {
            const response = await apiRequest({
                method: 'POST',
                url: "http://127.0.0.1:8000/api/appointment/reserve/",
                data: data
            });

            console.log(response.data);
            handleOpenModal(); 

        } catch (error) {
            console.error("An error occurred while making the reservation:", error);
            // Handle error: show an error message to the user or perform other actions
        }
    };

    sendReserve();
};


        
    const sendComment = async () => {
        try {
            const response = await apiRequest({
                method: 'POST',
                url: `http://127.0.0.1:8000/api/chat/comment/${id}/`,
                data: { "text": comment },
                params: {},
            });
            console.log(response)
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        }
        fetchCommentData();
    }
    
    
        const fetchCommentData = async () => {
           try {
            const response = await apiRequest({
                method: 'GET',
                url: `http://127.0.0.1:8000/api/chat/comment/${id}/`,
                data: {},
                params: {},
            });
            if (response && response.data) {
                setComments(response.data)
            }
          

        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        }

    
};


    const fetchProviderData = async () => {
    try {
       const response_ = await apiRequest({
                method: 'GET',
                url: `http://127.0.0.1:8000/api/medicine/provider/${id}/`,
            
       });
            console.log(response_)
            if (response_ && response_.data) {
                const providerData = response_.data; 

                setProvider(providerData);
                setAddress(providerData.location.address); 
                setDrphone(providerData.user.phone_number); 
                setFullname(`${providerData.user.first_name} ${providerData.user.last_name}`);
                setSpecialty(providerData.speciality); 
                setServices(""); 
                setRateSum(providerData.rate_sum);
                setRateNum(providerData.rate_num);
            }
            
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
        }
        


}

    
    const fetchData = async () => {
        fetchCommentData();
        fetchProviderData();

        
    };

    
    
    useEffect(() => {
    fetchData(); 
    
  }, [id, location.pathname]);

    const [sexValue, setSexValue] = React.useState('female');

    const handleChange = (event) => {
        setSexValue(event.target.value);
    };

    const [isModalOpenRate, setIsModalOpenRate] = useState(false);

  const handleOpenModalRate = () => {
    setIsModalOpenRate(true);
  };

  const handleCloseModalRate = () => {
    setIsModalOpenRate(false);
  };

  const handleSubmitRating = async () => {
        console.log(`Submitted Rating: ${rate}`);
      
        try {
        const response = await apiRequest({
          method: 'POST',
          url: `http://127.0.0.1:8000/api/chat/rate/`,
            data: {
                score: rate,
                provider: id
          },
          params: {},
        });
          if (response) {
              fetchProviderData();
              
          }
          

      } catch (error) {
        console.error("An error occurred while fetching data:", error);
        }
      
        setIsModalOpenRate(false); // Close the modal after submission
  };

    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                minHeight: '938px',
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
                نوبت‌دهی اینترنتی مطب دکتر {fullname}
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
                        <img src={drHashemiImg} alt="" />
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
                            >دکتر  {fullname}</Typography>
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
                            {speciality}
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
                        <b>خدمات:</b> {services}
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
                        <img src={telicon} alt="" />
                        <Typography
                            sx={{
                                direction: 'ltr',
                                color: `${c8c8c8c}`,
                                fontSize: { xs: '12px', sm: '12.64px', md: '14px', lg: '14px' },
                                fontFamily: 'ykan',
                                fontWeight: 400,
                                letterSpacing: '0.2px',
                                lineHeight: '24px',
                            }}
                        >{drphone}
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
                        <img src={lociconblack} alt="" />
                        <Typography
                            sx={{
                                direction: 'ltr',
                                color: `${c8c8c8c}`,
                                fontSize: { xs: '12px', sm: '12.64px', md: '14px', lg: '14px' },
                                fontFamily: 'ykan',
                                fontWeight: 400,
                                letterSpacing: '0.2px',
                                lineHeight: '24px',
                            }}
                        >
                            {address}
                        </Typography>


                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            color: '#c8c8c8',
                            fontSize: '12px',
                            fontFamily: 'ykan',
                            fontWeight: 400,
                            letterSpacing: '0.2px',
                            alignItems: 'center',
                            gap: '8px',
                            lineHeight: '22px',
                            mt: '8px'
                        }}
                        >
                        امتیاز
                {"    "}
                        {provider.rate_sum / provider.rate_num}
                <Rating
                            name="half-rating-read"
                            value={Math.floor(provider.rate_sum/provider.rate_num)}
                            readOnly
                        />
                        
                        {provider.rate_num}
                        نفر
                        <Button
                            onClick={handleOpenModalRate}
                        >
                            ثبت امتیاز
                        </Button>
                        
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
                                mb: '20px'
                            }}
                        >
                            نظــرات
                        </Typography>
                        <Box
                            sx={{
                                maxHeight: '312px',
                                overflow: 'auto',
                                direction: 'ltr',
                                pr: '10px',
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
                                                mt: '24px',
                                                direction: 'rtl'
                                            }}
                                        >

                                            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                    <img src={commenticon} alt="" />
                                                    <Typography
                                                        sx={{
                                                            color: `${c515151}`,
                                                            fontSize: { xs: '12px', sm: '12.64px', md: '14px', lg: '14px' },
                                                            fontFamily: 'ykan',
                                                            fontWeight: 400,
                                                            letterSpacing: '0.2px',
                                                            lineHeight: '24px',
                                                        }}
                                                    >

                                                        {item.user}
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
                                                {/* <Box>
                                                    <Rating name="half-rating-read" defaultValue={item.rate} readOnly />
                                                </Box> */}
                                            </Box>
                                            <Typography
                                                sx={{
                                                    color: `${c1f1f1f}`,
                                                    fontSize: { xs: '16px', sm: '18px', md: '18px', lg: '20px', xl: '22px' },
                                                    fontFamily: 'ykan',
                                                    fontWeight: 400,
                                                    letterSpacing: '0.2px',
                                                    lineHeight: '24px',
                                                    mt: '8px'
                                                }}
                                            >
                                                {
                                                    item.text
                                                }
                                            </Typography>
                                        </Box>
                                    )
                                })
                            }
                          
                        </Box>
                          <TextField
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder= 'نظر'
                            sx={{ width: '100%', mb: 2 }}
                            />
                            <Button
                                    onClick={sendComment}
                                    sx={{
                                        width:'50%',
                                        textTransform: 'none',
                                        color: '#fff',
                                        backgroundColor: '#217CE6',
                                        height:'46px',
                                        fontFamily:'ykan',
                                    fontSize: { xs: '14px', md: '14.22px', lg: '16px' },

                                    }}
                                >
                                   ارسال نظر
                                </Button>

                    </Box>
                </Box>
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%', lg: '55%' },
                        boxSizing: 'border-box',
                        px: { xs: '10px', sm: '20px', md: '25px', lg: '32px' },
                        py: { xs: '18px', sm: '28px', md: '38px', lg: '48px' },
                        height:'fit-content',
                        border: '1px solid #D4E8FB',
                        borderRadius: '16px',
                        mt:'2rem'
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
                            mb: '12px'
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
                            mt: { xs: '20px', sm: '30px', md: '35px', lg: '40px', xl: '44px' },


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
                                                    mb: '8px'
                                                }}
                                            >{item.label}</Typography>
                                            <TextField
                                                value={item.value}
                                                name={item.name}
                                                placeholder={item.placeHolder}
                                                onChange={(e) => item.setValue(e.target.value)}
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
                                                        p: '0!important',
                                                        height: '38px',
                                                        px: '10px!important',
                                                        pb: '5px!important',



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
                       
                        <Box sx={{ display: 'flex', gap: '40px', alignItems: { xs: 'start', md: 'center' }, mt: '32px', flexDirection: { xs: 'column', md: 'row' } }}>
                            <Box>
                                <Typography
                                    sx={{
                                        color: `${c4c4c4c}`,
                                        fontSize: { xs: '12.64px', sm: '14px', md: '14.22px', lg: '16px' },
                                        fontFamily: 'ykan',
                                        fontWeight: 700,
                                        letterSpacing: '0.2px',
                                        lineHeight: '22px',
                                        mb: '8px'
                                    }}
                                >تاریخ  *</Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >

                                    <DatePicker
                                        disableFuture={false} // Allows future dates to be selected
                                        maxDate={dayjs().add(1, 'year')} // Set the maximum date to one year from today
                                        sx={{
                                            height: '60px',
                                            borderRadius: { xs: '5px', md: '8px' },
                                            width: '100%',
                                            fontSize: { xs: '14.22px', mdd: '16px', md: '20px', lg: '23px' },

                                            '& input': {
                                                fontSize: { xs: '14.22px' },
                                                fontWeight: 500,
                                                height: { xs: '20px', md: '30px' }
                                            },
                                            '& fieldset': {

                                                height: { xs: '55px', mdd: '60px', md: '62px' },
                                                paddingLeft: (theme) => theme.spacing(1),
                                                color: 'red',
                                                fontSize: { xs: '14.22px', sm: '16px', md: '20px' },
                                                borderRadius: { xs: '5px', sm: '8px' },
                                                border: { xs: `1px solid #595959`, md: `1px solid #595959` },
                                            },

                                            '&:focus-within fieldset, &:focus-visible fieldset': {
                                                border: { xs: `1px solid #545454!important`, md: `1px solid #545454!important` },
                                                borderRadius: { xs: '5px', sm: '8px' },

                                            },
                                        }}
                                        inputFormat="E MMM dd yyyy HH:MM:SS O"
                                        value={dayjs(new Date(`${dateValue}`))}
                                        onChange={(e) => { setDateValue(e) }}


                                    />

                                </LocalizationProvider>
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
                                        mb: '8px'
                                    }}
                                >جنسیت: </Typography>
                                <FormControl
                                    sx={{
                                        display: 'flex'
                                    }}
                                >
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={sexValue}
                                        onChange={handleChange}
                                        row

                                    >
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio size='small' />}
                                            label={
                                                <Typography
                                                    sx={{
                                                        color: `${c4c4c4c}`,
                                                        fontSize: { xs: '12.64px', sm: '14px', md: '14.22px', lg: '16px' },
                                                        fontFamily: 'ykan',
                                                        fontWeight: 400,
                                                        letterSpacing: '0.2px',
                                                        lineHeight: '22px',
                                                    }}
                                                >
                                                    خانم
                                                </Typography>
                                            }
                                        />
                                        <FormControlLabel
                                            sx={{ mr: {xs:'3rem',md:'1rem',lg:'3rem'} }}
                                            value="male"
                                            control={<Radio size='small' />}
                                            label={
                                                <Typography
                                                    sx={{
                                                        color: `${c4c4c4c}`,
                                                        fontSize: { xs: '12.64px', sm: '14px', md: '14.22px', lg: '16px' },
                                                        fontFamily: 'ykan',
                                                        fontWeight: 400,
                                                        letterSpacing: '0.2px',
                                                        lineHeight: '22px',
                                                    }}
                                                >
                                                    آقا
                                                </Typography>
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt:'44px',
                                width:'100%',

                            }}>

                            <Button
                                    onClick={addReserve}
                                    sx={{
                                        width:'90%',
                                        textTransform: 'none',
                                        color: '#fff',
                                        backgroundColor: '#217CE6',
                                        height:'46px',
                                        fontFamily:'ykan',
                                    fontSize: { xs: '14px', md: '14.22px', lg: '16px' },

                                    }}
                                >
                                    ثبت اطلاعات
                                </Button>
                            </Box>
                    </Box>
                </Box>
            </Box>
            <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: '8px',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
            }}
            >
            <Typography id="modal-title" sx={{ color: "black" }} variant="h6" component="h2">
                    نوبت شما با موفقیت ثبت گردید.
                    </Typography>
            
            <Button
                onClick={handleCloseModal}
                sx={{
                mt: 2,
                background: `${c217CE6}`,
                color: '#fff',
                width: '100%',
                textTransform: 'none',
                fontFamily: 'ykan',
                fontWeight: 700,
                borderRadius: '8px'
                }}
            >
                تایید
            </Button>
            </Box>
            </Modal>
            {/* Modal for submitting the rating */}
            <Modal
                open={isModalOpenRate}
                onClose={handleCloseModalRate}
                aria-labelledby="rate-modal-title"
                aria-describedby="rate-modal-description"
            >
                <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'background.paper',
                    borderRadius: '8px',
                    boxShadow: 24,
                    p: 4,
                }}
                >
                <Typography sx={{color:"black"}} id="rate-modal-title" variant="h6" component="h2">
                        امتیاز خود را انتخاب کنید.
                    </Typography>
                    <Rating
                    dir="ltr"
                    name="submit-rating"
                    value={rate}
                    onChange={(event, newValue) => {
                    setRate(newValue);
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitRating}
                    sx={{ mt: 2 }}
                >
                    ثبت
                </Button>
                </Box>
            </Modal>
        </Box>
    )
}

export default Reservation