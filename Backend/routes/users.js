const express = require('express');
const { getUsers, getUser, getUserSaved, signupUser, loginUser, deleteUser, updateUser } = require('../controllers/userController');
const router = express.Router();

// Get all users
router.get('/', getUsers);

// Get a specific user by ID
router.get('/:id', getUser);

// Get a user's saved posts
router.get('/:id/saved', getUserSaved);

// User signup
router.post('/signup', signupUser);

// User login
router.post('/login', loginUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

// Update user data
router.put('/:id', updateUser); 

module.exports = router;
