const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/users')


router.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })
})


router.post('/', async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username })
        if (!foundUser) {
            res.send('<a href="/">Sorry, no user found</a>')
        } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser
            res.redirect('/')
        } else {
            res.send('<a href="/">Password does not match </a>')
        }
    } catch(err) {
        console.log(err)
        res.send('oops the db had a problem')
    }
})




router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/recipes')
    })
})

module.exports = router