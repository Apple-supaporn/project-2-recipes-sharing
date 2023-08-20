const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')


//INDUCES
//INDEX
router.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser
    })
})


//NEW


//DELETE


//UPDATE


//CREATE
router.post('/', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    const newUser = await User.create(req.body)
    res.redirect('/')
})


//EDIT


//SHOW


module.exports = router