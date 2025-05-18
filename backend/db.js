const mongoose = require('mongoose')
require('dotenv').config({path:'./.env'})

mongoose.connect(process.env.MONGO_URI)

const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    firstName : String,
    lastName : String
})

const todoSchema = new mongoose.Schema({
    title : String,
    description : String,
    done : {
        type: Boolean,
        default :false
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

const User = mongoose.model('User',userSchema)
const Todo = mongoose.model('Todo',todoSchema)

module.exports = {
    User,
    Todo,
}