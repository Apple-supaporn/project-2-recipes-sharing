const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')


//INDUCES
//INDEX
// router.get('/new', (req, res) => {
//     res.render('users/new.ejs', {
//         currentUser: req.session.currentUser
//     })
// })
router.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser,
        message: null
    })
})


//NEW


//DELETE


//UPDATE


//CREATE
// router.post('/', async (req, res) => {
//     req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
//     const newUser = await User.create(req.body)
//     res.redirect('/')
// })
router.post('/', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    try {
        const newUser = await User.create(req.body)
        res.render('users/new.ejs', {
            currentUser: req.session.currentUser,
            message: 'Sign up successful! You can now '
        })
    } catch (error) {
        //console.log(error)
        res.render('users/new.ejs', {
            currentUser: req.session.currentUser,
            message: 'Oops! Something went wrong. Please try again.'
        })
    }
})


//EDIT


//SHOW


module.exports = router