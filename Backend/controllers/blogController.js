const Blog = require('../models/blogModel');
const User = require('../models/userModel')
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
  // const createBlog = async (req, res) => {
  //   // var storage = multer.diskStorage({
  //   //   destination: (req, file, cb) => {
  //   //     cb(null, 'uploads');
  //   //   },
  //   //   filename: (req, file, cb) => {
  //   //     cb(null, file.fieldname + '-' + Date.now());
  //   //   },
  //   // });

  //   // var upload = multer({ storage: storage });

  //   // var image = {
  //   //   // data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
  //   //   contentType: 'image/png',
  //   // };

  const createBlog = async (req, res) => {
    const { title, content, upvotes, downvotes } = req.body;

    if (!title || content === '<p><br></p>' || !content) {
        return res.status(400).json({ error: 'Both title and content are required!' });
    }

    try {
        const { _id, firstName, lastName } = req.user;
        const author = `${firstName} ${lastName}`;
        const authorid = _id;  

        const blog = await Blog.create({ title, content, author, authorid, upvotes, downvotes });

        res.status(200).json(blog);
        console.log('Blog created:', blog);

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

  const blog = await Blog.findById(id);

  if (!blog) {
      return res.status(400).json({ error: 'No such blog' });
  }

  if (blog.authorid.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You are not authorized to delete this blog' });
  }

  await Blog.findByIdAndDelete(id);

  await User.findByIdAndUpdate(req.user._id, { $pull: { posts: blog._id } });

  res.status(200).json(blog);
};

// UPDATE a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such blog' });
  }

  const blog = await Blog.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

  if (!blog) {
    return res.status(400).json({ error: 'No such blog' });
  }

  res.status(200).json(blog);
};


const upvoteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'No such blog' });
    }

    const userId = req.user._id;

    if (blog.upvotedBy.includes(userId)) {
      blog.upvotes -= 1;
      blog.upvotedBy.pull(userId);
    } else {
      blog.upvotes += 1;
      blog.upvotedBy.push(userId);
      
      if (blog.downvotedBy.includes(userId)) {
        blog.downvotes -= 1;
        blog.downvotedBy.pull(userId);
      }
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const downvoteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'No such blog' });
    }

    const userId = req.user._id;

    // Check if user has already downvoted
    if (blog.downvotedBy.includes(userId)) {
      // If already downvoted, remove the downvote
      blog.downvotes -= 1;
      blog.downvotedBy.pull(userId);
    } else {
      // If not downvoted, add the downvote and remove upvote if exists
      blog.downvotes += 1;
      blog.downvotedBy.push(userId);
      
      // If the user has upvoted, remove the upvote
      if (blog.upvotedBy.includes(userId)) {
        blog.upvotes -= 1;
        blog.upvotedBy.pull(userId);
      }
    }

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
  downvoteBlog
};
