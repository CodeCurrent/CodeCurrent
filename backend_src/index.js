const {error, success, warning } = require("./statics/chalk.color")
const express = require("express")
const bodyParser = require('body-parser')
require("./db/mongoose")

const USER = require("./models/user.model")
const QUESTION = require("./models/question.model")

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())


app.get('/users', async (req, res) => {
    try {
        users = await USER.find({})
        res.status(200).send(users)
    } catch(error) {
        res.status(500).send(error) 
    }
})

app.get('/users/:check_email', async (req, res) => {
    try {
        const user = await USER.findOne({ email : req.params.check_email })
        if(!user){
            return res.status(404).json({
                status: 'error',
                error: 'User does not Exist'
              }).send()
        }
        res.send(user)
    } catch(error) {
        res.status(500).send(error)
    }
})

app.post('/users', async (req, res) => {
    const user = new USER(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    } catch(error) {
        res.status(400).send(error)
    }
})




app.get('/questions',async (req, res) => {
    try{
        const questions = await QUESTION.find({})
        res.status(200).send(questions)
    } catch(error) {
        res.status(500).send(error)
    }
})

app.get('/questions/:id', async(req, res) => {
    try{
        const question = await QUESTION.findById(req.params.id)
        if(!question){
            return res.status(404).json({
                status: 'error',
                error: 'Question not present'
            }).send()
        }
        res.status(200).send(question)
    } catch(error) {
        res.status(500).send(error)
    }
})


app.post('/questions', async (req,res) => {
    const question = new QUESTION(req.body)
    try {
        await question.save()
        res.status(201).send(question)
    } catch(error) {
        res.status(400).send(error)
    }
})

app.listen(port, () => {
    console.log(warning('Server is running on port ' + port))
})