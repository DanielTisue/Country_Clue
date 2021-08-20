require('dotenv').config({ path: '../../.env' });
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER
router.post('/register', async (req, res) => {
  try{
    const { username, password, passwordVerify } = req.body;
    // Validate
    if(!username || !password || !passwordVerify) {
      return res.status(400).json({
        errorMessage: "Please enter all required fields!",
      }).send();
    }
    if(password.length < 6 ) {
      return res.status(400).json({
        errorMessage: "Please make sure your password is longer than 6 characters.",
      });
    }
    if(password != passwordVerify ) {
      return res.status(400).json({
        errorMessage: "Please make sure your passwords match.",
      });
    }
    const existingUser = await User.findOne({ username });
    if(existingUser) {
      return res.status(400).json({
        errorMessage: "An account with this username already exists 🤨",
      });
    }
    //Encrypt password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //Save new User
    const newUser = new User({ username: username, password: passwordHash });
    const savedUser = await newUser.save();
    //Log user in right away - Create & assign a token
    const token = jwt.sign({
      user: savedUser._id
    }, process.env.SERIALIZE_CONFIG);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    }).send();
    return res.status(201).json(savedUser).send('You have been successfully registered!');
  } catch (err) {
    res.status(500).send();
  }

});

//LOGIN
router.post('/login', async (req, res) => {
  
  try {
    const { username, password } = req.body;
     //Validate
    if(!username || !password) {
      return res.status(400).json({
        errorMessage: "Please enter all required fields!",
      }).send();
    }
    const existingUser = await User.findOne({ username });
    //Check for username
    if(!existingUser) {
      return res.status(400).json({
        errorMessage: "Incorrect username or password. Please try again.",
      }).send();
    }
    const passwordUsed = await bcrypt.compare(password, existingUser.password);
    //Check for password
    if(!passwordUsed) {
      return res.status(400).json({
        errorMessage: "Incorrect username or password. Please try again.",
      }).send();
    }
    //Create & assign a token
    const token = jwt.sign({
      user: existingUser._id
    }, process.env.SERIALIZE_CONFIG);
    // send the token in a HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    }).send();
  } catch (err) {
    res.status(500).send();
  }
});

// LOGOUT
router.get('/logout', (req, res) => {
  res.cookie('token', "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: "none",
    }).send();
});

// GETTING TOKEN
router.get('/loggedIn', (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);
    jwt.verify(token, process.env.SERIALIZE_CONFIG);
    res.send(true);
  } catch (err) {
    res.json(false);
  }
})

module.exports = router;