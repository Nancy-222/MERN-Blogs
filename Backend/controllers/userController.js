const User = require('../models/userModel')
const mongoose = require('mongoose')

const jwt = require("jsonwebtoken")


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d'})
}

// GET all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET a user
const getUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' });
    }
    const user = await User.findById(id)

    if (!user){
        return res.status(404).json({error: 'No such user'})
    }
    res.status(200).json(user)

}

//POST a new user
const signupUser = async (req, res) => {
    const { firstName, lastName, email, password, country, phoneNumber, bio } = req.body;

    try {
    const user = await User.signup(firstName, lastName, email, password)

    // create a token
    const token = createToken(user._id)
    const name = `${user.firstName} ${user.lastName}`

    res.status(200).json({email, token, name})
    } catch (error) {
    res.status(400).json({error: error.message})
    }
};


//Auth User
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    const name = `${user.firstName} ${user.lastName}`
    res.status(200).json({email, token, name})
    } catch (error) {
    res.status(400).json({error: error.message})
    }
}


const deleteUser = async (req,res) => {
    const { id } = req.params

    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such user'})
    }

    try {
        const user = await User.findOneAndDelete({ _id: id });

        if (!user) {
            return res.status(400).json({ error: 'No such user' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    signupUser,
    loginUser,
    deleteUser
};
