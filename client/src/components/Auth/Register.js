import axios from 'axios';
import React from 'react';
import {useState} from 'react';
import '../PostForm.css';

function Register() {

  const [username, setUsername] = useState(""),
        [password, setPassword] = useState(""),
        [passwordVerify, setpasswordVerify] = useState("");
  
  async function register (e) {
    e.preventDefault();
    try {
      const registerData = {
        username,
        password,
        passwordVerify
      }

      await axios.post('http://localhost:5000/auth/register', registerData)
      .then(() => {
        console.log("user successfully created", registerData);
      }).catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }

  return (
  <div className="postForm-container">
    
    <form className="postForm" onSubmit={register}>
      <div className="internalPostForm-alignment">
        <h3 className="postForm-title">Register</h3>

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