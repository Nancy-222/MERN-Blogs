const express = require('express')
const{getBlogs, getBlog, createBlog, deleteBlog, updateBlog, upvoteBlog, downvoteBlog} = require('../controllers/blogController')
const{createUser, authUser} = require('../controllers/userController')
const {sendSupportMail} = require('../controllers/mailController')

const router = express.Router();

// GET all blogs
router.get('/', getBlogs);

// GET a single blog
router.get('/:id', getBlog);

// POST a new blog
router.post('/', createBlog);

// DELETE a blog
router.delete('/:id', deleteBlog);

//UPDATE a blog
router.patch('/:id', updateBlog)
router.patch('/:id/upvote', upvoteBlog)
router.patch('/:id/downvote', downvoteBlog)

//CREATE a user
router.post('/users/create', createUser)

//AUTHENTICATE a user
router.post('/users/auth', authUser)

// router.post('/blogs', async (req, res) => {
//     const { title, content } = req.body;

//     // Check if title and content are provided
//     if (!title || !content) {
//         return res.status(400).json({ error: 'Both name and content are required!' });
//     }

//     try {
//         const newBlog = new Blog({ title, content });
//         await newBlog.save();
//         res.status(201).json(newBlog);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to create blog.' });
//     }
// });

//Send an email
router.post('/support', sendSupportMail)

module.exports = router;

