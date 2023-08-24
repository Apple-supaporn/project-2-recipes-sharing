const mongoose = require('mongoose')

//define the structure of user
const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true}
})

//create the User model based on the schema
const User = mongoose.model('User', userSchema)

module.exports = User