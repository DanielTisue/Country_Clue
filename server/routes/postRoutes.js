const express = require('express');
const Post = require('../models/postModel');

const router = express.Router();



// CREATE - upload.single('image') ?
router.post('/',  async (req, res) => {
	// retrieve data
	const { title, description, image, message, tags, createdAt, author } = req.body;
	// req.body.image = {
	// 	url: req.file.secure_url,
	// 	public_id: req.file.public_id
	// }
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
router.put('/:id', function(req, res, next) {
  Post.findByIdAndUpdate(req.params.id, req.body, (err, updatedPost) => {
    if (err) {
			console.log(err);
			// return next(err);
		} 
    res.json(updatedPost);
  });
});

//DELETE POST
router.delete('/:id', (req, res) => {
	Post.findByIdAndRemove(req.params.id, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json({
				msg: data
			})
		}
	});
});

module.exports = router;
