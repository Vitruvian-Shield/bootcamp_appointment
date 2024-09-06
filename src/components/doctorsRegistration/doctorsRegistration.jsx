import React, { useState } from "react";
import axios from "axios";
import "./doctorsRegistration.css";
import {Box, Typography, Input, Button} from '@mui/material'

const DoctorsRegistration = () => {
  // doctors registration page 

  const [name, setName] = useState("");
  const [familyname, setFamilyname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [nationalcode, setNationalcode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [medicalcode, setMedicalcode] = useState("");
  const [service, setService] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [alley, setAlley] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [vahed, setVahed] = useState("");
  const [address, setAddress] = useState("");

  // const { setAcctoken, setReftoken } = useAuth();

  const datas = {
    first_name: name,
    last_name: familyname,
    phone_number: phonenumber,
    email: email,
    zip_code: zipcode,
    username: username,
    password: password,
    speciality: {
      speciality: speciality,
      medical_system_number: medicalcode,
      services: service,
    },
    location: {
      province: province,
      city: city,
      street: street,
      allay: alley,
      plate_number: zipcode,
      unit: vahed,
      address: address,
    },
  };

  const registerbuttonHandler = () => {
    axios
      .post("http://127.0.0.1:8000/api/medicine/doctors/", datas, {
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      })
      .then(({ data }) => {
        console.log(data);
        return axios.post("http://127.0.0.1:8000/api/accounts/token/", {
          username: username,
          password: password,
        });
      })
      .then(({ data }) => {
        console.log("Token: ", data);
        setAcctoken(data.access);
        setReftoken(data.refresh);
      })
      .catch((err) => console.log(err));
  };

  const inputs = (type, placeholder, value, setFunc) => {
    return (
        <Input
          sx={inputstyle}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => setFunc(e.target.value)}
          disableUnderline
        />
    );
  };

  const totalstyle = {
    minWidth: '50%',
    width: '60%',
    background: 'transparent',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    color: '#fff',
    borderRadius: '10px',
    padding: '30px 40px',
    margin: '40px 0',
  }

  const inputboxstyle = {
    display: 'inline-flex',
    width: '45%',
    height: '50px',
    margin: '25px 20px',
    borderRadius:"40px",
    ":hover":{
      boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.2)',
      border: '2px solid black',
    },
    
    '::placeholder':{
      color:'#fff',
      textAlign: 'center',
    },
  }


  const inputstyle = {
    textAlign: 'center',
    width: '40%',
    minWidth:"150px",
    height: '45px',
    background: 'transparent',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    outline: 'none',
    margin:"30px 35px",
    borderRadius: '40px',
    fontSize: "19px",
    color: '#fff',
    paddingRight: "10px",
    
  }

  const btnboxstyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  }

  const submitbuttonstyle = {
    width: '50%',
    height: '45px',
    backgroundColor:'#217CE6',
    borderRadius: "45px",
    cursor: 'pointer',
    fontSize: '16px',
    color: '#fff',
    fontWeight: '700',
    ":hover":{
      backgroundColor:"transparent",
    }
  }
  const titlestyle = {fontSize: '36px', textAlign: 'center',}
  return (
    <Box className="doctors-registration">
      <Box sx={totalstyle} className="total">
        <form
      
          onSubmit={(e) => {
            e.preventDefault();
            registerbuttonHandler();
          }}
        >
          <Box>
            <Typography sx={titlestyle}>
              اطلاعات فردی 
            </Typography>
          </Box>

          {inputs("text", "  نام", name, setName)}
          {inputs("text", "  نام خانوادگی", familyname, setFamilyname)}
          {inputs("text", "  کد ملی", nationalcode, setNationalcode)}
          {inputs("text", "  شماره تماس", phonenumber, setPhonenumber)}
          {inputs("text", "  نام کاربری", username, setUsername)}
          {inputs("Email", "  ایمیل", email, setEmail)}
          {inputs("password", "  رمز عبور", password, setPassword)}
          {inputs("password", "  تکرار رمز عبور", repassword, setRepassword)}

          <Box>
            <Typography sx={titlestyle}>اطلاعات پزشکی</Typography>
          </Box>

          {inputs("text", "  تخصص", speciality, setSpeciality)}
          {inputs("text", "  شماره نظام پزشکی", medicalcode, setMedicalcode)}
          {inputs("text", "  خدمات", service, setService)}

          <Box>
            <Typography sx={titlestyle}>آدرس مطب</Typography>
          </Box>

          {inputs("text", "  استان", province, setProvince)}
          {inputs("text", "  شهر ", city, setCity)}
          {inputs("text", "   خیابان ", street, setStreet)}
          {inputs("text", "  کوچه(اختیاری)", alley, setAlley)}
          {inputs("text", "  شماره پلاک", zipcode, setZipcode)}
          {inputs("text", "  واحد (اختیاری) ", vahed, setVahed)}
          {inputs("text", "  آدرس کامل ", address, setAddress)}

          <Box sx={btnboxstyle} className="btn">
            <Button sx={submitbuttonstyle} type="submit">ثبت نام</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default DoctorsRegistration;
