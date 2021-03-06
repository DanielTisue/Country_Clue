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
						allowed_formats: ["jpeg", "jpg", "png"], 
				    format: async () => "jpg",
						transformation: [{ width: 500, crop: 'fit' }],

					}
});

const upload = multer({ storage: storage });

// CREATE 
router.post('/', auth, upload.single("image"), async (req, res) => {
	try {
				const title = req.body.title,
							description = req.body.description,
							image = req.file.path,
							image_id = req.file.filename,					
							message = req.body.message,
							tags = req.body.tags,
							likes = req.body.likes;

				const newPost = new Post({
							title,
							description,
							image,
							image_id,
							message,
							tags,
							likes
						});
				//save it
					const savedPost = await newPost.save();
					return res.status(200).json(savedPost);
  } catch (error) {
		return res.status(500).json({ errMessage: 'Your article could not be created because all fields are filled in.'}).send();
  }
});

// GET All POSTS
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find({}).sort({ _id: -1 });
		return res.status(200).json(posts);
	} catch (err) {
		return res.status(500).json({ errMessage: 'A problem occurred with the server. Please contact your site admin.'}).send();
	}
  
});

//GET SINGLE POST
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		return res.status(200).json(post);
	} catch (error) {
		return res.status(500).json({ errMessage: 'A problem occurred with the server. Please contact your site admin.'}).send();
	}
});

//UPDATE POST
//removed ,auth, - middleware 
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
					message: req.body.message,
					tags: req.body.tags
				}
				post = await Post.findByIdAndUpdate(req.params.id, updatedPost, { new: true });
				return res.status(200).json(updatedPost);
		} 
			let updatedPost = {
					title: req.body.title,
					description: req.body.description,					
					message: req.body.message,
				  tags: req.body.tags,
					likes: req.body.likes
			}
			await Post.findByIdAndUpdate(req.params.id, updatedPost, { new: true });
			return res.status(200).json(updatedPost);	
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errMessage: 'A problem occurred with the server. Please contact your site admin.'}).send();
	}
  });

//DELETE POST
router.delete('/:id', auth, async (req, res) => {
		try {		
			let post = await Post.findById(req.params.id);
			await cloudinary.uploader.destroy(post.image_id)
			await post.remove();
			return res.status(200).json(post);
		} catch(err) {
			return res.status(500).json({errorMessage: 'There is an issue with the server. Please contact your site admin.'}).send();
		}
});

module.exports = router;
