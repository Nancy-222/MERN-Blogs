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
const requireAuth = require('../middleware/requireAuth')
const { sendSupportMail } = require('../controllers/mailController');

const router = express.Router();

// router.use(requireAuth);

// GET all blogs
router.get('/', getBlogs);

// GET a single blog
router.get('/:id', getBlog);

// POST a new blog
router.post('/',requireAuth, createBlog);

// DELETE a blog
router.delete('/:id', requireAuth, deleteBlog);

// UPDATE a blog
router.patch('/:id', requireAuth, updateBlog);

// UPVOTE a blog
router.patch('/:id/upvote', requireAuth, upvoteBlog);

// DOWNVOTE a blog
router.patch('/:id/downvote', requireAuth, downvoteBlog);

// // ADD a comment to a blog
// router.patch('/:id/comment', comment);

// // REMOVE a comment from a blog
// router.patch('/:id/uncomment', uncomment);

// Send an email to support
router.post('/support', sendSupportMail);

module.exports = router;
