const {error, success, warning } = require("./src/statics/chalk.color")
const express = require("express")
const bodyParser = require('body-parser')
require("./src/db/mongoose")

const USER = require("./src/models/user.model")
const QUESTION = require("./src/models/question.model")

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.get('/users', (req,res) => {
    USER.find({}).then((users) => {
        res.status(200).send(users)
    }).catch((error) => {
        res.status(404).send(error)
    })
})

app.get('/users/:check_email', (req,res) => {
    USER.findOne({
        email : req.params.check_email
    }).then((user) => {
        if(!user){
            return res.status(404).json({
                status: 'error',
                error: 'User does not Exist'
              }).send()
        }
        res.send(user)
    }).catch((error) => {
        res.status(404).send(error)
    })
})

app.post('/users', (req,res) => {
    const user = new USER(req.body)
    user.save().then((user) => {
            res.status(201).send(user)
        }).catch((error) => {
            res.status(400).send(error)
        })
})




app.get('/questions',(req,res) => {
    QUESTION.find({}).then((questions) => {
        res.status(200).send(questions)
    }).catch((error) => {
        res.status(404).send(error)
    })
})

app.get('/questions/:id',(req,res) => {
    QUESTION.findById(req.params.id).then((question) => {
        if(!question){
            return res.status(404).json({
                status: 'error',
                error: 'Question not present'
            }).send()
        }
        res.status(200).send(question)
    }).catch((error) => {
        res.status(404).send(error)
    })
})


app.post('/questions', (req,res) => {
    const question = new QUESTION(req.body)
    question.save().then((question) => {
        res.status(201).send(question)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.listen(port, ()=>{
    console.log(warning('Server is running on port ' + port))
})