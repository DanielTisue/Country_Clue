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
						//possibly change to 'allowed_formats: [jpeg, jpg, png] as outlined in Cloudinary docs -https://cloudinary.com/documentation/image_upload_api_reference#upload_method'. The below is not working!
						allowedFormats: ["jpeg", "jpg", "png"],
//** Try instead format: option as format: async(req, file) => { 
	//            																								"jpg", "jpeg", "png";
//																															} 
						format: async () => "jpg",
						transformation: [{ width: 800, crop: 'scale' }],

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
					// console.log(savedPost);
					res.json(savedPost);
					res.status(201).json({ success: 'Your post has been successfully created'}).send( success.message );
  } catch (error) {
    console.log(error);
		res.status(500).json( { error: error.status + 'Your post has not been created. Contact your site admin'}).send( error.message );
  }
});

// GET All POSTS
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find({}).sort( { _id: -1 });
		res.json(posts);
		res.status(200).json()
	} catch (err) {
		console.log(err);
		res.status(500).json().send();
	}
  
});

//GET SINGLE POST
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.json(post);
		res.status(200).json();
	} catch (error) {
		console.log(error);
		res.status(404).json( { error: error.status + 'This post no longer exists.'}).send( error.message );
	}
});

//UPDATE POST
router.put('/:id', auth, upload.single("image"), async (req, res) => {
   try {
		let post = await Post.findById(req.params.id);

		if(!post) {
			res.status(404).json( { error: error.status + 'This post no longer exists.'}).send( error.message );
		}

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
				res.json(updatedPost);
		} else {
			let updatedPost = {
					title: req.body.title,
					description: req.body.description,					
					message: req.body.message,
				  tags: req.body.tags
			}
			await Post.findByIdAndUpdate(req.params.id, updatedPost, { new: true });
			res.json(updatedPost);
		}
	 
			
	} catch (err) {
		console.log(err);
		res.status(500).json().send();
	}

  });


//DELETE POST
router.delete('/:id', auth, async (req, res) => {
		try {		
			let post = await Post.findById(req.params.id);
			await cloudinary.uploader.destroy(post.image_id)
			await post.remove();
			res.json(post);
			res.status(200).json({ success: 'Your post has been successfully deleted!' }).send( success.message )
		} catch(err) {
			res.status(500).json().send();
		}
});

module.exports = router;
