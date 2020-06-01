const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/codecurrent-db',{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true
})

const USERS = mongoose.model('Users',{
    name:{
        type : String 
    },
    email:{
        type : String
    },
    password:{
        type : String
    },
    codechef:{
        type : String
    },
    education:{
        type : String
    },
    age:{
        type : Number
    }
})

const me = new USERS({
    name : 'Pratul Kumar',
    email : 'pratulkumar1997@gmail.com',
    password : 'pratulkumar',
    codechef : "codechef",
    education : "The LNM Institute of Information Technology",
    age : 22
}).save().then((me) =>{
    console.log(me)
}).catch((error) => {
    console.log('Error', error)
})


const QUESTIONS = mongoose.model('questions',{
    url : {
        type : String
    },
    name : {
        type : String
    },
    platform : {
        type : String
    },
    stars : {
        type : Number
    }
})

const q1 = new QUESTIONS({
    url : "https://leetcode.com/problems/solve-the-equation/",
    name : "Solve the equation",
    platform : "Leetcode",
    stars: 0
}).save().then((q1)=>{
    console.log(q1)
}).catch((error) =>{
    console.log("Error",error)
})