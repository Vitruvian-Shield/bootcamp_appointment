import { useContext, useState, createContext, useEffect } from "react";
import axios from "axios";

const Auth = createContext();

const AuthProvider = ({ children }) => {
  
    /*  managing json web tokens  */


  const [acctoken, setAcctoken_] = useState(localStorage.getItem("acctoken"));
  const [reftoken, setReftoken_] = useState(localStorage.getItem("reftoken"));

  useEffect(() => {
    if (acctoken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${acctoken}`;
    }
  }, [acctoken]);

  const setAcctoken = (token) => {
    setAcctoken_(token);
    localStorage.setItem("acctoken", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const setReftoken = (token) => {
    setReftoken_(token);
    localStorage.setItem("reftoken", token);
  };

  return (
    <Auth.Provider value={{ acctoken, setAcctoken, setReftoken }}>
      {children}
    </Auth.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(Auth);
