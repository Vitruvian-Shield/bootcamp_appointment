import React from "react";
import {Box, Grid, Typography, Button} from '@mui/material'
import { Route } from "react-router-dom";


class DocCard extends React.Component{
    
    // example for specialities
    specialities = ['ارتوپد','جراح', 'متخصص']
    
    render(){
        return(
            <Box sx={{
                scrollBehavior:"smooth",
                width:"84%",
                height:"100%",
                overflow:"auto",
            }}>
                <Grid container sx={{
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
                        <Typography variant="subtitle1" color={'black'}>دکتر حقانی</Typography>
                        <Typography variant="subtitle2" sx={{
                            marginTop:"8px",
                            backgroundColor:'#476acc',
                            width:"max-content",
                            padding:"5px 8px",
                            borderRadius:'8px'
                        }}>ارتوپد</Typography>
                    </Grid>
                    <Grid item container  xs sx={{
                        justifyContent:"center",
                        margin:"15px",
                    }}>
                        {this.specialities.map(skills => <Grid key={skills} item sx={{
                            color:"white",
                            backgroundColor:"black",
                            borderRadius:"8px",
                            width:"fit-content",
                            height:"fit-content",
                            padding:"5px",
                            margin:"1%",
                        }}>{skills}</Grid>)}
                    </Grid>
                    <Grid item container xs justifyContent={'left'} textAlign={"left"}>
                        <Typography marginLeft={'3.5%'} color={"black"}>امتیاز و مکان مطب </Typography>
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



                <Grid container sx={{
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
                        <Typography variant="subtitle1" color={'black'}>دکتر حقانی</Typography>
                        <Typography variant="subtitle2" sx={{
                            marginTop:"8px",
                            backgroundColor:'#476acc',
                            width:"max-content",
                            padding:"5px 8px",
                            borderRadius:'8px'
                        }}>ارتوپد</Typography>
                    </Grid>
                    <Grid item container  xs sx={{
                        justifyContent:"center",
                        margin:"15px",
                    }}>
                        {this.specialities.map(skills => <Grid key={skills} item sx={{
                            color:"white",
                            backgroundColor:"black",
                            borderRadius:"8px",
                            width:"fit-content",
                            height:"fit-content",
                            padding:"5px",
                            margin:"1%",
                        }}>{skills}</Grid>)}
                    </Grid>
                    <Grid item container xs justifyContent={'left'} textAlign={"left"}>
                        <Typography marginLeft={'3.5%'} color={"black"}>امتیاز و مکان مطب </Typography>
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

                <Grid container sx={{
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
                        <Typography variant="subtitle1" color={'black'}>دکتر حقانی</Typography>
                        <Typography variant="subtitle2" sx={{
                            marginTop:"8px",
                            backgroundColor:'#476acc',
                            width:"max-content",
                            padding:"5px 8px",
                            borderRadius:'8px'
                        }}>ارتوپد</Typography>
                    </Grid>
                    <Grid item container  xs sx={{
                        justifyContent:"center",
                        margin:"15px",
                    }}>
                        {this.specialities.map(skills => <Grid key={skills} item sx={{
                            color:"white",
                            backgroundColor:"black",
                            borderRadius:"8px",
                            width:"fit-content",
                            height:"fit-content",
                            padding:"5px",
                            margin:"1%",
                        }}>{skills}</Grid>)}
                    </Grid>
                    <Grid item container xs justifyContent={'left'} textAlign={"left"}>
                        <Typography marginLeft={'3.5%'} color={"black"}>امتیاز و مکان مطب </Typography>
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

                <Grid container sx={{
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
                        <Typography variant="subtitle1" color={'black'}>دکتر حقانی</Typography>
                        <Typography variant="subtitle2" sx={{
                            marginTop:"8px",
                            backgroundColor:'#476acc',
                            width:"max-content",
                            padding:"5px 8px",
                            borderRadius:'8px'
                        }}>ارتوپد</Typography>
                    </Grid>
                    <Grid item container  xs sx={{
                        justifyContent:"center",
                        margin:"15px",
                    }}>
                        {this.specialities.map(skills => <Grid key={skills} item sx={{
                            color:"white",
                            backgroundColor:"black",
                            borderRadius:"8px",
                            width:"fit-content",
                            height:"fit-content",
                            padding:"5px",
                            margin:"1%",
                        }}>{skills}</Grid>)}
                    </Grid>
                    <Grid item container xs justifyContent={'left'} textAlign={"left"}>
                        <Typography marginLeft={'3.5%'} color={"black"}>امتیاز و مکان مطب </Typography>
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

                <Grid container sx={{
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
                        <Typography variant="subtitle1" color={'black'}>دکتر حقانی</Typography>
                        <Typography variant="subtitle2" sx={{
                            marginTop:"8px",
                            backgroundColor:'#476acc',
                            width:"max-content",
                            padding:"5px 8px",
                            borderRadius:'8px'
                        }}>ارتوپد</Typography>
                    </Grid>
                    <Grid item container  xs sx={{
                        justifyContent:"center",
                        margin:"15px",
                    }}>
                        {this.specialities.map(skills => <Grid key={skills} item sx={{
                            color:"white",
                            backgroundColor:"black",
                            borderRadius:"8px",
                            width:"fit-content",
                            height:"fit-content",
                            padding:"5px",
                            margin:"1%",
                        }}>{skills}</Grid>)}
                    </Grid>
                    <Grid item container xs justifyContent={'left'} textAlign={"left"}>
                        <Typography marginLeft={'3.5%'} color={"black"}>امتیاز و مکان مطب </Typography>
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

                <Grid container sx={{
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
                        <Typography variant="subtitle1" color={'black'}>دکتر حقانی</Typography>
                        <Typography variant="subtitle2" sx={{
                            marginTop:"8px",
                            backgroundColor:'#476acc',
                            width:"max-content",
                            padding:"5px 8px",
                            borderRadius:'8px'
                        }}>ارتوپد</Typography>
                    </Grid>
                    <Grid item container  xs sx={{
                        justifyContent:"center",
                        margin:"15px",
                    }}>
                        {this.specialities.map(skills => <Grid key={skills} item sx={{
                            color:"white",
                            backgroundColor:"black",
                            borderRadius:"8px",
                            width:"fit-content",
                            height:"fit-content",
                            padding:"5px",
                            margin:"1%",
                        }}>{skills}</Grid>)}
                    </Grid>
                    <Grid item container xs justifyContent={'left'} textAlign={"left"}>
                        <Typography marginLeft={'3.5%'} color={"black"}>امتیاز و مکان مطب </Typography>
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

                <Grid container sx={{
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
                        <Typography variant="subtitle1" color={'black'}>دکتر حقانی</Typography>
                        <Typography variant="subtitle2" sx={{
                            marginTop:"8px",
                            backgroundColor:'#476acc',
                            width:"max-content",
                            padding:"5px 8px",
                            borderRadius:'8px'
                        }}>ارتوپد</Typography>
                    </Grid>
                    <Grid item container  xs sx={{
                        justifyContent:"center",
                        margin:"15px",
                    }}>
                        {this.specialities.map(skills => <Grid key={skills} item sx={{
                            color:"white",
                            backgroundColor:"black",
                            borderRadius:"8px",
                            width:"fit-content",
                            height:"fit-content",
                            padding:"5px",
                            margin:"1%",
                        }}>{skills}</Grid>)}
                    </Grid>
                    <Grid item container xs justifyContent={'left'} textAlign={"left"}>
                        <Typography marginLeft={'3.5%'} color={"black"}>امتیاز و مکان مطب </Typography>
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

                <Grid container sx={{
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
                        <Typography variant="subtitle1" color={'black'}>دکتر حقانی</Typography>
                        <Typography variant="subtitle2" sx={{
                            marginTop:"8px",
                            backgroundColor:'#476acc',
                            width:"max-content",
                            padding:"5px 8px",
                            borderRadius:'8px'
                        }}>ارتوپد</Typography>
                    </Grid>
                    <Grid item container  xs sx={{
                        justifyContent:"center",
                        margin:"15px",
                    }}>
                        {this.specialities.map(skills => <Grid key={skills} item sx={{
                            color:"white",
                            backgroundColor:"black",
                            borderRadius:"8px",
                            width:"fit-content",
                            height:"fit-content",
                            padding:"5px",
                            margin:"1%",
                        }}>{skills}</Grid>)}
                    </Grid>
                    <Grid item container xs justifyContent={'left'} textAlign={"left"}>
                        <Typography marginLeft={'3.5%'} color={"black"}>امتیاز و مکان مطب </Typography>
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

                <Grid container sx={{
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
                        <Typography variant="subtitle1" color={'black'}>دکتر حقانی</Typography>
                        <Typography variant="subtitle2" sx={{
                            marginTop:"8px",
                            backgroundColor:'#476acc',
                            width:"max-content",
                            padding:"5px 8px",
                            borderRadius:'8px'
                        }}>ارتوپد</Typography>
                    </Grid>
                    <Grid item container  xs sx={{
                        justifyContent:"center",
                        margin:"15px",
                    }}>
                        {this.specialities.map(skills => <Grid key={skills} item sx={{
                            color:"white",
                            backgroundColor:"black",
                            borderRadius:"8px",
                            width:"fit-content",
                            height:"fit-content",
                            padding:"5px",
                            margin:"1%",
                        }}>{skills}</Grid>)}
                    </Grid>
                    <Grid item container xs justifyContent={'left'} textAlign={"left"}>
                        <Typography marginLeft={'3.5%'} color={"black"}>امتیاز و مکان مطب </Typography>
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

                
            </Box>
        )
    }
}

export default DocCard