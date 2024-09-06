import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import bgcontent from '../../assets/images/bgcontent.svg'
import locicon from '../../assets/images/locicon.svg'
import dataCities from '../../helper/cities_list.json'
import BasicModal from '../modal/modal'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'

const Content = () => {
  const navigate = useNavigate()
  ///////colors
  const cffffff = '#fff'
  const cf4f4f4 = '#f4f4f4'
  const c217CE6 = '#217CE6'

  ///////// variables
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false)
  const [search, setSearch] = useState("")
  const doctorSearch = () => {
    navigate(`/doctors?sp=${search}`)
  }
  





  return (
    <Box
      sx={{
        pt: { xs: '24px', md: '124px' },
        background: `linear-gradient(180deg, rgba(31, 31, 31, 0.72) 0%, rgba(31, 31, 31, 0.18) 12.5%), url(${bgcontent}) lightgray 50% / cover no-repeat`,

        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: { xs: '680px', xl: '800px' },
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        pr: { xs: '10px', sm: '40px', md: '80px', lg: '100px', xl: '119px' },
        position: 'relative',

      }}
    >

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(270deg, rgba(12, 45, 84, 0.80) 0%, rgba(31, 31, 31, 0.16) 100%)',
          zIndex: 0
        }}
      ></Box>
      <Box
        sx={{
          zIndex: 1,
          maxWidth: '500px'

        }}
      >
        <Box>
          <Typography
            sx={{
              textShadow: '0px 2px 0px rgba(0, 0, 0, 0.10)',
              color: `${cffffff}`,
              fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '22px', xl: '24px' },
              lineHeight: '22px',
              fontFamily: 'ykan',
              letterSpacing: '0.2px',
              whiteSpace: 'nowrap',
              fontWeight: 700,
              mb: '20px',
            }}
          >
            به سامانه نوبت‌دهی آنلاین ویترووین شیلد خوش آمدید!
          </Typography>
          <Typography
            sx={{
              // textShadow: '0px 2px 0px rgba(0, 0, 0, 0.10)',
              color: `${cf4f4f4}`,
              fontSize: { xs: '12.64px', sm: '14px', md: '14.22px', lg: '16px', xl: '16px' },
              lineHeight: '22px',
              fontFamily: 'ykan',
              letterSpacing: '0.2px',
              mb: '20px',
              fontWeight: 400
            }}
          >
            با استفاده از سیستم نوبت‌دهی آنلاین ما، به راحتی می‌توانید پزشکان مورد نظر خود را پیدا کنید و نوبت بگیرید. فقط کافیست نام پزشک یا تخصص مورد نظر خود را در باکس جستجو وارد کنید و از خدمات باکیفیت ما بهره‌مند شوید.
          </Typography>
        </Box>
        <Box sx={{
          mt: '40px',
          display: 'flex',
          gap: '16px',
          flexDirection: { xs: 'column', sm: 'row' },
          background: 'rgba(31, 31, 31, 0.16)',
          py: '5px',
          borderRadius: '8px'
        }}>
          <Button
            onClick={handleOpen}
            sx={{
              display: 'flex',
              gap: '3px',
              alignItems: 'center',
              backgroundColor: `${c217CE6}`,
              borderRadius: '8px',
              color: `${cffffff}`,
              fontWeight: 700,
              fontSize: { xs: '14px', md: '16px' },
              lineHeight: '22px',
              fontFamily: 'ykan',
              px: '20px',
              py: '5px'
            }}
          >
            <img src={locicon} alt="" />
            انتخاب شهر
          </Button>
          <TextField
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            sx={{
              minWidth: { xs: '200px', sm: '300px', md: '300px' },
              "& input": {
                borderRadius: '8px',
                fontFamily: 'ykan',
                p: '15px 10px!important',
                height: '38px',
                color: '#fff'



              },
              "& input::placeHolder": {
                fontFamily: 'ykan!important',
                fontSize: '14px!important',
                color: '#fff'
              },
              '& fieldset': {
                border: 'none',


              },
              '&:focus-within fieldset, &:focus-visible fieldset': {
                border:'none',

              },
            }}
            placeholder='جستجوی نام پزشک، تخصص، بیماری، ...'
            InputProps={{
              startAdornment: (
                <IconButton
                  onClick={doctorSearch}
                  sx={{
                    color:'#fff'
                  }}>
                  <SearchIcon />
                </IconButton>

              )
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: `${open ? 'block' : 'none'}`
        }}
      >

        <BasicModal data={dataCities} open={open} handleClose={handleClose} handleOpen={handleOpen} />
      </Box>
    </Box>
  )
}

export default Content