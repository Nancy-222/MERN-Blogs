const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
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
})


userSchema.statics.signup = async function(firstName, lastName, email, password) {

    // validation

    if (!firstName || !lastName || !email || !password) {
      throw Error('All fields must be filled')
    }
    const exists = await this.findOne({ email })
  
    if (exists) {
      throw Error('Email already in use')
    }

    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    // if (!validator.isStrongPassword(password)) {
    //   throw Error('Password not strong enough')
    // }
    if (password.length < 8) {
        throw Error('Password not strong enough')
      }  

  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  
    const user = await this.create({ firstName, lastName, email, password: hash })
  
    return user
  }

  userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Credentials are incorrect1')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Credentials are incorrect2')
    }
  
    return user
  }

module.exports = mongoose.model('User', userSchema)

