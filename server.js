require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const mongoURI = process.env.MONGO_URI


//Import controllers
const recipesController = require('./controllers/recipes')
const userController = require('./controllers/users')
const sessionsController = require('./controllers/sessions')


//Middleware
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


//Set up session
app.use(
    session({
        secret: process.env.SECRET, //Session secret key
        resave: false,
        saveUninitialized: false
    })
)


//Connect to MongoDB
mongoose.connect(mongoURI)


//MongoDB connection
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + 'error with mongo connection'))
db.on('connected', () => console.log('mongo is connected'))
db.on('disconnected', () => console.log('mongo disconnected'))


app.get('/', (req, res) => {
    res.redirect('/recipes')
})


//Use controllers for specific routes
app.use('/recipes', recipesController)
app.use('/users', userController)
app.use('/sessions', sessionsController)


app.use((req, res) => {
    res.send('404 ERROR')
})


app.listen(PORT, () => {
    console.log(`recipes is listening on ${PORT}`)
})