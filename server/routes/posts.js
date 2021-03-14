const express = require('express');
const router = express.Router();
const getPosts = require('../controllers/posts.js'),
      createPost = require('../controllers/posts.js');

router.get('/', getPosts);
router.post('/', createPost);

module.exports = router;