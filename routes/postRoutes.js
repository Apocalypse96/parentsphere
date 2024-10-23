const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Route to create a new post in a circle
router.post('/create', postController.createPost);

// Route to reply to a post
router.post('/:postId/reply', postController.replyToPost);

// Route to reply to a reply (create a thread)
router.post('/reply/:replyId', postController.replyToReply);

// Route to upvote or downvote a post or a reply
router.post('/vote', postController.vote);

module.exports = router;
