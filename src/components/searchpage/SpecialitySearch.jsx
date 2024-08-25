import React from "react";
import { Box, Select, MenuItem, InputLabel} from "@mui/material";
import cities_list from '../../helper/cities_list.json'

class SearchPage extends React.Component{
    

    province = cities_list.map(item => cities_list.filter(() => item.province))
    city = cities_list.map(item => item.city)

    // specialities for speciality search 
    state ={speciality:[
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
}

    render(){
        // style for item menu
        const menuitems = {
            color:'black',
            width:'50%',
        }
        
        return(
                
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
                <Select disableUnderline  variant='filled' autoWidth  defaultValue='دندانپزشکی' sx={{color:'black'}}>
                {cities_list.map((item,index) =>{ return(
                    
                    <MenuItem value={this.province[index]} style={menuitems}>{item.province}
                    <MenuItem value={item.city} style={menuitems}>{item.city}</MenuItem>
                    </MenuItem>
                    
                    )})}
                </Select>
                
                <InputLabel id="demo-simple-select-standard-label" sx={{
                    width:"45%",
                    height:"fit-content",
                    marginTop:"3%"}}>تخصص : </InputLabel>
                <Select disableUnderline  variant='filled' autoWidth label="تخصص ها" >
                    {this.state.speciality.map((item,index) => {
                        return(
                        <MenuItem  value={this.state.speciality[index]} style={menuitems}>{this.state.speciality[index]}</MenuItem>
                    )
                }
            )
        }
                </Select> 
                
            </Box>
                    
        )
    }
}

export default SearchPage