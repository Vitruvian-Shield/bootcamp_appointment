import React, { useState }from 'react';
import './content.css';
import BasicModal from '../components/modal';
import searchicon from '../assets/images/search.svg';
import locicon from '../assets/images/locicon.svg';
import backgroundImage from '../assets/images/bgcontent.png';
import { useEffect } from 'react';

function Content() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [citiesData, setCitiesData] = useState([])

    const backgroundImageStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingBottom: '60px',
        height: '120vh',
        width: '100%',
        minHeight: { xs: '680px', xl: '800px' },
        boxSizing: 'border-box',
        pr: { xs: '10px', sm: '40px', md: '80px', lg: '100px', xl: '119px' },
        position: 'relative'
    };

    const shouldShow = window.location.pathname === "/search";

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/medicine/location/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(cities => {
                setCitiesData(cities);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    , []);  

    function searchFunc(){
        localStorage.setItem('speciality', document.getElementById('searchInput').value)
        window.location.href = "/doctors"
    }
    return (
        <>
            <div className="background-container" id='home' style={backgroundImageStyle}>
                {shouldShow || (<div className='typewriter' dir='rtl'>
                    <b><h1>به سامانه نوبت‌دهی آنلاین ویترووین شیلد خوش آمدید! </h1></b>
                </div>)}
                {shouldShow || (<div className='typewriter' dir='rtl'>
                    <b><h2>برای شروع جستجو رو بزن...</h2></b>
                </div>)}

                {shouldShow && (
                    <div className="box">                    
                        <div className="search-container">
                            <input type="search" id="searchInput" placeholder='...،جستجوی نام پزشک، تخصص، بیماری‌'/>
                            <button type="submit" id="searchButton" onClick={searchFunc}>جستجو<img src={searchicon} alt="" /></button>
                        </div>
                        <div className='white-box' dir='rtl'>
                            <p>
                            با استفاده از سیستم نوبت‌دهی آنلاین ما، به راحتی می‌توانید پزشکان مورد نظر خود را پیدا کنید و نوبت بگیرید. فقط کافیست نام پزشک یا تخصص مورد نظر خود را در باکس جستجو وارد کنید و از خدمات باکیفیت ما بهره‌مند شوید.
                            </p>
                            <button onClick={handleOpen} className="city-selector-button">
                            انتخاب شهر <img src={locicon} alt="location icon" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <BasicModal data={citiesData} open={open} handleClose={handleClose} handleOpen={handleOpen} />
        </>
    );
}

export default Content;
