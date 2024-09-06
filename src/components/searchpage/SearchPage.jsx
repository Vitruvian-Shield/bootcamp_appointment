import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Box, Grid2, Input, Typography, Button, MenuItem, Select,InputLabel, Rating} from '@mui/material'
import { FaSearch } from "react-icons/fa"
import background from '../../assets/images/medical-wallpaper-hd-1920x1280-353057.jpg'
import axios from "axios";
import cities_list from '../../helper/cities_list.json';



const SearchPage = () => {
    const navigate = useNavigate()
    const [doctors, setdoctors] = useState([])
    // set the limit & offset 
    const [Page, setPage] = useState(0);
    const offset = Page * 8;
    const docsearched = doctors.slice(offset, offset+8)
    
    const searchpageapi = url => {(
        axios.get(url)
        .then(({ data }) => setdoctors(data.map( searchresult => ({
        id:searchresult.id,
        first_name :searchresult.first_name,
        last_name: searchresult.last_name,
        speciality:searchresult.speciality,
        skills :searchresult.skills,
        loc : searchresult.location,
        rate : searchresult.rate,
    })
    ))).catch(err => {(console.log(err))}))}

    const buttonsearchHandler = (e) => {(
        searchpageapi(`https://127.0.0.1:8000/api/medicine/doctors/?first_name=${docname}last_name=${docname}speciality=${spec}&location=${loca}`))}

    const appointmentHandler = e => {
        navigate(`profile/${e.target.value.id}`)
    }
    
    const [docname, setDocname] = useState()
    const [spec,setSpec] = useState()
    const [loca,setLoca] = useState()

    const province = cities_list.map(item => cities_list.filter(() => item.provinceName))
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
                background:`radial-gradient( rgba(70, 69, 69, 0.72) 30%, rgba(31, 31, 31, 0.18) 100%),url(${background}) lightgray 50% / cover no-repeat `,
            }}>
                <Grid2 container sx={{justifyContent:"center", marginX:"0px"}}>
                    <Grid2 item xs={10}> 
                        
                        {/* //////// the header //////// */}
                        <Box sx={{
                            color:'white',
                            width:'100%',
                            minHeight:'250px',
                            paddingY:'15px',
                            borderRadius:"8px",
                            overflow:"hidden"
                        }}>
                            <Grid2 container justifyContent={'center'}>
                                <Grid2 item xs={10}>
                                    <Box sx={{

                                        display:'flex',
                                        textAlign:'center'
                                    }}>
                                    <Typography variant="h3" sx={{textShadow:'2px 2px 2px black'}}>
                                    فقط کافیست نام پزشک یا تخصص مورد نظر خود را در باکس جستجو وارد کنید و از خدمات باکیفیت ما بهره‌مند شوید.</Typography>
                                    </Box>
                                </Grid2>
                            </Grid2>
                            
                        </Box>

                        {/* //////// search bar //////// */}

                        <Grid2 sx={{
                            width:"100%",
                            display:"inline-flex",
                            marginY:"20px",
                            justifyContent:"space-around"
                        }}>
                            <Typography variant="h4" sx={{textShadow:"1px 1px 1px black" , color:"azure"}}>جستجوی دستی</Typography>
                            <Typography variant="h4" sx={{textShadow:"1px 1px 1px black" , color:"azure"}}>جستجوی انتخابی</Typography>
                        </Grid2>
                        <Box sx={{
                            display:"flex", justifyContent:"space-evenly",
                        }}>
                            
                        <span id="searchspan" style={{height:"60px", backgroundColor:"white",width:"30%",borderRadius:"8px",}}>
                            
                            <Input placeholder=" نام پزشک" disableUnderline sx={{
                                width:"100%",
                                height:"100%",                                
                            }}
                            onChange={ e => setDocname(e.target.value)}
                            ></Input>
                        </span>
                        {/* //////// SpecialitySearch //////// */}


                        <Box p={2}  sx={{
                            width:'40%',
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
                            <Select disableUnderline  variant='filled' autoWidth sx={{color:'black', width:"50%"}}>
                            {cities_list.map((item,index) =>{ return(
                                
                                // <SimpleTreeView>
                                //     <TreeItem defaultValue={province_list[0].provinceName} label={province_list[0].provinceName}>
                                //         <TreeItem id={index} defaultValue={item.provinceName === province_list[0].provinceName ? item.cityName : null} onClick={(e) => setLoca(e.target.value)}/>
                                //     </TreeItem>
                                // </SimpleTreeView>

                                <MenuItem value={province[index]} style={menuitems}>{item.province}
                                <MenuItem value={item.city} style={menuitems} onClick={e => setLoca(item.city)}>{item.city}</MenuItem>
                                </MenuItem>
                                
                                )})}
                            </Select>
                            
                            <InputLabel id="demo-simple-select-standard-label" sx={{
                                width:"45%",
                                height:"fit-content",
                                marginTop:"3%"}}>تخصص : </InputLabel>
                            <Select disableUnderline  variant='filled' autoWidth label="تخصص ها" sx={{width:"50%"}} >
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

                        <Grid2 container marginTop={"15px"} marginX={"10%"} justifyContent={"space-between"}>
                            <Grid2>
                                <Typography color={"azure"}>مرتب سازی بر اساس : </Typography>
                                <Select variant="filled" disableUnderline autoWidth defaultValue={"بیشترین امتیاز"} sx={{
                                    width:"100%",
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
                            </Grid2>

                            <Button  sx={{
                                height:"50px",
                                width:"100px",
                                backgroundColor:"#476acc",
                                textAlign:"left",
                                color:"azure"  
                            }}
                            onClick={buttonsearchHandler}>
                                <b>جستجو</b><FaSearch />
                            </Button>
                            
                        </Grid2>
                        
                    </Grid2>
                    
                    {doctors.map((item, index) => (
                        <Box sx={{
                            width:"84%",
                            height:"100%",}}>

                            <Grid2 container /*key={index} */sx={{
                                marginY:"25px",
                                backgroundColor:"white",
                                color:"black",
                                padding:"10px",
                                alignItems:"center",    
                                justifyContent:"space-between",
                                borderRadius:"8px",
                                ":hover":{
                                    boxShadow:"0 5px 25px rgba(0, 0, 0, 0.1)",
                                    borderRight:"8px solid rgb(103, 159, 238)",
                                    opacity:"0.9"}
                            }}>

                                <Grid2 item xs>
                                    
                                    <Typography variant="subtitle1" color={'black'}>
                                         دکتر {item.first_name} {item.last_name}
                                    </Typography>

                                    <Typography variant="subtitle2" sx={{
                                        marginTop:"20px",
                                        backgroundColor:'#476acc',
                                        width:"max-content",
                                        padding:"5px 8px",
                                        borderRadius:'8px',
                                        color:"azure"
                                    }}>
                                        {item.speciality}
                                    </Typography>

                                </Grid2>
                                <Grid2 item container  xs sx={{
                                    justifyContent:"center",
                                    margin:"15px",
                                }}>
                                    <Grid2 /*key={item.service}*/item sx={{
                                        color:"white",
                                        backgroundColor:"black",
                                        borderRadius:"8px",
                                        width:"fit-content",
                                        height:"fit-content",
                                        padding:"5px",
                                        margin:"1%",
                                    }}>
                                        {item.skills}
                                    </Grid2>

                                    
                                </Grid2>
                                <Grid2 item container xs sx={{
                                    justifyContent:'left',
                                    textAlign:"left",
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems:"center"
                                }}>
                        
                        <Typography marginLeft={'3.5%'} color={"black"}>
                         <Rating value={item.rate} readOnly />{item.loc} 
                        </Typography>

                        <Button variant='outline' sx={{
                            minwidth:"30%",
                            backgroundColor:'white',
                            border:"2px solid black",
                            borderRadius:"28px",
                            color:"black",
                            opacity:'0.8',
                            marginTop:'5px',
                            marginLeft:"1%"
                        }}
                        onClick={appointmentHandler}>نوبت گیری</Button>
                    </Grid2>
                </Grid2>
                    </Box>))}
                </Grid2>
            </Box>
        )
    }


export default SearchPage