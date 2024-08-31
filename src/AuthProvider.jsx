import axios from "axios";
import {useContext, useState, createContext, useEffect} from "react";

const Auth = createContext()

const AuthProvider = ({ children} ) => {
    const [acctoken, setAcctoken_] = useState(localStorage.getItem('token'))
    const [reftoken, setReftoken_] = useState()

    useEffect(() =>{
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
    )

    const setReftoken = reftoken => {
        setReftoken_(reftoken)
        localStorage.setItem('reftoken', reftoken)
    }

    const setAcctoken = acctoken => {
        setAcctoken_(acctoken)
        axios.defaults.headers.common["Authorization"] = `Bearer ${acctoken}`
        localStorage.setItem('acctoken',acctoken)
    }
    (
    <Auth.Provider value={{acctoken, setAcctoken, setReftoken}}>
        {children}
    </Auth.Provider>
)}

export default AuthProvider

export const useAuth= () => useContext(Auth)