import React, { useState , setState, useEffect} from "react";
import { FaLocationDot } from "react-icons/fa6";
import younes from "../../assets/images/younes.jpg";
import { RiNewspaperLine } from "react-icons/ri";
import axios from "axios";
import { Box, Typography, Rating, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";


const Reservation = () => {
  // reservation page
  const [docid, setDocID] = useState(0)
  const [docname, setDocname] = useState({});
  const [speciality, setspeciality] = useState({});
  const [people, setPeople] = useState({});
  const [loc, setLoc] = useState({});
  const [rateValue, setRatevalue] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/medicine/doctors/", {
        headers: {
          "Content-Type": "application/json;charset=UTF-8" },
      })
      .then(({ data }) => {
        setDocID(data.map(item => item.id))
        setDocname(data.map((item) => item.name));
        setspeciality(data.map((item) => item.speciality));
        setPeople(data.map((item) => item.people));
        setLoc(data.map((item) => item.location));
        setRatevalue(data.map((item) => item.rateValue));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  const doctors1 = [
    {
      doctorid:docid,
    doctornames:docname,
    doctorsspecilities:speciality,
    doctorspeople:people,
    doctorslocations:loc,
    doctorsratevalue:rateValue,
  }]
  
  const navigate = useNavigate()

  
  const doctors = [
    
    {
      id:1,
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1624",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 4,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1624",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 2,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1624",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 3,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1624",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 3,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1124",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 1,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1024",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 5,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1624",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 3,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "2524",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 1,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1624",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 2,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1234",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 1,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1624",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 2,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1624",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 4,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1624",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 2,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1624",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 3,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1624",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 3,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1124",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 1,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1024",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 5,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1624",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 3,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "2524",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 1,
    },
    {
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1624",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 2,
    },
    {
      id:36,
      image: younes,
      name: "دکتر آریا حقانی",
      specialty: "تخصص گوش، حلق و بینی",
      people: "1234",
      loc: "لورم ایپسوم متن ساختگی با تولید سادگی",
      rateValue: 1,
    },
  ];

  const state = {
    pageNumber: 1,
  };

  const handlePageChange = (newPage) => {
    setState({ pageNumber: newPage });
  };

    const doctorsPerPage = 8;
    const { pageNumber } = state;
    const totalPages = Math.ceil(doctors.length / doctorsPerPage);
    const startIndex = (pageNumber - 1) * doctorsPerPage;
    const endIndex = startIndex + doctorsPerPage;
    const onePageDoctors = doctors.slice(startIndex, endIndex); 

  const locationstyle = {
    border: '2px solid white',
    borderRadius: '50px',
    width:"8%",
    height: '40%',
    color: '#fff',
    backgroundColor: 'rgb(7, 167, 248)',
    textAlign:"center",
    alignItems:"center",
    fontSize:"20px",
    ":hover" :{
      backgroundColor:"transparent",
      border:"2px solid rgb(7, 167, 248)",
      color:"rgb(7, 167, 248)",

    }

  }

  const doctorsectionstyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    minHeight: '600px', 
  }

  const doctorboxstyle = {
    boxShadow: '0px 3px 8px 2px rgba(0, 0, 0, 0.2)',
    width: '250px',
    borderRadius: '10px',
    margin: '11px 20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'rgb(79, 79, 79)',
  }

  const doctorboximagestyle = {
      margin: '10px 0px 0px 0px',
      borderRadius: '50%',
      width: '100px',
      height: '100px',
    }

  const reservationbuttonstyle = {
    marginTop:"10px",
    fontSize: '17px',
    border: 'none',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"rgb(7, 167, 248)",
    color: '#fff',
    ":hover":{
      backgroundColor:"transparent",
      color:"rgb(7, 167, 248)",
    }
  }

  const pagesstyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '30px 0',
  }

  const pagenumberstyle = {
    margin: '0 5px',
    cursor: 'pointer',
    color: 'black',
  }

  const changepagestyle =  {
    margin: '0 10px',
    cursor: 'pointer',
    color: 'black',
    fontWeight: '800',
  }

  const activepagestyle = {
    border: '2px solid black',
    borderRadius: '50%',
    padding: '2px 10px',
  }

  const disabledstyle = {
    pointerEvents: 'none',
    color: 'rgb(47, 46, 46)',
    display: 'none',
  }
    return (
      <Box className="reservation">
        <Box sx={{display:"inline-flex",
          alignItems:"center",
          width:"100%",
          height:"150px",
          marginRight:"5%",
        }} className="info">
          
          <Button sx={locationstyle}>
            <FaLocationDot /> تهران
          </Button>

          <Box sx={{height: 'fit-content',}} className="guide">
            <Typography variant="p" sx={{
              fontSize: '20px',
              letterSpacing: '0.9px',
              color: 'black',
              fontWeight: '400',
              marginRight:"15px"
            }}>
              پزشک خود را انتخاب کنید
            </Typography>
          </Box>
        </Box>
        <Box sx={doctorsectionstyle} className="doctors">
          {onePageDoctors.map((item, index) => (
            <Box sx={doctorboxstyle} key={index} className="doctor-box">
              <img
                style={doctorboximagestyle}
                className="image"
                src={item.image || younes}
                alt={item.name}
              />
              <Box sx={{marginTop:"10px",fontWeight:"700",color: '#144278',}} className="name">{item.name}</Box>
              <Box sx={{marginTop:"10px",color:'#217CE6', fontWeight: '600',}} className="specialty">{item.specialty}</Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '15px',  
              }} className="stars">
                <Rating value={item.rateValue} readOnly/>
                <span style={{marginRight:'5px'}}>{item.people} نفر</span>
              </Box>
              <Box sx={{marginTop:"10px"}} className="doctor-address">
                <FaLocationDot /> {item.loc}
              </Box>
              <Box>
                  <Button onClick={() => navigate(`/profile/${docid}`)} sx={reservationbuttonstyle} type="submit" >
                    رزرو نوبت <RiNewspaperLine style={{marginRight:'6px'}} />
                  </Button>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={pagesstyle} className="pages">
          <Typography
            sx={pageNumber === 1 ? disabledstyle : ""}
            onClick={() => handlePageChange(pageNumber - 1)}
          >
            {"<"}
          </Typography>
          {pageNumber > 1 && (
            <Typography
              sx={pagenumberstyle}
              className="page-number"
              onClick={() => handlePageChange(pageNumber - 1)}
            >
              {pageNumber === 1 ? pageNumber : pageNumber - 1}
            </Typography>
          )}
          <Typography sx={activepagestyle} className="page-number active-page">{pageNumber}</Typography>
          {pageNumber < totalPages && (
            <Typography 
              sx={pagenumberstyle}
              className="page-number"
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Typography>
          )}
          <Typography
            sx={pageNumber === totalPages ? disabledstyle : ""}
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            {">"}
          </Typography>
        </Box>
        
      </Box>
    );

  }

export default Reservation;
