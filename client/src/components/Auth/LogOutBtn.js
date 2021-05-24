import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';

function LogOutBtn() {

  const { getLoggedIn } = useContext(AuthContext);

  let history = useHistory();

  async function logOut() {
      await axios.get('http://localhost:5000/auth/logout');
      getLoggedIn();
      history.push('/');
  }
  return (
    <button onClick={logOut}>
      Log out
    </button>
  )
}

export default LogOutBtn;