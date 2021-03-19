const PostMessage = require('../models/postMessage.js');

//https://www.restapitutorial.com/httpstatiscodes.html - status code cheat sheet

const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    //this method takes time meaning this needs to be async method

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const createPost = async (req, res) => {
  const { author, title, message, tags, selectedFile } = req.body;

  const newPostMessage = new PostMessage({ author, title, message, tags, selectedFile })

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);

  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

module.exports = getPosts, createPost;