// routes/commentRoutes.js

const express = require('express');
const { createComment, getComments } = require('../controllers/commentController');
const requireAuth = require('../middleware/requireAuth'); // Middleware to protect routes

const router = express.Router();

router.post('/blogs/:blogId/comments', requireAuth, createComment);
router.get('/blogs/:blogId/comments', getComments);

module.exports = router;
