const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    cuisine_type: { type: String, required: true },
    description: { type: String, required: true },
    prep_time: { type: Number, required: true },
    cook_time: { type: Number, required: true },
    total_time: {type: Number, required: true },
    servings_amount: { type: Number, required: true },
    servings_type: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    img: { type: String, required: true }

}, {timestamps: true})

const Recipe = mongoose.model('Recipe', recipeSchema)



module.exports = Recipe