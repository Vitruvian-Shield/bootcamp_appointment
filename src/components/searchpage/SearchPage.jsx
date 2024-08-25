import React from "react";
import {Box, Grid, Input, Typography, Button, MenuItem, Select} from '@mui/material'
import SpecialitySearch from './SpecialitySearch'
import DocCard from './DocCard'
import SearchHeader from "./header";
import { FaSearch } from "react-icons/fa"
import background from '../../assets/images/medical-wallpaper-hd-1920x1280-353057.jpg'




class SearchPage extends React.Component{

    render(){
        return(
            <Box  sx={{
                margin:"-8px",
                background:`radial-gradient( rgba(70, 69, 69, 0.72) 30%, rgba(31, 31, 31, 0.18) 100%),url(${background}) lightgray 50% / cover no-repeat `,
            }}>
                <Grid container sx={{justifyContent:"center"}}>
                    <Grid item xs={10}> 
                        <SearchHeader />
                        <Grid sx={{
                            display:"inline-flex",
                            marginY:"20px"
                        }}>
                            <Typography variant="h4" sx={{textShadow:"1px 1px 1px black"}}>جستجوی دستی</Typography>
                            <Typography variant="h4" sx={{textShadow:"1px 1px 1px black"}}>جستجوی انتخابی</Typography>
                        </Grid>
                        <Box sx={{
                            display:"flex", justifyContent:"space-between",
                            
                        }}>
                        <span id="searchspan" style={{height:"60px", backgroundColor:"white"}}>
                            
                            <Input placeholder=" نام پزشک ، تخصص ، بیماری و شهر و . . ." disableUnderline sx={{
                                width:"87%",
                                height:"100%",                                
                            }}></Input>
                        </span>
                        <SpecialitySearch />
                        
                        

                        </Box>
                        <Grid container marginTop={"15px"} justifyContent={"space-between"}>
                            <Typography>مرتب سازی بر اساس : </Typography>
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
                                
                            }}>
                                <b>جستجو</b><FaSearch />
                            </Button>
                            
                        </Grid>
                        
                    </Grid>
                    <DocCard />
                </Grid>
            </Box>
        )
    }
}

export default SearchPage
