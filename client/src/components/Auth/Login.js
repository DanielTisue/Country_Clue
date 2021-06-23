import axios from 'axios';
import React, {useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/Form.css';

axios.defaults.withCredentials = true;

function Login() {

  const [username, setUsername] = useState(""),
        [password, setPassword] = useState("");
       
  let history = useHistory();

  async function loggingIn (e) {
    e.preventDefault();
    try {
      const loginData = {
        username,
        password
      }

      await axios.post('http://localhost:5000/auth/login', loginData, { withCredentials: true })
      // console.log("user successfully logged in", loginData);
      history.push('/posts');
       
    } catch (err) {
      console.log(err);
    }
  }

  return (
  <div className="postForm-container">
    
    <form className="postForm" onSubmit={loggingIn}>
      <div className="internalPostForm-alignment">
        <h3 className="postForm-title">Login</h3>

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