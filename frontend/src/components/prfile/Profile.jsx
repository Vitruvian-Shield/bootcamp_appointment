import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
  Modal,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import apiRequest from '../apiRequest';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    birth_date: '',
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);
  const [isProfileUpdatedModalOpen, setIsProfileUpdatedModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [showdata, setShowdata] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    birth_date: '',
  });

  const handleOpenProfileUpdatedModal = () => {
    setIsProfileUpdatedModalOpen(true);
  };

  const handleCloseProfileUpdatedModal = () => {
    setIsProfileUpdatedModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const fetchProfile = async () => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: 'http://127.0.0.1:8000/api/accounts/profile/',
      });

      if (response && response.data) {
        setShowdata(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const refresh = localStorage.getItem('refresh');
    const access = localStorage.getItem('access');

    if (!refresh || !access) {
      navigate('/');
    }

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

   const checkUsernameAvailability = () => {
    apiRequest({
      method: 'POST',
      url: `http://127.0.0.1:8000/api/accounts/usernameisavalable/${profile.username}/`,
    })
      .then((response) => {
        if (response.data.status === 'ok') {
          setErrors({ ...errors, username: null });
        }
      })
      .catch(() => {
        setErrors({ ...errors, username: 'Username is not available.' });
      });
  };
  const handleSubmit = async () => {
    const updatedProfile = Object.fromEntries(
      Object.entries(profile).filter(([key, value]) => value !== '')
    );

    try {
      const response = await apiRequest({
        method: 'PUT',
        url: 'http://127.0.0.1:8000/api/accounts/profile/',
        data: updatedProfile,
      });

      if (response && response.data) {
        setStatusMessage({ type: 'success', text: 'Profile updated successfully!' });
        setErrors({});
        setProfile({
          first_name: '',
          last_name: '',
          username: '',
          email: '',
          phone_number: '',
          birth_date: '',
        });
        fetchProfile();
        handleOpenProfileUpdatedModal();
      }
    } catch (error) {
      setErrors(response.data);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiRequest({
        method: 'DELETE',
        url: 'http://127.0.0.1:8000/api/accounts/profile/',
      });

      if (response) {
        setStatusMessage({ type: 'success', text: 'Profile deleted successfully!' });
        navigate('/');
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Error deleting profile.' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    navigate('/');
  };

  const confirmDelete = () => {
    handleDelete();
    handleCloseDeleteModal();
    localStorage.setItem("access", NULL)
    localStorage.setItem("refresh",NULL)
  };

  const confirmLogout = () => {
    handleLogout();
    handleCloseLogoutModal();
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        minHeight: '1020px',
        boxSizing: 'border-box',
        px: { xs: '10px', sm: '30px', md: '50px', lg: '60px', xl: '80px' },
        pt: { xs: '20px', sm: '30px', md: '40px', lg: '50px', xl: '64px' },
      }}
    >
      <Container maxWidth="sm">
        <Card variant="outlined" sx={{ mb: 4, p: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              اطلاعات پروفایل
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  نام کاربری:
                </Typography>
                <Typography variant="body1">{showdata.username}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  ایمیل:
                </Typography>
                <Typography variant="body1">{showdata.email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  نام:
                </Typography>
                <Typography variant="body1">{showdata.first_name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  نام خانوادگی:
                </Typography>
                <Typography variant="body1">{showdata.last_name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  تاریخ تولد:
                </Typography>
                <Typography variant="body1">{showdata.birth_date}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" color="textSecondary">
                  شماره تماس:
                </Typography>
                <Typography variant="body1">{showdata.phone_number}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box my={4}>
          <Typography variant="subtitle2" color="textSecondary">
            نیاز به پر کردن همه فیلد ها نیست.
                
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
                        فیلدی را که می خواهید تغییر داده وآپدیت کنید.                
          </Typography>
        
          {statusMessage && (
            <Alert severity={statusMessage.type}>{statusMessage.text}</Alert>
          )}

          <TextField
            fullWidth
            margin="normal"
            label="نام"
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
            error={!!errors.first_name}
            helperText={errors.first_name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="نام خانوادگی"
            name="last_name"
            value={profile.last_name}
            onChange={handleChange}
            error={!!errors.last_name}
            helperText={errors.last_name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="نام کاربری"
            name="username"
            value={profile.username}
            onChange={handleChange}
            onBlur={checkUsernameAvailability}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            fullWidth
            margin="normal"
            label="ایمیل"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            label="شماره تماس"
            name="phone_number"
            value={profile.phone_number}
            onChange={handleChange}
            error={!!errors.phone_number}
            helperText={errors.phone_number}
          />
          <TextField
            fullWidth
            margin="normal"
            label="تاریخ تولد"
            name="birth_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={profile.birth_date}
            onChange={handleChange}
            error={!!errors.birth_date}
            helperText={errors.birth_date}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2, mr: 2 }}
          >
            آپدیت اطلاعات
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleOpenDeleteModal}
            sx={{ mt: 2 }}
          >
            حذف اکانت
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleOpenLogoutModal}
            sx={{ mt: 2 }}
          >
            خروج اکانت
          </Button>
        </Box>

        {/* Profile Updated Modal */}
        <Modal
          open={isProfileUpdatedModalOpen}
          onClose={handleCloseProfileUpdatedModal}
          aria-labelledby="profile-updated-modal-title"
          aria-describedby="profile-updated-modal-description"
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
              gap: '16px',
            }}
          >
            <Typography id="profile-updated-modal-description" sx={{ mt: 2, color: 'black' }}>
              پروفایل شما با موفقیت آپدیت گردید
            </Typography>
            <Button
              onClick={handleCloseProfileUpdatedModal}
              sx={{
                mt: 2,
                backgroundColor: '#217CE6',
                color: '#fff',
                width: '100%',
                textTransform: 'none',
                fontFamily: 'ykan',
                fontWeight: 700,
                borderRadius: '8px',
              }}
            >
              تایید
            </Button>
          </Box>
        </Modal>

        {/* Delete Account Confirmation Modal */}
        <Modal
          open={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          aria-labelledby="delete-account-modal-title"
          aria-describedby="delete-account-modal-description"
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
              gap: '16px',
            }}
          >
            <Typography id="delete-account-modal-description" sx={{ mt: 2, color: 'black' }}>
              آیا مطمئن هستید که می‌خواهید اکانت خود را حذف کنید؟
            </Typography>
            <Button
              onClick={confirmDelete}
              sx={{
                mt: 2,
                backgroundColor: '#e53935',
                color: '#fff',
                width: '100%',
                textTransform: 'none',
                fontFamily: 'ykan',
                fontWeight: 700,
                borderRadius: '8px',
              }}
            >
              تایید
            </Button>
            <Button
              onClick={handleCloseDeleteModal}
              sx={{
                mt: 2,
                backgroundColor: '#c7c7c7',
                color: '#fff',
                width: '100%',
                textTransform: 'none',
                fontFamily: 'ykan',
                fontWeight: 700,
                borderRadius: '8px',
              }}
            >
              انصراف
            </Button>
          </Box>
        </Modal>

        {/* Logout Confirmation Modal */}
        <Modal
          open={isLogoutModalOpen}
          onClose={handleCloseLogoutModal}
          aria-labelledby="logout-modal-title"
          aria-describedby="logout-modal-description"
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
              gap: '16px',
            }}
          >
            <Typography id="logout-modal-description" sx={{ mt: 2, color: 'black' }}>
              آیا مطمئن هستید که می‌خواهید خارج شوید؟
            </Typography>
            <Button
              onClick={confirmLogout}
              sx={{
                mt: 2,
                backgroundColor: '#e53935',
                color: '#fff',
                width: '100%',
                textTransform: 'none',
                fontFamily: 'ykan',
                fontWeight: 700,
                borderRadius: '8px',
              }}
            >
              تایید
            </Button>
            <Button
              onClick={handleCloseLogoutModal}
              sx={{
                mt: 2,
                backgroundColor: '#c7c7c7',
                color: '#fff',
                width: '100%',
                textTransform: 'none',
                fontFamily: 'ykan',
                fontWeight: 700,
                borderRadius: '8px',
              }}
            >
              انصراف
            </Button>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default Profile;
