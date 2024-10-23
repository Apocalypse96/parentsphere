const Post = require('../models/Post');
const Reply = require('../models/Reply');
const Vote = require('../models/Vote');
const Circle = require('../models/Circle');

// API to create a new post in a social circle
exports.createPost = async (req, res) => {
    try {
        const { circle_id, parent_id, content } = req.body;

        // Check if the parent belongs to the circle
        const circle = await Circle.findByPk(circle_id, {
            include: ['Parents'], // Assuming association between circles and parents
        });

        if (!circle || !circle.Parents.some(parent => parent.id === parent_id)) {
            return res.status(403).json({ message: "You are not part of this circle" });
        }

        // Create the post
        const post = await Post.create({
            circle_id,
            parent_id,
            content,
        });

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Server error occurred while creating the post' });
    }
};

// API to post a reply to an existing post
exports.replyToPost = async (req, res) => {
    try {
        const { post_id, parent_id, content } = req.body;

        // Find the original post
        const post = await Post.findByPk(post_id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Create a reply
        const reply = await Reply.create({
            post_id,
            parent_id,
            content,
        });

        res.status(201).json({ message: 'Reply added successfully', reply });
    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).json({ message: 'Server error occurred while adding the reply' });
    }
};

// API to reply to a reply (create a thread)
exports.replyToReply = async (req, res) => {
    try {
        const { reply_id, parent_id, content } = req.body;

        // Find the original reply
        const originalReply = await Reply.findByPk(reply_id);

        if (!originalReply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        // Create a thread reply
        const reply = await Reply.create({
            post_id: originalReply.post_id, // Keep the thread tied to the original post
            parent_id,
            content,
            parent_reply_id: reply_id, // Link to the original reply
        });

        res.status(201).json({ message: 'Thread reply added successfully', reply });
    } catch (error) {
        console.error('Error adding thread reply:', error);
        res.status(500).json({ message: 'Server error occurred while adding the thread reply' });
    }
};

// API to upvote or downvote a post or a reply
exports.vote = async (req, res) => {
    try {
        const { post_id, reply_id, parent_id, vote_type } = req.body;

        // Ensure either post_id or reply_id is provided, but not both
        if (!post_id && !reply_id) {
            return res.status(400).json({ message: 'You must provide either a post ID or a reply ID' });
        }

        // Create a vote
        const vote = await Vote.create({
            post_id,
            reply_id,
            parent_id,
            vote_type, // upvote or downvote
        });

        res.status(201).json({ message: 'Vote recorded successfully', vote });
    } catch (error) {
        console.error('Error recording vote:', error);
        res.status(500).json({ message: 'Server error occurred while recording the vote' });
    }
};
