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
    // Validate
    if(!username || !password || !passwordVerify) {
      console.log({ errMessage : "Please enter all required fields! 😑" });
      return res.status(400).json({
        errorMessage: "Please enter all required fields!",
      }).send();
    }

    if(password.length < 6 ) {
      console.log({ errMessage : "Please make sure your password is longer than 6 characters." });
      return res.status(400).json({
        errorMessage: "Please make sure your password is longer than 6 characters.",
      });
    }

    if(password != passwordVerify ) {
      console.log({ errMessage : "Please make sure your passwords match." });
      return res.status(400).json({
        errorMessage: "Please make sure your passwords match.",
      });
    }

    const existingUser = await User.findOne({ username });
    if(existingUser) {
      console.log({ errMessage : "An account with this username already exists 🤨" });
      return res.status(400).json({
        errorMessage: "An account with this username already exists 🤨",
      });
    }

    //Encrypt password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    // console.log(passwordHash);

    //Save new User
    const newUser = new User({ username: username, password: passwordHash });
    const savedUser = await newUser.save();
    // res.json(savedUser);

    //Log user in right away - Create & assign a token
    const token = jwt.sign({
      user: savedUser._id
    }, process.env.SERIALIZE_CONFIG);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    }).send();

  } catch (err) {
    res.status(500).json().send();
  }

});

//Login User
router.post('/login', async (req, res) => {
  
  try {
    const { username, password } = req.body;

     //Validate
    if(!username || !password) {
      console.log({ errMessage : "Please enter all required fields!" });
    }

    const existingUser = await User.findOne({ username });
    //Check for username
    if(!existingUser) {
      console.log({ errMessage : "Incorrect username or password. Please try again." });
    }

    const passwordUsed = await bcrypt.compare(password, existingUser.password);
    //Check for password
    if(!passwordUsed) {
      console.log({ errMessage : "Incorrect username or password. Please try again." });
    }

    //Create & assign a token
    const token = jwt.sign({
      user: existingUser._id
    }, process.env.SERIALIZE_CONFIG);

    res.cookie('token', token, {
      httpOnly: true,
    }).send();

    console.log("login sucessful");

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

router.get('/loggedIn', (req, res) => {
  try {
    const token = req.cookies.token;
    
    if(!token) {
      return res.json(false);
    }

    jwt.verify(token, process.env.SERIALIZE_CONFIG);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
})

module.exports = router;