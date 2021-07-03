import React from 'react';
import { AuthContextProvider } from './components/Context/AuthContext';
import Router from './Router';
import axios from 'axios';
import './style.css';


axios.defaults.withCredentials = true;


function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}
    
   
  

export default App;