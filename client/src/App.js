import React from 'react';
import { AuthContextProvider } from './components/Context/AuthContext';
import Router from './Router'
import './style.css';





class App extends React.Component{
  
  render(){
    return (
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    )
  }
} ;
    
   
  

export default App;