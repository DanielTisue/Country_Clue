require('dotenv').config({ path: '../../.env' });
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Post = require('../models/postModel');

const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
	cloud_name: process.env.CLOUDNAME,
	api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
})

const storage =  new CloudinaryStorage({
  cloudinary: cloudinary,
	params: {
						folder: "countryClue",
						public_id: (req, file) => file.filename,
						format: async () => "jpg",
						allowedFormats: ["jpeg", "jpg", "png"],
					}
});
const upload = multer({ storage: storage });

// CREATE 
router.post('/', upload.single("image"), async (req, res) => {
	try {

				const title = req.body.title,
							description = req.body.description,
							image = { 
								url: req.file.path,
								public_id: req.file.path.public_id
							},
							message = req.body.message,
							tags = req.body.tags,
							createdAt = req.body.createdAt,
							author = req.body.author

							console.log(image);

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
					const savedPost = await newPost.save();
					res.json(savedPost);
					console.log(req.body.image);
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
