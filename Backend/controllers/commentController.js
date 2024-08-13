// controllers/commentController.js
const Comment = require('../models/commentModel');
const Blog = require('../models/blogModel');

// Create a new comment
const createComment = async (req, res) => {
    const { text } = req.body;
    const blogId = req.params.blogId;
    const userId = req.user._id; 

    try {
        const comment = await Comment.create({ text, postedBy: userId });
        const blog = await Blog.findById(blogId);

        blog.comments.push(comment._id);
        await blog.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get comments for a specific blog
const getComments = async (req, res) => {
    const blogId = req.params.blogId;

    try {
        const blog = await Blog.findById(blogId).populate({
            path: 'comments',
            populate: {
                path: 'postedBy',
                select: 'firstName lastName', 
            },
        });

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json(blog.comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createComment,
    getComments,
};
