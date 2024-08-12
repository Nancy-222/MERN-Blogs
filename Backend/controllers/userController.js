const User = require('../models/userModel')
const crypto = require('crypto')
const mongoose = require('mongoose')

const jwt = require("jsonwebtoken")


//GET all users
const getUsers = async (req,res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}

//GET a user
const getUser = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such user'})
    }
    const user = await User.findById(id)

    if (!user){
        return res.status(404).json({error: 'No such user'})
    }
    res.status(200).json(user)

}

//POST a new user
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
// const authUser = async (req, res) => {
//     const { email, password } = req.body;
    
//     try {
//         if (email && password) {
//             const user = await User.findOne({ email });
//             if (user) {
//                 const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
//                 if (user.password === hashedPassword) {
//                     res.status(200).json({ loggedIn: user.email });
//                 } else {
//                     res.status(400).json({ error: "Wrong credentials, try again!" });
//                 }
//             } else {
//                 res.status(400).json({ error: "Wrong credentials, try again!" });
//             }
//         } else {
//             res.status(400).json({ error: "All fields are required!" });
//         }
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }


const authUser = async (req, res) => {
    console.log('authUser function has been called');  // Log to check if the function is called

    const { email, password } = req.body;
    console.log('Request body:', { email, password });  // Log the received email and password

    try {
        // Check that all fields are filled
        if (email != null && email != "" && password != null && password != "") {
            console.log('Email and password are provided');

            const user = await User.findOne({ email: email });
            console.log('User found:', user);  // Log the user object returned from the database

            if (user != null) {
                const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
                console.log('Hashed password:', hashedPassword);  // Log the hashed password

                if (user.password === hashedPassword) {
                    const token = jwt.sign(
                        { id: user._id },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );
                    console.log('JWT token generated:', token);  // Log the generated JWT token

                    res.status(200)
                        .cookie("access_token", token, {
                            httpOnly: true,
                        })
                        .json({ loggedIn: user.email });
                    console.log('User successfully logged in');  // Log success message
                } else {
                    console.log('Password mismatch');  // Log when passwords do not match
                    res.status(400).json({ error: "Wrong credentials, try again!" });
                }
            } else {
                console.log('User not found');  // Log when user is not found in the database
                res.status(400).json({ error: "Wrong credentials, try again!" });
            }
        } else {
            console.log('Missing fields');  // Log when required fields are missing
            res.status(400).json({ error: "All fields are required!" });
        }
    } catch (error) {
        console.error('Error during login:', error);  // Log any error that occurs
        res.status(400).json({ error: error.message });
    }
};


const deleteUser = async (req,res) => {
    const { id } = req.params

    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such user'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user){
        return res.status(400).json({error: 'No such user'})
    }

    res.status(200).json(user)
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    authUser,
    deleteUser
}