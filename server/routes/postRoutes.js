const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const Post = require('../models/postModel');

const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
	cloud_name: process.env.CLOUDNAME,
	api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
})

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "countryClue",
		format: async () => "png" || "jpg" || "gif" || "jpeg",
		public_id: (req, file) => file.filename
	}
})

const parser = multer({ storage: storage });


// CREATE 
router.post('/', parser.single("image"), async (req, res) => {
	// retrieve data
	 const { title, description, message, tags, createdAt, author } = req.body;
	 const image = req.file.path;
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
	console.log(newPost);
	//save it
  try {
    const savedPost = await newPost.save();
		console.log(savedPost);
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
