require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogs')

// Express APP
const app = express()

// Middleware
app.use(express.json()) 

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/blogs', blogRoutes)

//Connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //Listener
        app.listen(process.env.PORT, () => {
            console.log('Connected to db, listening on port', process.env.PORT)
        }) 
    })
    .catch((error) => {
        console.log(error)
    })


