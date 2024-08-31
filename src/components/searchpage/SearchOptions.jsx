import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/material/Icon';
import EditIcon from '@mui/material/Icon';
import UpIcon from '@mui/material/Icon';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Checkbox, ListItemText, MenuItem } from '@mui/material';
import cities_list from '../../helper/cities_list.json';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

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
const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export default function FloatingActionButtonZoom() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'primary',
      sx: fabStyle,
      icon: <AddIcon />,
      label: 'Add',
    },
    {
      color: 'secondary',
      sx: fabStyle,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'inherit',
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <UpIcon />,
      label: 'Expand',
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: 500,
        position: 'relative',
        maxHeight: 200,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
            visibleScrollbar
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="شهر" {...a11yProps(0)} />
          <Tab label="تخصص" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
      {cities_list.map((item,index) =>{ return(
                    <>
                    <Checkbox  value={province[index]} style={menuitems}/> <ListItemText primary={item.province}/>
                    {/* {item.city.map((item, index))} */}
                    <MenuItem value={item.city} style={menuitems}>{item.city}</MenuItem>
                    </>
                    )})}
              </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        Item Two
      </TabPanel>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
  );
}
