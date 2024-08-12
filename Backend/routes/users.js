const express = require('express')
const{ getUsers, getUser, createUser, authUser, deleteUser} = require('../controllers/userController')

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

// router.get('/:id/posts', getUserPosts);

// router.get (/:id/friends', getUserFriends);

router.post('/create', createUser);

router.post('/login', authUser);

router.delete('/:id', deleteUser);

// router.patch('/:id/friends', addFriend);
// router.patch('/:id/friends', removeFriend);

module.exports = router;
