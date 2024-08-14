const express = require('express');
const {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  upvoteBlog,
  downvoteBlog,
  saveBlog,
  getBlogComments
} = require('../controllers/blogController');
const requireAuth = require('../middleware/requireAuth')
const { sendSupportMail } = require('../controllers/mailController');

const router = express.Router();


//middleware for file upload handling
const multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './controllers/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
var upload = multer({ storage: storage });




// router.use(requireAuth);

// GET all blogs
router.get('/', getBlogs);

// GET a single blog
router.get('/:id', getBlog);

// POST a new blog
router.post('/', [requireAuth, upload.single('image')] , createBlog);

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

//GET blog comments
router.get('/:id/comments', getBlogComments)

// Send an email to support
router.post('/support', sendSupportMail);

module.exports = router;
