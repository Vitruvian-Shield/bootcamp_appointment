import { Box, Button, Typography, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import locicon from '../../assets/images/locicon.svg';
import locationicon from '../../assets/images/locationicon.svg';
import reservationIcon from '../../assets/images/rezervicon.svg';
import classNames from './Doctors.module.css';
import ReactPaginate from 'react-paginate';
import Rating from '@mui/material/Rating';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import apiRequest from '../apiRequest';

const Doctors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const c217CE6 = '#217CE6';
  const c144278 = '#144278';
  const cD4E8FB = '#D4E8FB';
  const cE8F4FF = '#E8F4FF';
  const c8c8c8c = '#8c8c8c';

  // State to store city and provider data
  const [city, setCity] = useState("تهران");
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const storedCity = localStorage.getItem('city');
  
  const [run, setRun] = useState(true);
  let num = 0;
  if (run) {
    num += 1;
  }
  
  useEffect(() => {
    setRun(false);
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/userLogin');
      return;
    }

    if (storedCity) {
      setCity(storedCity);
    }

    // Correct way to extract URL parameters
    const urlParams = new URLSearchParams(location.search);
    const speciality_ = urlParams.get('sp');

    const fetchProviders = async () => {
      setLoading(true);

      const cityname = localStorage.getItem("city");

      try {
        const response = await apiRequest({
          method: 'GET',
          url: 'http://localhost:8000/api/medicine/provider/',
          params: {
            location: cityname,
            page: currentPage + 1,
            speciality: speciality_
          }
        });
        if (response && response.data) {
          setProviders(response.data.results);
          setPageCount(Math.ceil(response.data.count / 8)); // Assuming 8 items per page
        }
      } catch (err) {
        setError('Failed to fetch providers');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [location.search, currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  

  return (
    <Box
      sx={{
        minHeight: { xs: '680px', xl: '800px' },
        background: '#fff',
        px: { xs: '20px', sm: '40px', md: '50px', lg: '72px' },
        pt: { xs: '10px', sm: '20px', md: '30px', lg: '48px' },
        boxSizing: 'border-box'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '24px'
        }}
      >
        <Box
          sx={{
            background: `${c217CE6}`,
            height: '44px',
            width: '143px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '8px',
            justifyContent: 'center',
          }}
        >
          <img src={locicon} alt="" />
          <Typography
            sx={{
              fontFamily: 'ykan',
              fontSize: '16px',
              fontWeight: 700
            }}
          >
            {city}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: 'ykan',
            fontSize: '24px',
            fontWeight: 400,
            color: `${c144278}`,
            letterSpacing: '0.2px',
          }}
        >
          پزشک مورد نظر خود را انتخاب کنید
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '660px'
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1,1fr)', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(4,1fr)' },
            mt: '40px',
            rowGap: '16px',
            columnGap: '16px',
          }}
        >
          {providers.map((provider, index) => (
            <Box
              key={index}
              sx={{
                p: '24px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.08)',
                borderRadius: '16px',
                backgroundColor: `${cE8F4FF}`,
                border: `1px solid ${cD4E8FB}`
              }}
            >
              <Typography
                sx={{
                  color: `${c144278}`,
                  fontSize: '18px',
                  fontWeight: 700,
                  fontFamily: 'ykan',
                  letterSpacing: '0.2px',
                  mt: '16px',
                }}
              >
               دکتر {provider.user.first_name}  {provider.user.last_name}
              </Typography>
              <Typography
                sx={{
                  color: `${c217CE6}`,
                  fontSize: '16px',
                  fontFamily: 'ykan',
                  fontWeight: 400,
                  letterSpacing: '0.2px',
                  lineHeight: '24px',
                  mt: '4px'
                }}
              >
                {provider.speciality}
              </Typography>
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
                mt: '8px'
              }}>
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
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: '16px',
                  gap: '8px',
                }}
              >
                <img src={locationicon} alt="" />
                <Typography
                  sx={{
                    color: `${c8c8c8c}`,
                    fontSize: '12px',
                    fontFamily: 'ykan',
                    fontWeight: 400,
                    letterSpacing: '0.2px',
                    lineHeight: '24px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {provider.location.name}, {provider.location.city}
                </Typography>
              </Box>
              <Button
                onClick={() => navigate(`/doctors/reservation/${provider.id}`)}
                sx={{
                  textTransform: 'none',
                  backgroundColor: `${c217CE6}`,
                  fontFamily: 'ykan',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#fff',
                  width: '100%',
                  mt: '24px'
                }}
              >
                رزرو نوبت
                <img src={reservationIcon} alt="" />
              </Button>
            </Box>
          ))}
        </Box>
        <ReactPaginate
          forcePage={currentPage}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          previousLabel={"<"}
          nextLabel={" >"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={classNames.containerPaginatee}
          pageLinkClassName={classNames.pageLinkk}
          pageClassName={classNames.page}
          nextClassName={classNames.next}
          previousClassName={classNames.previous}
          previousLinkClassName={classNames.previousLinkk}
          activeLinkClassName={classNames.activePagee}
          nextLinkClassName={classNames.nextLinkk}
          disabledClassName={classNames.disabledPagee}
          activeClassName={classNames.activeClassnamee}
        />
      </Box>
    </Box>
  )
}

export default Doctors;
