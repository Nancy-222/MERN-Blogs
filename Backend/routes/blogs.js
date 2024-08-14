const express = require('express');
const {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  upvoteBlog,
  downvoteBlog,
  getBlogComments,
  saveBlog,
  getSavedBlogs
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
router.patch('/:id/content', requireAuth, updateBlog);

// UPVOTE a blog
router.patch('/:id/upvote', requireAuth, upvoteBlog);

// DOWNVOTE a blog
router.patch('/:id/downvote', requireAuth, downvoteBlog);

// SAVE a blog
router.patch('/:id/save', requireAuth, saveBlog);

// GET saved blogs
router.get('/getSaved', requireAuth, getSavedBlogs);

// SAVE a blog
router.patch('/:id/save', requireAuth, saveBlog);

// GET saved blogs
router.get('/getSaved', requireAuth, getSavedBlogs);

//GET blog comments
router.get('/:id/comments', getBlogComments)

// Send an email to support
router.post('/support', sendSupportMail);

module.exports = router;
