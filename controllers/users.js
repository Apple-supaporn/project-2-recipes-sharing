const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')


//Render the sign up page
router.get('/new', (req, res) => {
    try {
        res.render('users/new.ejs', {
            currentUser: req.session.currentUser,
            message: null
        })
    } catch (error) {
        console.error(error)
        res.send('Oops! Something went wrong. Please try again.')
    }
})


//Handle user sign up
router.post('/', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    try {
        const newUser = await User.create(req.body)
        res.render('users/new.ejs', {
            currentUser: req.session.currentUser,
            message: 'Sign up successful! You can now <a href="/sessions/new">login.</a>'
        })
    } catch (error) {
        res.render('users/new.ejs', {
            currentUser: req.session.currentUser,
            message: 'This username is already taken. Please pick a different username.'
        })
    }
})


module.exports = router