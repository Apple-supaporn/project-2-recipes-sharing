const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/users')


//Handle GET request for the login page
router.get('/new', (req, res) => {
    try {
        res.render('sessions/new.ejs', {
            currentUser: req.session.currentUser,
            message: null
        });
    } catch (error) {
        console.error(error)
        res.send('Oops! Something went wrong. Please try again.')
    }
});


//Handle POST request when user tries to log in
router.post('/', async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username })
        if (!foundUser) {
            res.render('sessions/new.ejs', {
                currentUser: req.session.currentUser,
                message: 'Sorry, no user found. Please check your username.'
            })
        } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser
            res.redirect('/')
        } else {
            res.render('sessions/new.ejs', {
                currentUser: req.session.currentUser,
                message: 'Password does not match. Please double check your password.'
            })
        }
    } catch(error) {
        console.error(error)
        res.send('Oops! Something went wrong. Please try again.')
    }
})


//Hendle delete session when user logs out
router.delete('/', (req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect('/recipes')
        })
    } catch(error) {
        console.error(error)
        res.send('Oops! Something went wrong. Please try again.')
    }
})


module.exports = router