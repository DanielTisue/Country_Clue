import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

function AuthContextProvider (props) {
  const [loggedIn, setLoggedIn] = useState(""),
        [loading, setLoading] = useState(true);

  async function getLoggedIn() {
    try {
      const loggedInRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/loggedIn`);
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