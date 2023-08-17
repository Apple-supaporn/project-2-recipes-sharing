require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const mongoURI = process.env.MONGO_URI


const recipesController = require('./controllers/recipes')

const userController = require('./controllers/users')

const sessionsController = require('./controllers/sessions')


//Middleware
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)

mongoose.connect(mongoURI)

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + 'error with mongo connection'))
db.on('connected', () => console.log('mongo is connected'))
db.on('disconnected', () => console.log('mongo disconnected'))


app.get('/', (req, res) => {
    res.render('home.ejs', {
        currentUser: req.session.currentUser
    })
})


app.use('/recipes', recipesController)
app.use('/users', userController)
app.use('/sessions', sessionsController)

app.use((req, res) => {
    res.send('404 ERROR')
})

app.listen(PORT, () => {
    console.log(`recipes is listening on ${PORT}`)
})