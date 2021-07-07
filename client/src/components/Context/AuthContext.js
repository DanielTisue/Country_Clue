import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

function AuthContextProvider (props) {
  const [loggedIn, setLoggedIn] = useState(""),
        [loading, setLoading] = useState(true);

  // function getLoggedIn() {
  //     axios.get("http://localhost:5000/auth/loggedIn").then((res)=> {
  //       console.log('logged in res data', res.data)
  //       setLoggedIn(res.data)
  //       setLoading(false)
  //     }).catch((err) => {
  //       console.log('error getting login status')
  //       console.log(err)
  //     });  
  // }

  async function getLoggedIn() {

    try {
      const loggedInRes = await axios.get("http://localhost:5000/auth/loggedIn");
      setLoggedIn(loggedInRes.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
    
  }

  useEffect(() => {

    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };