const User = require('../models/userModel');
const crypto = require('crypto');

// POST a new user
const createUser = async (req, res) => {
    const { firstName, lastName, email, password, country, phoneNumber } = req.body;
    
    try {
        // Check that all required fields are filled
        if (firstName && lastName && email && password) {
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    country,
                    phoneNumber
                });
                await newUser.save();
                res.status(200).json(newUser);
            } else {
                res.status(400).json({ error: "Email already in use!" });
            }
        } else {
            res.status(400).json({ error: "All fields are required!" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Auth User
const authUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        if (email && password) {
            const user = await User.findOne({ email });
            if (user) {
                const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
                if (user.password === hashedPassword) {
                    res.status(200).json({ loggedIn: user.email });
                } else {
                    res.status(400).json({ error: "Wrong credentials, try again!" });
                }
            } else {
                res.status(400).json({ error: "Wrong credentials, try again!" });
            }
        } else {
            res.status(400).json({ error: "All fields are required!" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    authUser
};
