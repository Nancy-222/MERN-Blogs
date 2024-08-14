const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type:String,
    required: true
  },
  authorid: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blogid: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  content: {
    type: String,
    required: true, 
  },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comment', commentSchema);
