import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

function AuthContextProvider (props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {

    try {
      const loggedInRes = await axios.get("http://localhost:5000/auth/loggedIn");
      setLoggedIn(loggedInRes.data)
    } catch (err) {
      console.log(err)
    }
    
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };