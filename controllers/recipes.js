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


//INDEX
router.get('/', async (req, res) => {
    try {
        const foundRecipes = await Recipe.find({}).sort({createdAt: -1}).populate('owner') //.sort({createdAt: -1}) is the newest items will appear first
        res.render('index.ejs', {
            recipes: foundRecipes,
            currentUser: req.session.currentUser
        })   
    } catch(error) {
        console.error(error)
        res.send('Oops! Something went wrong. Please try again.')
    }
}) 


//NEW
router.get('/new', isAuthenticated, (req, res) => {
    try {
        res.render('new.ejs', {currentUser: req.session.currentUser})
    } catch(error) {
        console.error(error)
        res.send('Oops! Something went wrong. Please try again.')
    }
}) 


//DELETE
router.delete('/:id', isAuthenticated, async (req, res) => {
    try { 
        const recipe = await Recipe.findByIdAndDelete(req.params.id)
        res.redirect('/recipes')
    } catch(error) {
        console.error(error)
        res.send('Oops! Something went wrong. Please try again.')
    }
}) 


//UPDATE
router.put('/:id', async (req, res) => {
    try { 
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.redirect(`/recipes/${req.params.id}`)
    } catch(error) {
        console.error(error)
        res.send('Oops! Something went wrong. Please try again.')
    }
}) 


//CREATE
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const newRecipe = await Recipe.create({
            ...req.body,  //create a new object and populate it
            owner: req.session.currentUser._id  //assign the _id of user for the new recipe
        });
        res.redirect('/recipes')
    } catch(error) {
        console.error(error)
        res.send('Oops! Something went wrong. Please try again.')
    }
}) 


//EDIT
router.get('/:id/edit', isAuthenticated, async (req, res) => {
    try {
        const foundRecipe = await Recipe.findById(req.params.id)
        res.render('edit.ejs', {
            recipe: foundRecipe,
            currentUser: req.session.currentUser
        })
    } catch(error) {
        console.error(error)
        res.send('Oops! Something went wrong. Please try again.')
    }
}) 


//SEARCH
router.get('/search', async (req, res) => {
    const searchQuery = req.query.search
    try {
        const foundRecipes = await Recipe.find({
            $or: [  //use $or for search across multiple fields
                { title: { $regex: searchQuery, $options: 'i' } }, //$regex = helps search for specific patterns in text, like finding words.
                { description: { $regex: searchQuery, $options: 'i' } },
                { cuisine_type: { $regex: searchQuery, $options: 'i' } },
                { ingredients: { $regex: searchQuery, $options: 'i' } }
            ]
        }).populate('owner')
        res.render('search-results.ejs', {
            recipes: foundRecipes,
            currentUser: req.session.currentUser,
            searchQuery: searchQuery
        });
    } catch (error) {
        console.error(error)
        res.send('Oops! Something went wrong. Please try again.')
    }
});


//SHOW
router.get('/:id', async (req, res) => {
    try {
        const foundRecipe = await Recipe.findById(req.params.id).populate('owner')
        res.render('show.ejs', {
            recipe: foundRecipe,
            currentUser: req.session.currentUser
        })
    } catch (error) {
        console.error(error)
        res.send('Oops! Something went wrong. Please try again.')
    }
})
 

module.exports = router