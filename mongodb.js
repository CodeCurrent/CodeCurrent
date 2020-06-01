const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'codecurrent'

MongoClient.connect(connectionURL, {useNewUrlParser : true, useUnifiedTopology: true}, (error, client) =>{
    if(error){
        return console.log('Unable to connect to Database')
    }

    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: "Pratul Kumar",
        email: "pratulkumar1997@gmail.com",
        password: "pratulkumar",
        education: "The LNM Institute of Information Technology",
        codechef: "https://www.codechef.com/users/pratul1997",
        age: 27
    }, (error, result) => {
        if(error){
            return console.log('Unable to insert user')
        }
        console.log(result.ops)
    })

    db.collection('questions').insertOne({
        url:"https://leetcode.com/problems/solve-the-equation/",
        platform: "Leetcode",
        stars:0
    }, (error, result)=>{
        if(error){
            return console.log('Unable to add question') 
        }
        console.log(result.ops)
    })

    db.collection('users').findOne({
        email:'pratulkumar1997@gmail.com'
    },(error, user)=>{
        if(error){
            return console.log('Unable to fetch user')
        }
        console.log(user)
    })

    db.collection('users').updateOne({
        email : "pratulkumar1997@gmail.com"
    }, {
        $set:{
            age: 22
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('users').deleteMany({
        email:"pratulkumar1997@gmail.com"
    }).then((result)=>{
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})