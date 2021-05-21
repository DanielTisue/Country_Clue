require('dotenv').config({ path: '../../.env' });
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');


router.post('/register', (req, res) => {
  res.send("test");
});


router.get('/register', (req, res) => {
  res.send("This thig on ?");
});



module.exports = router;