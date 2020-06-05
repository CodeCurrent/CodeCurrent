const mongoose = require('mongoose')
const validator = require('validator')

const QUESTIONS = mongoose.model('questions',{
    question_url : {
        type : String ,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
    },
    question_name : {
        type : String,
        required : true,
        trim: true
    },
    question_platform : {
        type : String,
        required : true,
        trim: true
    },
    question_stars : {
        type : Number,
        default: 0 
    }
})

module.exports = QUESTIONS