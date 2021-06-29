import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import '../Styles/Form.css';

axios.defaults.withCredentials = true;

function Register() {

  const [username, setUsername] = useState(""),
        [password, setPassword] = useState(""),
        [passwordVerify, setpasswordVerify] = useState(""),
        [error, setError] = useState(null);


  const { getLoggedIn } = useContext(AuthContext);
  let history = useHistory();

  async function register (e) {
    e.preventDefault();
    try {
      const registerData = {
        username,
        password,
        passwordVerify
      }

      await axios.post('http://localhost:5000/auth/register', registerData, { withCredentials: true })
      await getLoggedIn()
      
      history.push('/');
     
    } catch (err) {
      // console.log(err.response.status)
      if(err.response.status === 400) {
        setError(err.response.data.errorMessage)
      } else if (err.response.status === 500) {
        setError('Status: 500 - There is a problem with the server. Please contact your site admin')
      } else if (err.response.status === 404) {
        setError('Status: 404 - The database can not be found. Please contact your site admin.')
      } 
    }
      // console.log(err)
    
  }

  return (
  <div className="postForm-container">
    
    <form className="postForm" onSubmit={register}>
      <div className="internalPostForm-alignment">
        { error && <div className="error-message-wrapper"><div className="error-message">{ error }</div></div> }
        <h1 className="postForm-title">Register</h1>

        <div className="postForm-item" id="postForm-item-1">
          <label>Username</label>
          <input type="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="postForm-item" >
          <label>Password</label>
          <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="postForm-item" >
          <label>Verify password</label>
          <input type="password" placeholder="Verify password" value={passwordVerify} onChange={(e) => setpasswordVerify(e.target.value)} />
        </div>

        <div className="postForm-item" >
          <button className="postForm-button" type="submit">Register</button>
        </div>
      
      </div>
    </form>
  </div>
  )}

export default Register;