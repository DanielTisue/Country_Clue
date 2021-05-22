require('dotenv').config({ path: '../../.env' });
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Register User
router.post('/register', async (req, res) => {
  
  try{
    const { username, password, passwordVerify } = req.body;

    //Validate
    if(!username || !password || !passwordVerify) {
      return res.status(400).json ({ errMessage : "Please enter all required fields!" });
    }

    if(password.length < 6 ) {
      return res.status(400).json ({ errMessage : "Please make sure your password is longer than 6 characters." });
    }

    if(password != passwordVerify ) {
      return res.status(400).json ({ errMessage : "Please make sure your passwords match." });
    }

    const existingUser = await User.findOne({ username: username });
    if(existingUser) {
      return res.status(400).json ({ errMessage : "An account with this username already exixts :(" });
    }

    //password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    console.log(passwordHash);

    //Save new User
    const newUser = new User({ username, password });
    const savedUser = await newUser.save();
    res.json(savedUser);


    //Log user in right away - Create & assign a token
    const token = jwt.sign({
      user: savedUser._id
    }, process.env.SERIALIZE_CONFIG);

    res.cookie('token', token, {
      httpOnly: true,
    }).send();

  } catch (err) {
    console.log(err);
    res.status(500).send();
  }

});

//Login User
router.post('/login', async (req, res) => {
  
  try {
    const { username, password } = req.body;

     //Validate
    if(!username || !password) {
      return res.status(400).json ({ errMessage : "Please enter all required fields!" });
    }

    const existingUser = await User.findOne({ username });
    //Check for username
    if(!existingUser) {
      return res.status(401).json ({ errMessage : "Incorrect username or password. Please try again." });
    }

    const passwordUsed = await bcrypt.compare(password, existingUser.password);
    //Check for password
    if(!passwordUsed) {
      return res.status(401).json ({ errMessage : "Incorrect username or password. Please try again." });
    }

    //Create & assign a token
    const token = jwt.sign({
      user: existingUser._id
    }, process.env.SERIALIZE_CONFIG);

    res.cookie('token', token, {
      httpOnly: true,
    }).send();

  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get('/logout', (req, res) => {
  res.cookie('token', "", {
    httpOnly: true,
    expires: new Date(0)
    })
    .send();
});

module.exports = router;