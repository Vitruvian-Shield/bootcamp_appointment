import React from "react"
import main from './main.css'
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import SearchPage from "../searchpage/SpecialitySearch"
import axios from "axios"

axios.get()


const Main = () => {
   

    // onChange function
    const navigate = useNavigate()

        return(
            <div style={main}className="main" id="main">
                
                {/* /////// header //////// */}
                <div className="main">
                    <h1>به سامانه نوبت دهی آنلاین ویترووین شیلد خوش آمدید</h1>
                    <p className="main"> با استفاده از سیستم نوبت دهی انلاین ما ، به راحتی میتوانید پزشکان مورد نظر خود را بیابید و نوبت بگیرید.</p>
                </div>

                {/* //////// search section //////// */}
                <div className="main" id='search'>
                    <h2> فقط کافیست نام پزشک یا تخصص مورد نظر خود را در باکس جستجو وارد کنید<br></br> و از خدمات باکیفیت ما بهره‌مند شوید. </h2>
                    <span id="searchspan">
                        <button className="main" id="searchbutton" name="searchbutton" onClick= {navigate('/search')}><b>جستجو</b>
                        <FaSearch id="searchicon" />
                        </button>
                        <input name="searchbar" id="searchbar" placeholder=" نام پزشک ، تخصص ، بیماری و شهر و . . ." type="text"></input>
                    </span>
                </div>
            </div>
        )
    }


export default Main