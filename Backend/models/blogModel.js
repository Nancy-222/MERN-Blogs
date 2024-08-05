const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upvotes:{
        type: Number,
        required: false,
        default: 0
    },
    downvotes:{
        type: Number,
        required: false,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Blog', blogSchema)

