require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogs')
const userRoutes = require('./routes/users')

// Express APP
const app = express()

// Middleware
const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))
app.use(express.json()) 

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)


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


