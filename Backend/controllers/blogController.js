// const Blog = require('../models/blogModel');
// const Comment = require('../models/commentModel'); // Import the Comment model
// const mongoose = require('mongoose');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// // GET all blogs
// const getBlogs = async (req, res) => {
//   const blogs = await Blog.find({}).sort({ createdAt: -1 });
//   res.status(200).json(blogs);
// };

// // GET a single blog
// const getBlog = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: 'No such blog' });
//   }
//   const blog = await Blog.findById(id)
//     .populate('comments'); // Populate comments with full comment details

//   if (!blog) {
//     return res.status(404).json({ error: 'No such blog' });
//   }
//   res.status(200).json(blog);
// };

// // POST a new blog
// const createBlog = async (req, res) => {
//   var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now());
//     },
//   });

//   var upload = multer({ storage: storage });

//   var image = {
//     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//     contentType: 'image/png',
//   };

//   const { title, content, upvotes, downvotes } = req.body;
//   if (content === '<p><br></p>') {
//     return res.status(400).json({ error: 'Both title and content are required!' });
//   }
//   if (!title || !content) {
//     return res.status(400).json({ error: 'Both title and content are required!' });
//   }
  
//   // Add to the database
//   try {
//     const blog = await Blog.create({ title, content, upvotes, downvotes, image });
//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // DELETE a blog
// const deleteBlog = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: 'No such blog' });
//   }

//   const blog = await Blog.findOneAndDelete({ _id: id });

//   if (!blog) {
//     return res.status(400).json({ error: 'No such blog' });
//   }

//   res.status(200).json(blog);
// };

// // UPDATE a blog
// const updateBlog = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: 'No such blog' });
//   }

//   const blog = await Blog.findOneAndUpdate({ _id: id }, { ...req.body });

//   if (!blog) {
//     return res.status(400).json({ error: 'No such blog' });
//   }

//   res.status(200).json(blog);
// };

// // UPVOTE a blog
// const upvoteBlog = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const blog = await Blog.findById(id);
//     if (!blog) {
//       return res.status(404).json({ error: 'No such blog' });
//     }
//     blog.upvotes += 1;
//     await blog.save();
//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // DOWNVOTE a blog
// const downvoteBlog = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const blog = await Blog.findById(id);
//     if (!blog) {
//       return res.status(404).json({ error: 'No such blog' });
//     }
//     blog.downvotes += 1;
//     await blog.save();
//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Export the functions as a module
// module.exports = {
//   getBlogs,
//   getBlog,
//   createBlog,
//   deleteBlog,
//   updateBlog,
//   upvoteBlog,
//   downvoteBlog,
//   comment,
//   uncomment
// };
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

  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const image = {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: req.file.mimetype,
    };

    const { title, content, upvotes = 0, downvotes = 0 } = req.body;
    if (content === '<p><br></p>') {
      return res.status(400).json({ error: 'Content cannot be empty!' });
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
  });
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

  const blog = await Blog.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

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

// POST a comment on a blog
const comment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such blog' });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'No such blog' });
    }

    const newComment = await Comment.create({ content, blog: id });
    blog.comments.push(newComment._id);
    await blog.save();

    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a comment from a blog
const uncomment = async (req, res) => {
  const { blogId, commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(blogId) || !mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ error: 'Invalid IDs' });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'No such blog' });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'No such comment' });
    }

    await Comment.findByIdAndDelete(commentId);
    blog.comments.pull(commentId);
    await blog.save();

    res.status(200).json({ message: 'Comment deleted' });
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
