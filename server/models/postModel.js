const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    // required: true 
  },
  description: {
    type: String,
    // required: true
  },
  image: {
     type: String
    // url: String,
    // public_id: String
  },
  message: { 
    type: String, 
    // required: true 
  },
  tags: {type: [String]},
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date, 
    default: Date.now 
  },
  author: {
    type: String,
    default: 'Elton Claude'
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;