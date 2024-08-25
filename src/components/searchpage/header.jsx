import React from "react"
import { Box, Grid, Typography } from "@mui/material"

class SearchHeader extends React.Component{
    render(){
        return(
            <Box sx={{
                color:'white',
                width:'100%',
                height:'150px',
                paddingY:'15px',
                borderRadius:"8px",
                overflow:"hidden" // ye bug riz dare
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
        )
    }
}

export default SearchHeader