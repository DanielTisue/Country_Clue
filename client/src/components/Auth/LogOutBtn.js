import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';

function LogOutBtn() {

  const { getLoggedIn } = useContext(AuthContext);

  const [error, setError] = useState(null);

  let history = useHistory();

  async function logOut() {
    try {
      await axios.get('http://localhost:5000/auth/logout');
      await getLoggedIn();
      history.push('/');
    }
    catch(err) {
       if (err.response.status === 500) {
        setError('Status: 500 - There is a problem with the server. Please contact your site admin')
      } 
      setError(err.response.data)
    }
  }
  return (
    <React.Fragment>
      { error && <div className="error-message-wrapper"><div className="error-message">{ error }</div></div> }
    <button className="secondary no-hover" onClick={logOut}>
      Log out
    </button>
    </React.Fragment>  
     
  )
}

export default LogOutBtn;