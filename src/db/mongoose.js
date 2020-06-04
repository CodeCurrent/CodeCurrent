const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/codecurrent-db',{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true
})

const USERS = mongoose.model('Users',{
    name: {
        type : String ,
        required : true,
        trim : true
    },
    email: {
        type : String ,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error('Email is Invalid')
            }
        }
    },
    password: {
        type : String ,
        required : true,
        minlength: 8,
        maxlength: 20,
        trim : true
    },
    codechef: {
        type : String ,
        required : true,
        trim : true,
        validate(codechef_user_url){
            if(!validator.isURL(codechef_user_url)){
                throw new Error('Not a valid URL')
            }
        }
    },
    education: {
        type : String,
        trim: true
    },
    date_of_birth: {
        type : Date
    },
    phone: {
        type : String,
    },
    first_login: {
        type: Date,
        default: Date.now 
    }
})



const me = new USERS({
    name : 'pratul kumar   ',
    email : '  pratulkumar199@gmail.com',
    password : 'pratulkumar',
    codechef : "https://www.codechef.com/users/pratul1997",
    education : "The LNM Institute of Information Technology",
    date_of_birth : '1999-06-02'
}).save().then((me) =>{
    console.log(me)
}).catch((error) => {
    console.log('Error', error)
})


const QUESTIONS = mongoose.model('questions',{
    question_url : {
        type : String
    },
    question_name : {
        type : String,
        trim: true
    },
    question_platform : {
        type : String,
        trim: true
    },
    question_stars : {
        type : Number,
        default: 0 
    }
})

const q1 = new QUESTIONS({
    question_url : "https://leetcode.com/problems/solve-the-equation/",
    question_name : "Solve the equation",
    question_platform : "Leetcode",
    question_stars: 0
}).save().then((q1)=>{
    console.log(q1)
}).catch((error) =>{
    console.log("Error",error)
})