const express = require('express');
const Post = require('../models/postModel');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.post('/', async (req, res) => {
	// retrieve data
	const { title, description, image, message, tags, createdAt, author } = req.body;

	//construct postModel
	const newPost = new Post({
		title,
		description,
		image,
		message,
		tags,
		createdAt,
		author
	});
	//save it
  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

router.get('/:id/edit', async (req, res) => {
  res.send('This works');
});

module.exports = router;
