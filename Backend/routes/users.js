const express = require('express')
const{ getUsers, getUser, signupUser, loginUser, deleteUser } = require('../controllers/userController')

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

// router.get('/:id/posts', getUserPosts);

// router.get (/:id/friends', getUserFriends);

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.delete('/:id', deleteUser);

// router.patch('/:id/friends', addFriend);
// router.patch('/:id/friends', removeFriend);

module.exports = router;
