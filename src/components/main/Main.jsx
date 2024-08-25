import React from "react"
import main from './main.css'
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import SearchPage from "../searchpage/SpecialitySearch"
import {Box, Grid} from '@mui/material'


class Main extends React.Component{
    state = {
        open : false,
        setOpen: false
    }

    // onChange function
    openrHandler = event => !this.state.setOpen 
    navigate = event => useNavigate(SearchPage)

    render(){
        return(
            <div style={main}className="main" id="main">
                <div className="main">
                    <h1>به سامانه نوبت دهی آنلاین ویترووین شیلد خوش آمدید</h1>
                    <p className="main"> با استفاده از سیستم نوبت دهی انلاین ما ، به راحتی میتوانید پزشکان مورد نظر خود را بیابید و نوبت بگیرید.</p>
                </div>
                <div className="main" id='search'>
                    <h2> فقط کافیست نام پزشک یا تخصص مورد نظر خود را در باکس جستجو وارد کنید<br></br> و از خدمات باکیفیت ما بهره‌مند شوید. </h2>
                    <span id="searchspan">
                        <button className="main" id="searchbutton" name="searchbutton" /*onClick=/*{this.navigate}*/><b>جستجو</b>
                        <FaSearch id="searchicon" />
                        </button>
                        <input name="searchbar" id="searchbar" placeholder=" نام پزشک ، تخصص ، بیماری و شهر و . . ." type="text"></input>
                    </span>
                </div>
            </div>
        )
    }
}

export default Main