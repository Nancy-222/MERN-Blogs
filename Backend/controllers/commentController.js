// controllers/commentController.js
const Comment = require('../models/commentModel');
const Blog = require('../models/blogModel');

const createComment = async (req, res) => {
    const { content } = req.body;

    if (content === '<p><br></p>' || !content) {
        return res.status(400).json({ error: 'Comment cannot be blank' });
    }

    try {
        const { _id, firstName, lastName } = req.user;
        const author = `${firstName} ${lastName}`;
        const authorid = _id; 
        const blogid = req.body.blogid
        const comment = await Comment.create({ author, authorid, blogid, content });


        const blog = await Blog.findById(blogid);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        blog.comments.push(comment._id);
        await blog.save();

        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
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
