require('dotenv').config({ path: '../../.env' });
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Post = require('../models/postModel');
const auth = require('../middleware/auth');

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
						allowedFormats: ["jpeg", "jpg", "png"],
						format: async () => "jpg",
						transformation: [{ width: 800, crop: 'scale' }],

					}
});
const upload = multer({ storage: storage });

// CREATE 
router.post('/', upload.single("image"), async (req, res) => {
	try {
				const title = req.body.title,
							description = req.body.description,
							image = req.file.path,
							image_id = req.file.filename,					
							message = req.body.message,
							tags = req.body.tags;

				const newPost = new Post({
							title,
							description,
							image,
							image_id,
							message,
							tags
						});

				//save it
					const savedPost = await newPost.save();
					console.log(savedPost);
					res.json(savedPost);
  } catch (error) {
    console.log(error);
  }
});

// GET All POSTS
router.get('/', async (req, res) => {
  const posts = await Post.find({}).sort( { _id: -1 });
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
router.put('/:id', upload.single("image"), async (req, res) => {
   try {
		let post = await Post.findById(req.params.id);
		if (req.file) {
				await cloudinary.uploader.destroy(post.image_id);
				let updatedPost = {
					title: req.body.title,
					description: req.body.description,
					image: req.file.path,
					image_id: req.file.filename,					
					message: req.body.message
				}
				post = await Post.findByIdAndUpdate(req.params.id, updatedPost, { new: true });
				res.json(updatedPost);
		} else {
			let updatedPost = {
					title: req.body.title,
					description: req.body.description,					
					message: req.body.message
			}
			await Post.findByIdAndUpdate(req.params.id, updatedPost, { new: true });
			res.json(updatedPost);
		}
	 
			
	} catch (err) {
		console.log(err);
	}

  });


//DELETE POST
router.delete('/:id', async (req, res) => {
		try {		
			let post = await Post.findById(req.params.id);
			await cloudinary.uploader.destroy(post.image_id)
			await post.remove();
			res.json(post);
		} catch(err) {
			console.log(err);
		}
});

module.exports = router;
