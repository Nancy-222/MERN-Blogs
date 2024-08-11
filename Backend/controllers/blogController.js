const Blog = require('../models/blogModel')
const mongoose = require('mongoose')
const multer = require('multer');
const fs = require('fs');

//GET all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 })
  res.status(200).json(blogs)
}

//GET a single blog

const getBlog = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such blog' })
  }
  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(404).json({ error: 'No such blog' })
  }
  res.status(200).json(blog)

}

//POST a new blog
const createBlog = async (req, res) => {
    
  var storage = multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, 'uploads')
      },
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + Date.now())
      }
  });
  
  var upload = multer({ storage: storage });

  var image = {
    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    contentType: 'image/png'
  }

  const { title, content, upvotes, downvotes } = req.body
  if (content === '<p><br></p>') {
    return res.status(400).json({ error: 'Both title and content are required!' });
  }
  if (!title || !content) {
    return res.status(400).json({ error: 'Both title and content are required!' });
  }
  // add to the database
  try {
    const blog = await Blog.create({ title, content, upvotes, downvotes, image })
    res.status(200).json(blog)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
//DELETE a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such blog' })
  }

  const blog = await Blog.findOneAndDelete({ _id: id })

  if (!blog) {
    return res.status(400).json({ error: 'No such blog' })
  }

  res.status(200).json(blog)
}

//UPDATE a blog
const updateBlog = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such blog' })
  }

  const blog = await Blog.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!blog) {
    return res.status(400).json({ error: 'No such blog' })
  }

  res.status(200).json(blog)
}

const upvoteBlog = async (req, res) => {
  const { id } = req.params

  try {
    const blog = await Blog.findById(id)
    if (!blog) {
      return res.status(404).json({ error: 'No such blog' })
    }
    blog.upvotes += 1
    await blog.save()
    res.status(200).json(blog)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

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

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  upvoteBlog,
  downvoteBlog
}