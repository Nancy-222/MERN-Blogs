const User = require('../models/userModel')
const Hasher = require('crypto')
const mongoose = require('mongoose')


//POST a new user
const createUser = async (req, res) => {
    const {firstName, lastName, email, password } = req.body
    try {
        //check that all fields are filled
        if (firstName != null && firstName != "" && lastName != null && lastName != "" && email != null && email != "" && password != null && password != '') {
            const user = await User.findOne({email: email})
            if (user == null)
            {
                //const hashedPassword = Hasher.createHash('sha1').update(password).digest('utf8')
                const user = await User.create({firstName, lastName, email, password})
                res.status(200).json(user)
            }
            else{
                res.status(400).json({ error: "Email already in use!" })
            }
        }
        else{
            res.status(400).json({ error: "All fields are required!" })
        }
        

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//Auth User
const authUser = async (req, res) => {
    const { email, password } = req.body
    try {
        //check that all fields are filled
        if (email != null && email != "" && password != null && password != '') {
            const user = await User.findOne({email: email, password: password})
            if (user != null)
            {
            
                res.status(200).json(user)
            }
            else{
                res.status(400).json({ error: "Wrong credentials, try again!" })
            }
        }
        else{
            res.status(400).json({ error: "All fields are required!" })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    createUser,
}