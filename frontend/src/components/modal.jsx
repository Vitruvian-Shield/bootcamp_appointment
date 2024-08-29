import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import locationIcon from '../assets/images/lociconblack.svg'
import { useNavigate } from 'react-router-dom';

export default function BasicModal({ open, handleOpen, handleClose, data = [] }) {


  const navigate=useNavigate()
  const cffffff = '#ffffff'
  const c0E0E0E = '#0E0E0E'
  const c4C4C4C = '#4C4C4C'
  const cE8F2FC = '#E8F2FC'
  const c1F1F1F = '#1F1F1F'
  const c8C8C8C = '#8C8C8C'

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '320px', sm: '556px', md: '481px' },
    bgcolor: `${cE8F2FC}`,
    borderRadius: '8px',
    p: '24px',
    boxSizing: 'border-box',
    display: 'flex',
    maxHeight: '592px',
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow:' 0px 4px 15px 0px rgba(0, 0, 0, 0.32)'
  };

  const [search, setSearch] = React.useState()

  const filterData = data.filter((item, index) => item.city.toLowerCase().includes(search))

  return (
    <Box>
      <Button onClick={handleOpen}></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ backdropFilter: "blur(3px)" }}
      >
        <Box sx={style}>
          <Typography
            sx={{
              color: `${c0E0E0E}`,
              fontFamily: 'ykan',
              fontWeight: 700,
              fontSize: { xs: '14.22px', sm: '16px', md: '18px', lg: '20px' },
              lineHeight: '22px',

            }}
          >انتخاب شهر</Typography>
          <Typography
            sx={{
              color: `${c4C4C4C}`,
              fontFamily: 'ykan',
              fontWeight: 400,
              fontSize: { xs: '12.64px', sm: '14px', md: '14.22px', lg: '16px' },
              lineHeight: '22px',
              mt: '8px',
              mb: '25px',
            }}
          >با انتخاب شهر، اسامی متخصصان مربوطه را مشاهده نمایید.</Typography>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='شهر مورد نظر را جستجو کنید'
            sx={{
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
            }}
            
          />
          <Box
            sx={{
              maxHeight: '420px',
              boxSizing: 'border-box',
              direction: 'ltr',
              mt: '20px',
              overflow: 'auto',
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
            {filterData.map((item, index) => {
              return (
                <Box
                  key={index}
                  onClick={()=>{
                    setSearch(item.city)
                    navigate('/doctors')
                  }}
                  sx={{
                    direction: 'rtl',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    px: '16px',
                    py: '10px',
                    cursor:'pointer'
                  }}
                >
                  <img src={locationIcon} alt="" />
                  <Typography
                    sx={{
                      color: `${c1F1F1F}`,
                      fontFamily: 'ykan',
                      fontWeight: 400,
                      fontSize: { xs: '12.64px', sm: '14px', md: '14.22px', lg: '16px' },
                      lineHeight: '22px',
                    }}
                  >
                    {item.city}
                  </Typography>
                  <Typography
                    sx={{
                      color: `${c8C8C8C}`,
                      fontFamily: 'ykan',
                      fontWeight: 400,
                      fontSize: { xs: '12.64px', sm: '14px', md: '14.22px', lg: '16px' },
                      lineHeight: '22px',
                    }}
                  >
                    / {item.province}
                  </Typography>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}