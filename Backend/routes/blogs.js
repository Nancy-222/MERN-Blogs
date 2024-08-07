const express = require('express')
const{getBlogs, getBlog, createBlog, deleteBlog, updateBlog} = require('../controllers/blogController')
const{createUser, authUser} = require('../controllers/userController')

const router = express.Router()

//GET all blogs
router.get('/', getBlogs)

//GET a single blog
router.get('/:id', getBlog)

//POST a new blog
router.post('/', createBlog)

//DELETE a blog
router.delete('/:id', deleteBlog)

//UPDATE a blog
router.patch('/:id', updateBlog)

//CREATE a user
router.post('/users/create', createUser)

//AUTHENTICATE a user
router.post('/users/auth', authUser)

module.exports=router