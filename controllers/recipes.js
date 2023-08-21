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
    const foundRecipes = await Recipe.find({}).sort({createdAt: -1}).populate('owner') //.sort({createdAt: -1}) is the newest items will appear first
    //console.log(foundRecipes)
    res.render('index.ejs', {
        recipes: foundRecipes,
        currentUser: req.session.currentUser
    })
})


//NEW
router.get('/new', isAuthenticated, (req, res) => {
    res.render('new.ejs', {currentUser: req.session.currentUser})
})


//DELETE
router.delete('/:id', isAuthenticated, async (req, res) => {
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
// router.post('/', isAuthenticated, async (req, res) => {
//     try {
//     const newRecipe = await Recipe.create(req.body)
//     res.redirect('/recipes')
//     } catch (err) {
//         console.log(err)
//         res.send(err)
//     }
// })
//CREATE
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const newRecipe = await Recipe.create({
            ...req.body,  //create a new object and populate it
            owner: req.session.currentUser._id  //assign the _id of user for the new recipe
        });
        res.redirect('/recipes')
    } catch (err) {
        console.log(err)
        res.send(err)
    }
});


// //EDIT
router.get('/:id/edit', isAuthenticated, async (req, res) => {
    const foundRecipe = await Recipe.findById(req.params.id)
    res.render('edit.ejs', {
        recipe: foundRecipe,
        currentUser: req.session.currentUser
    })
})


//SHOW
router.get('/:id', async (req, res) => {
    const foundRecipe = await Recipe.findById(req.params.id).populate('owner')
    res.render('show.ejs', {
        recipe: foundRecipe,
        currentUser: req.session.currentUser
    })
})


module.exports = router