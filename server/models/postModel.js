const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
     type: String,
     required: true,
  },
  image_id: {
    type: String
  },
  message: { 
    type: String, 
    required: true,
  },
  tags: {type: [String]},
  createdAt: {
    type: Date, 
    default: Date.now 
  },
  author: {
    type: String,
    default: 'Elton Claude'
  },
  likes: {
    type: Number
  }
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;