const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel'); // Import the Comment model
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// GET all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.status(200).json(blogs);
};

// GET a single blog
const getBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such blog' });
  }
  const blog = await Blog.findById(id)
    .populate('comments'); // Populate comments with full comment details

  if (!blog) {
    return res.status(404).json({ error: 'No such blog' });
  }
  res.status(200).json(blog);
};

// POST a new blog
const createBlog = async (req, res) => {
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now());
    },
  });

  var upload = multer({ storage: storage });

  var image = {
    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    contentType: 'image/png',
  };

  const { title, content, upvotes, downvotes } = req.body;
  if (content === '<p><br></p>') {
    return res.status(400).json({ error: 'Both title and content are required!' });
  }
  if (!title || !content) {
    return res.status(400).json({ error: 'Both title and content are required!' });
  }
  
  // Add to the database
  try {
    const blog = await Blog.create({ title, content, upvotes, downvotes, image });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such blog' });
  }

  const blog = await Blog.findOneAndDelete({ _id: id });

  if (!blog) {
    return res.status(400).json({ error: 'No such blog' });
  }

  res.status(200).json(blog);
};

// UPDATE a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such blog' });
  }

  const blog = await Blog.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!blog) {
    return res.status(400).json({ error: 'No such blog' });
  }

  res.status(200).json(blog);
};

// UPVOTE a blog
const upvoteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'No such blog' });
    }
    blog.upvotes += 1;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DOWNVOTE a blog
const downvoteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'No such blog' });
    }
    blog.downvotes += 1;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ADD a comment to a blog
const comment = async (req, res) => {
  const { id } = req.params;
  const { text, user } = req.body;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'No such blog' });
    }

    // Create a new comment document
    const newComment = new Comment({
      text,
      postedBy: user, // Assuming user is the ID of the user posting the comment
    });

    // Save the comment to the database
    await newComment.save();

    // Add the comment's ObjectId to the blog's comments array
    blog.comments.push(newComment._id);

    // Save the updated blog
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// REMOVE a comment from a blog
const uncomment = async (req, res) => {
  const { id, commentId } = req.params; // commentId is the ID of the comment to delete

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'No such blog' });
    }

    // Find and remove the comment document
    const comment = await Comment.findByIdAndRemove(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Remove the comment's ObjectId from the blog's comments array
    blog.comments = blog.comments.filter((comment) => comment.toString() !== commentId);

    // Save the updated blog
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export the functions as a module
module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  upvoteBlog,
  downvoteBlog,
  comment,
  uncomment
};
