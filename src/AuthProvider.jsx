import { useContext, useState, createContext, useEffect } from "react";
import axios from "axios";

const Auth = createContext();

const AuthProvider = ({ children }) => {
  
    /*  managing json web tokens  */

  const [token,setToken_] = useState(localStorage.getItem("token"))
  

  const setToken = (token) => {
    setToken_(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  };

  return (
    <Auth.Provider value={{ token, setToken }}>
      {children}
    </Auth.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(Auth);
