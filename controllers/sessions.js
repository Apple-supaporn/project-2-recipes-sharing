const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/users')


// router.get('/new', (req, res) => {
//     try {
//         res.render('sessions/new.ejs', {
//             currentUser: req.session.currentUser
//         })
//     } catch(error) {
//         console.error(error)
//         res.send('Oops! Something went wrong. Please try again.')
//     }
// })
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser,
        message: null
    });
});


// router.post('/', async (req, res) => {
//     try {
//         const foundUser = await User.findOne({ username: req.body.username })
//         if (!foundUser) {
//             res.send('<a href="/sessions/new">Sorry, no user found. Please check your username.</a>')
//         } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
//             req.session.currentUser = foundUser
//             res.redirect('/')
//         } else {
//             res.send('<a href="/sessions/new">Password does not match. Please double check your password. </a>')
//         }
//     } catch(error) {
//         console.error(error)
//         res.send('Oops! Something went wrong. Please try again.')
//     }
// })
router.post('/', async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username })
        if (!foundUser) {
            res.render('sessions/new.ejs', {
                currentUser: req.session.currentUser,
                message: 'Login failed! Invalid username or password.'
        })
     } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser
            res.redirect('/')
        } else {
            res.render('sessions/new.ejs', {
            currentUser: req.session.currentUser,
            message: 'Login failed! Invalid username or password.'
        })
    }
    } catch(error) {
        console.error(error)
        res.send('Oops! Something went wrong. Please try again.')
    }
})


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