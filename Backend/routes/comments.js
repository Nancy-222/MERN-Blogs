const express = require('express');
const { createComment, 
    // getComments 
} = require('../controllers/commentController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/', requireAuth, createComment);

// router.get('/comments', getComments);

module.exports = router;
