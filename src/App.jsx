import React from "react";
import Main from './components/main/Main'
import Footer from './components/Footer/Footer';
import SearchPage from "./components/searchpage/SearchPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Specialities from "./components/specialities/Specialities";
import Profile from "./components/Profile/Profile";


class App extends React.Component{

    render(){
        return(
            <BrowserRouter>
                <Routes>
                <Route path="/" Component={Main} />
                <Route path="/search" Component={SearchPage} />
                <Route path="/specialities" Component={Specialities} />
                <Route path="/profile" Component={Profile} />
                </Routes>
                <Footer />
            </BrowserRouter>
        )
    }

}

export default App