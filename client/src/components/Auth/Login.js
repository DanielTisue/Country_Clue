import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/Form.css';
import AuthContext from '../Context/AuthContext';

axios.defaults.withCredentials = true;

function Login() {


  const [username, setUsername] = useState(""),
        [password, setPassword] = useState(""),
        [error, setError] = useState(null);

  const { getLoggedIn } = useContext(AuthContext);
       
  let history = useHistory();

  async function loggingIn (e) {
    e.preventDefault();
    try {
      const loginData = {
        username,
        password
      }

      await axios.post('http://localhost:5000/auth/login', loginData, { withCredentials: true })
      console.log("user successfully logged in", loginData);
      getLoggedIn()
      history.push('/');
       
    } catch (err) {
      // console.log(err);
       if(err.response.status === 400) {
        setError(err.response.data.errorMessage)
      } else if (err.response.status === 500) {
        setError('Status: 500 - There is a problem with the server. Please contact your site admin')
      } else if (err.response.status === 404) {
        setError('Status: 404 - The database can not be found. Please contact your site admin.')
      } 
    }
  }

  return (
  <div className="postForm-container">
    
    <form className="postForm" onSubmit={loggingIn}>
      <div className="internalPostForm-alignment">
        { error && <div className="error-message-wrapper"><div className="error-message">{ error }</div></div> }
        <h1 className="postForm-title">Login</h1>

        <div className="postForm-item" id="postForm-item-1">
          <label>Username</label>
          <input type="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="postForm-item" >
          <label>Password</label>
          <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="postForm-item" >
          <button className="postForm-button" type="submit">Login</button>
        </div>
      
      </div>
    </form>
  </div>
  )}

export default Login;