import { Box, Container, createTheme, ThemeProvider } from '@mui/material'
import { Routes, Route, Outlet } from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Content from './components/content/Content';
import Login from './components/login/Login';
import Specialty from './components/specialty/Specialty';
import Doctors from './components/doctors/Doctors';
import Reservation from './components/reservation/Reservation';
import SignUp from './components/signin/Singin';
import Profile from './components/prfile/Profile';
import MyAppointment from './components/appointment/MyAppointment'
function App() {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        xss: 400,
        sm: 760,
        md: 1100,
        lg: 1200,
        xl: 2200,
      },
    },
  });
  const Dashboard = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    )

  }
  return (
    <ThemeProvider theme={theme}>

      <Container disableGutters maxWidth='xl'>

        <Box>
          <Routes>
            <Route
              path='/'
              element={<Dashboard />}
              children={
                <Route path='/' element={<Content />} />
              }
            />
            <Route
              element={<Dashboard />}
              children={
                <Route path='/doctorsLogin' element={<Login />} />
              }
            />
            <Route
              element={<Dashboard />}
              children={
                <Route path='/userSignin' element={<SignUp />} />
              }
            />
            <Route
              element={<Dashboard />}
              children={
                <Route path='/userLogin' element={<Login />} />
              }
            />
            <Route
              element={<Dashboard />}
              children={
                <Route path='/userProfile' element={<Profile />} />
              }
            />
            <Route
              element={<Dashboard />}
              children={
                <Route path='/ourSpecialty' element={<Specialty />} />
              }
            />
            <Route
              element={<Dashboard />}
              children={
                <Route path='/doctors' element={<Doctors />} />
              }
            />
            <Route
              element={<Dashboard />}
              children={
                <Route path='/doctors/reservation/:id' element={<Reservation />} />
              }
            />
            <Route
              element={<Dashboard />}
              children={
                <Route path='/appointment/mine' element={<MyAppointment />} />
              }
            />

          </Routes>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
