import { Box, Typography, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Specialty = () => {
    const c4c4c4c = '#4c4c4c';
    const cE8F2FC = '#E8F2FC';
    const c144278 = '#144278';

    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const token = localStorage.getItem("access");
                if (!token) {
                    navigate("/userLogin");
                    return;
                }

                const response = await axios.get('http://localhost:8000/api/medicine/speciality/list/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSpecialties(response.data.results);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch specialties.");
                setLoading(false);
            }
        };

        fetchSpecialties();
    }, [navigate]);

    const handleSpecialtyClick = (specialty) => {
        // window.location.href=`/doctors?sp=${encodeURIComponent(specialty)}`
        navigate(`/doctors?sp=${encodeURIComponent(specialty)}`)
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#fff',
                flexDirection: 'column',
                pt: '48px',
                px: '20px'
            }}
        >
            <Typography
                sx={{
                    textAlign: 'center',
                    color: `${c4c4c4c}`,
                    fontFamily: 'ykan',
                    fontWeight: 500,
                    letterSpacing: '0.2px',
                    fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '22px' },
                }}
            >
                تخصص مدنظر خود را انتخاب کنید تا پزشکان مرتبط را مشاهده نمایید
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(1,1fr)', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' },
                    mt: '40px',
                    rowGap: '16px',
                    columnGap: '16px',
                }}
            >
                {specialties.map((item, index) => (
                    <Box
                        key={index}
                        onClick={() => handleSpecialtyClick(item.speciality)}
                        sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            background: `${cE8F2FC}`,
                            height: '56px',
                            px: '24px',
                            width: { xs: '316px', md: '300px', lg: '316px' },
                            borderRadius: '8px',
                            ":hover": {
                                transform: 'scale(0.99)'
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                color: `${c144278}`,
                                fontFamily: 'ykan',
                                fontWeight: 400,
                                letterSpacing: '0.2px',
                                lineHeight: '22px',
                                fontSize: { xs: '13px', sm: '14.22px', md: '16px', lg: '18px' },
                            }}
                        >
                            {item.speciality}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Specialty;
