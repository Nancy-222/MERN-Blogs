const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: false // Optional
    },
    phoneNumber: {
        type: String,
        required: false // Optional
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
