const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type:String,
        required: true
    },
    authorid: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true, // Content can be formatted HTML
    },
    upvotes: {
        type: Number,
        default: 0, // Default value for upvotes
    },
    downvotes: {
        type: Number,
        default: 0, // Default value for downvotes
    },
    image: {
        type:String,
        required: false
    },
    saves: {
        type: Number,
        default: 0, // Default value for downvotes
    },
    upvotedBy: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }],
  
    downvotedBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ]
    
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Blog', blogSchema);
