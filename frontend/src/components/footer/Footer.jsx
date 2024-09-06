import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import telicon from '../../assets/images/telicon.svg'
import emailicon from '../../assets/images/emailicon.svg'
import telegramicon from '../../assets/images/telegramicon.svg'
import linkdinicon from '../../assets/images/linkdinicon.svg'
import instaicon from '../../assets/images/instaicon.svg'

const Footer = () => {
  const navigate = useNavigate()
  const cB9D9FF = '#B9D9FF'
  const cF5F5F5 = '#F5F5F5'
  const c0C2D54 = '#0C2D54'
  const items = [
    {
      id: 1,
      title: 'شهر های پر بازدید',
      cities: [

        'تهران',
        'کرج',
        'رشت',
        'بابل',
        'اصفهان',
      ]

    },
    {
      id: 2,
      title: 'تخصص های پرطرفدار',
      cities: [
        'دندانپزشکی',
        'چشم پزشکی',
        'روانشناس ',
        'متخصص اطفال',
        'متخصص مغز و اعصاب ',
      ]

    },
    {
      id: 3,
      title: 'لینک ها',
      cities: [
        {
          name: 'پزشکان',
          link: '/doctors'
        },
        {
          name: 'نوبت گیری',
          link: '/doctors'
        },
        {
          name: 'تخصص ها',
          link: '/ourSpecialty'
        },
      ]

    },
    {
      id: 4,
      title: 'با ما در ارتباط باشید',
      cities: [
        {
          title: '0911 222 33 44',
          icon: telicon
        },
        {
          title: 'VS_appointment@email.com',
          icon: emailicon
        }

      ]

    },
    {
      id: 5,
      title: 'شبکه های اجتماعی',
      cities: [
        instaicon,
        telegramicon,
        linkdinicon

      ]
    },

  ]

  return (
    <Box
      sx={{
        px: { xs: '20px', sm: '30px', md: '40px', lg: '100px', xl: '120px' },
        py: { xs: '10px', sm: '10px', md: '20px', lg: '38px', xl: '48px' },
        background: `${c0C2D54}`,
        minHeight: '260px',
        boxSizing: 'border-box'

      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {
          items.map((item, index) => {
            return (
              <Box key={index}>

                <Box>
                  <Typography
                    sx={{
                      color: `${cB9D9FF}`,
                      fontFamily: 'ykan',
                      fontSize: { xs: '12.64', sm: '13px', md: '14.22px', lg: '16px' },
                      fontWeight: 700,
                      lineHeight: '22px',
                      mb: '16px'
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Box sx={{
                    display:`${item.id===5?'flex':'block'}`,
                    gap:`${item.id===5?'8px':'0'}`
                  }}>
                    {
                      item.cities.map((item1, index1) => {
                        return (
                          <Box key={index1}>
                            {item.id === 1 || item.id === 2 ? (
                              <Typography
                                key={index1}
                                sx={{
                                  color: `${cF5F5F5}`,
                                  fontFamily: 'ykan',
                                  fontSize: { xs: '12', sm: '12.64px', md: '13px', lg: '14px' },
                                  fontWeight: 400,
                                  lineHeight: '22px',
                                }}
                              >
                                {item1}
                              </Typography>
                            ) :
                              item.id === 3 ?
                                (
                                  <Typography
                                    key={index1}
                                    onClick={() => navigate(`${item1.link}`)}
                                    sx={{
                                      cursor: 'pointer',
                                      color: `${cF5F5F5}`,
                                      fontFamily: 'ykan',
                                      fontSize: { xs: '12', sm: '12.64px', md: '13px', lg: '14px' },
                                      fontWeight: 400,
                                      lineHeight: '22px',
                                    }}
                                  >
                                    {item1.name}
                                  </Typography>
                                ) :
                                item.id === 4 ?
                                  (
                                      <Box
                                      sx={{
                                        display: 'flex',
                                        gap: '8px'
                                      }}
                                    >
                                      <Box>
                                        <img src={item1.icon} alt="" />
                                      </Box>
                                      <Typography
                                        key={index1}
                                        sx={{
                                          direction: 'ltr',
                                          cursor: 'pointer',
                                          color: `${cF5F5F5}`,
                                          fontFamily: 'ykan',
                                          fontSize: { xs: '12', sm: '12.64px', md: '13px', lg: '14px' },
                                          fontWeight: 400,
                                          lineHeight: '22px',
                                        }}
                                      >
                                        {item1.title}
                                      </Typography>
                                    </Box>
                                    
                                  ) : (
                                    <Box
                                      key={index1}
                                      sx={{
                                        display:'flex',
                                      }}
                                    >
                                      <Box sx={{width:'fit-content'}}>
                                        <img src={item1} alt="" />
                                      </Box>
                                    </Box>
                                  )
                            }
                          </Box>

                        )
                      })
                    }

                  </Box>

                </Box>

              </Box>
            )
          })
        }

      </Box>

    </Box>
  )
}

export default Footer