const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipes')


const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}


//INDUCES

//INDEX
router.get('/', async (req, res) => {
    const foundRecipes = await Recipe.find({})
    //console.log(foundRecipes)
    res.render('index.ejs', {
        recipes: foundRecipes,
        currentUser: req.session.currentUser
    })
})

//NEW
router.get('/new', (req, res) => {
    res.render('new.ejs', {currentUser: req.session.currentUser})
})

//DELETE
router.delete('/:id', async (req, res) => {
    const recipe = await Recipe.findByIdAndDelete(req.params.id)
    res.redirect('/recipes')
})

//UPDATE
router.put('/:id', async (req, res) => {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true})
    console.log(updatedRecipe)
    res.redirect(`/recipes/${req.params.id}`)
})


//CREATE
router.post('/', async (req, res) => {
    try {
    const newRecipe = await Recipe.create(req.body)
    res.redirect('/recipes')
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

//EDIT
router.get('/:id/edit', async (req, res) => {
    const foundRecipe = await Recipe.findById(req.params.id)
    res.render('edit.ejs', {
        recipe: foundRecipe,
        currentUser: req.session.currentUser
    })
})


//SHOW
router.get('/:id', async (req, res) => {
    const foundRecipe = await Recipe.findById(req.params.id)
    res.render('show.ejs', {
        recipe: foundRecipe,
        currentUser: req.session.currentUser
    })
})


module.exports = router