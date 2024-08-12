const express = require('express');
const {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  upvoteBlog,
  downvoteBlog,
  comment,
  uncomment
} = require('../controllers/blogController');
const {
  createUser,
  authUser
} = require('../controllers/userController');
const { sendSupportMail } = require('../controllers/mailController');

const router = express.Router();

// GET all blogs
router.get('/', getBlogs);

// GET a single blog
router.get('/:id', getBlog);

// POST a new blog
router.post('/', createBlog);

// DELETE a blog
router.delete('/:id', deleteBlog);

// UPDATE a blog
router.patch('/:id', updateBlog);

// UPVOTE a blog
router.patch('/:id/upvote', upvoteBlog);

// DOWNVOTE a blog
router.patch('/:id/downvote', downvoteBlog);

// ADD a comment to a blog
router.patch('/:id/comment', comment);

// REMOVE a comment from a blog
router.patch('/:id/uncomment', uncomment);

// CREATE a user
router.post('/users/create', createUser);

// AUTHENTICATE a user
router.post('/users/auth', authUser);

// Send an email to support
router.post('/support', sendSupportMail);

module.exports = router;
