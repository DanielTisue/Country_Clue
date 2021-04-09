const express = require('express');
const Post = require('../models/postModel');

const router = express.Router();

// CREATE
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

// GET
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

//GET SINGLE POST
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.json(post);
	} catch (error) {
		console.log(error);
	}
});

//UPDATE POST
router.put('/:id', (req, res, next) => {
 Post.findByIdAndUpdate(req.params.id, { $set: req.body }, async (err, data) => {
  try {
      await res.json(data);
      console.log('Post updated successfully !');
			res.redirect("http://localhost:3000/post/:id");
    }catch (err) {
      console.log(err);
    } 
    });
});

//DELETE POST
// router.delete('/:id', (req, res) => {
// 	Post.findByIdAndRemove(req.params.id);
// });

module.exports = router;
