const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    cuisine_type: { type: String, required: true },
    description: { type: String, required: true },
    prep_time: { type: String, required: true },
    cook_time: { type: String, required: true },
    total_time: {type: String, required: true },
    servings_amount: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    img: { type: String, required: true }, 
    
    //store the owner user ID
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',    //reference to the 'User' model in users.js
        required: true
    }

}, {timestamps: true})

const Recipe = mongoose.model('Recipe', recipeSchema)



module.exports = Recipe