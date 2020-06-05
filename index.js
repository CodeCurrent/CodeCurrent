const {error, success, warning } = require("./src/statics/chalk.color")
const express = require("express")
require("./src/db/mongoose")

const USER = require("./src/models/user.model")
const QUESTION = require("./src/models/question.model")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req,res) => {
    const user = new USER(req.body)
    user.save().then((user) =>{
            res.status(201).send(user)
        }).catch((error) => {
            res.status(400).send(error)
        })
})

app.post('/questions', (req,res) => {
    const question = new QUESTION(req.body)
    question.save().then((question) =>{
        res.status(201).send(question)
    }).catch((error) =>{
        res.status(400).send(error)
    })
})

app.listen(port, ()=>{
    console.log(warning('Server is running on port ' + port))
})