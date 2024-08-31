import React, { useEffect, useState } from "react";
import {Box, Grid, Input, Typography, Button, MenuItem, Select,InputLabel} from '@mui/material'
import { FaSearch } from "react-icons/fa"
import background from '../../assets/images/medical-wallpaper-hd-1920x1280-353057.jpg'
import axios from "axios";
import cities_list from '../../helper/cities_list.json';
import FloatingActionButtonZoom from "./SearchOptions";
import NestedModal from "./SearchModal";
// import Specialities from "../specialities/Specialities";



const SearchPage = () => {

    const [doctors, setdoctors] = useState([])
    // set the limit & offset 
    const [Page, setPage] = useState(0);
    const offset = Page * 8;
    const docsearched = doctors.slice(offset, offset+8)

    // const searchpageapi = url => {(axios.get(url).then(({ data }) => setdoctors(data.map( searchresult => ({
    //     name :searchresult.name,
    //     speciality:searchresult.speciality,
    //     skills :searchresult.skills,
    //     loc : searchresult.location,
    //     rate : searchresult.rate,
    // })
    // ))).catch(err => {(console.log(err))}))}

    // const buttonsearchHandler = (e) => {(
    //     searchpageapi(`https://127.0.0.1:8000/api/medicine/doctors/?first_name=${docname}last_name=${docname}speciality=${spec}&location=${loca}`)
    // )}

    // const searchHandler = (e) => {(
    //     searchpageapi(`https://dummyjson.com/users/search/?q=${e.target.value}`)
    // )}

    // useEffect(() => {
    //     axios.get("http://127.0.0.1:8000/api/medicine/doctors/",).then(({ data }) => setdoctors(data.map( searchresult => ({
    //         name :searchresult.name,
    //         speciality:searchresult.speciality,
    //         service :searchresult.service,
    //         location : searchresult.location,
    //         rate : searchresult.rate,
    //     })
    //     ))
    // ).catch((err) => console.log(err))
    
    // },[])

    const [docname, setDocname] = useState()
    const [spec,setSpec] = useState()
    const [loca,setLoca] = useState()

    const province = cities_list.map(item => cities_list.filter(() => item.province))
    const city = cities_list.map(item => item.city)

    // specialities for speciality search 
    const speciality =[
        'متخصص اطفال',
        'فوق تخصص کلیه (نفرولوژیست)',
        'متخصص گوارش',
        'دندانپزشک',
        'متخصص تغذیه',
        'متخصص مامایی',
        'متخصص چشم پزشک',
        'دکتر گوش، حلق و بینی',
        'متخصص ارتوپدی',
        'دکتر متخصص گفتار درمانی',
        'متخصص پوست، مو و زیبایی',
        'روانشناس',
        'دکتر داخلی',
        'متخصص مغز و اعصاب (نورولوژی)',
        'متخصص اورولوژی',
        'جراح مغز و اعصاب',
        'پزشک عمومی',
        'رادیوتراپیست',
        'متخصص رادیولوژی و سونوگرافی',
        'متخصص غدد',
        'متخصص ریه',
    ]


        // style for item menu
        const menuitems = {
            color:'black',
            width:'50%',
        }
        

    return(
            <Box  sx={{
                margin:"-8px",
                background:`radial-gradient( rgba(70, 69, 69, 0.72) 30%, rgba(31, 31, 31, 0.18) 100%),url(${background}) lightgray 50% / cover no-repeat `,
            }}>
                <Grid container sx={{justifyContent:"center"}}>
                    <Grid item xs={10}> 
                        
                        {/* //////// the header //////// */}
                        <Box sx={{
                            color:'white',
                            width:'100%',
                            minHeight:'250px',
                            paddingY:'15px',
                            borderRadius:"8px",
                            overflow:"hidden"
                        }}>
                            <Grid container justifyContent={'center'}>
                                <Grid item xs={10}>
                                    <Box sx={{

                                        display:'flex',
                                        textAlign:'center'
                                    }}>
                                    <Typography variant="h3" sx={{textShadow:'2px 2px 2px black'}}>
                                    فقط کافیست نام پزشک یا تخصص مورد نظر خود را در باکس جستجو وارد کنید و از خدمات باکیفیت ما بهره‌مند شوید.</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            
                        </Box>

                        {/* //////// search bar //////// */}

                        <Grid sx={{
                            display:"inline-flex",
                            marginY:"20px"
                        }}>
                            <Typography variant="h4" sx={{textShadow:"1px 1px 1px black" , color:"azure"}}>جستجوی دستی</Typography>
                            <Typography variant="h4" sx={{textShadow:"1px 1px 1px black" , color:"azure"}}>جستجوی انتخابی</Typography>
                        </Grid>
                        <Box sx={{
                            display:"flex", justifyContent:"space-between",
                        }}>
                            
                        <span id="searchspan" style={{height:"60px", backgroundColor:"white"}}>
                            
                            <Input placeholder=" نام پزشک" disableUnderline sx={{
                                width:"87%",
                                height:"100%",                                
                            }}
                            onChange={ e => setDocname(e.target.value)}
                            ></Input>
                        </span>
                        {/* //////// SpecialitySearch //////// */}


                        <Box p={2}  sx={{
                            width:'50%',
                            height:'60px',
                            padding:'2',
                            backgroundColor:'#fff',
                            display:'flex',
                            borderRadius:'8px',
                            textAlign:"center",
                            '& > *':{
                                height:'45px',
                                margin:'8px',
                                color:'black',
                                
                            }}}>
                            
                            <InputLabel id="demo-simple-select-standard-label" sx={{
                                width:"45%",
                                height:"fit-content",
                                marginTop:"3%"
                            }}>شهر : </InputLabel>
                            <Select disableUnderline  variant='filled' onInput={e => setLoca(e.target.value)} autoWidth sx={{color:'black'}}>
                            {cities_list.map((item,index) =>{ return(
                                
                                <MenuItem value={province[index]} style={menuitems}>{item.province}
                                {/* {item.city.map((item, index))} */}
                                <MenuItem value={item.city} style={menuitems} /*onClick={e => setLoca(item.city)}*/>{item.city}</MenuItem>
                                </MenuItem>
                                
                                )})}
                            </Select>
                            
                            <InputLabel id="demo-simple-select-standard-label" sx={{
                                width:"45%",
                                height:"fit-content",
                                marginTop:"3%"}}>تخصص : </InputLabel>
                            <Select disableUnderline  variant='filled' autoWidth label="تخصص ها" >
                                {speciality.map((item,index) => {
                                    return(
                                    <MenuItem  value={speciality[index]} style={menuitems} onClick={e => setSpec(e.target.value)}>{speciality[index]}</MenuItem>
                                )
                            }
                        )
                    }
                            </Select> 
                            
                        </Box>
                        

                        </Box>

                        {/* //////// the body //////// */}

                        <Grid container marginTop={"15px"} justifyContent={"space-between"}>
                            <Typography color={"azure"}>مرتب سازی بر اساس : </Typography>
                            <Select variant="filled" disableUnderline autoWidth defaultValue={"بیشترین امتیاز"} sx={{
                                width:"18%",
                                color:"black",
                                backgroundColor:"rgba(271,271,271,0.9)",
                                borderRadius:"8px",
                                ":hover":{
                                    backgroundColor:"rgba(271,271,271,0.9)",
                                    color:"rgba(0,0,0,0.9)"
                                }
                                
                                }}>
                                <MenuItem sx={{width:"25%", color:"black"}} value="بیشترین امتیاز">بیشترین امتیاز</MenuItem>
                                <MenuItem sx={{width:"25%", color:"black"}} value='نزدیک ترین'>نزدیک ترین</MenuItem>
                                <MenuItem sx={{width:"25%", color:"black"}} value='محبوب ترین'>محبوب ترین</MenuItem>
                            </Select>
                            <Button  sx={{
                                height:"50px",
                                width:"100px",
                                backgroundColor:"#476acc",
                                textAlign:"left",
                                color:"azure"  
                            }}
                            /*onClick={buttonsearchHandler}*/>
                                <b>جستجو</b><FaSearch />
                            </Button>
                            
                        </Grid>
                        
                    </Grid>
                    
                    {docsearched.map((item, index) => (
                        <Box sx={{
                            scrollBehavior:"smooth",
                            width:"84%",
                            height:"100%",
                            overflow:"auto",
                        }}>
                            <Grid container key={index} sx={{
                            marginTop:"25px",
                            backgroundColor:"white",
                            color:"black",
                            padding:"10px",
                            alignItems:"center",
                            justifyContent:"center",
                            borderRadius:"8px",
                            ":hover":{
                                boxShadow:"0 5px 25px rgba(0, 0, 0, 0.1)",
                                borderRight:"8px solid rgb(103, 159, 238)",
                                opacity:"0.9"
                            }
                        }}>
                                <Grid item xs>
                                    <Typography variant="subtitle1" color={'black'}>{item.name}</Typography>
                                    <Typography variant="subtitle2" sx={{
                                        marginTop:"8px",
                                        backgroundColor:'#476acc',
                                        width:"max-content",
                                        padding:"5px 8px",
                                        borderRadius:'8px',
                                        color:"azure"
                                    }}>{item.speciality}</Typography>
                                </Grid>
                                <Grid item container  xs sx={{
                                    justifyContent:"center",
                                    margin:"15px",
                                }}>
                                    <Grid key={item.service}item sx={{
                                        color:"white",
                                        backgroundColor:"black",
                                        borderRadius:"8px",
                                        width:"fit-content",
                                        height:"fit-content",
                                        padding:"5px",
                                        margin:"1%",
                                    }}>
                                        {item.service}
                                    </Grid>

                                    
                                </Grid>
                    <Grid item container xs justifyContent={'left'} textAlign={"left"}>
                        <Typography marginLeft={'3.5%'} color={"black"}>{item.rate} و {item.loc} </Typography>
                        <Button variant='outline' sx={{
                            width:"30%",
                            backgroundColor:'white',
                            border:"2px solid black",
                            borderRadius:"28px",
                            color:"black",
                            opacity:'0.8',
                            marginTop:'5px',
                            marginLeft:"1%"
                        }}
                        href="/profile">نوبت گیری</Button>
                    </Grid>
                </Grid>

                    </Box>))}
                </Grid>
                {/* <NestedModal /> */}
                {/* <FloatingActionButtonZoom /> */}
            </Box>
        )
    }


export default SearchPage
