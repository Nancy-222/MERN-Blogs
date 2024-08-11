const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true // Content can be formatted HTML
    },
    upvotes: {
        type: Number,
        default: 0 // Default value for upvotes
    },
    downvotes: {
        type: Number,
        default: 0 // Default value for downvotes
    },
    image:{
        data: Buffer,
        contentType: String
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Blog', blogSchema);
