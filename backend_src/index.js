const {error, success, warning } = require("./statics/chalk.color")
const express = require("express")
const bodyParser = require('body-parser')
require("./db/mongoose")

const QUESTION = require("./models/question.model")
const userRoute = require("./routers/user.router")

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(userRoute)


app.get('/questions', async (req, res) => {
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

app.patch('/questions/:id', async (req, res) => {

    const updates_happening_req = Object.keys(req.body)
    const allowedUpdates = ['question_name', 'question_platform']
    const isValidOperation = updates_happening_req.every((update_happening_req) => {
        return allowedUpdates.includes(update_happening_req)
    })

    if(!isValidOperation) {
        return res.status(400).json({
            "status" : "error",
            "error" : 'This item cannot be updated'
        }).send()
    }

    try {
    const question = await QUESTION.findOneAndUpdate(
        { _id : req.params.id },
        req.body,
        { new : true, runValidators : true }
    )
    
    if(!question){
            return res.status(404).json({
                status: 'error',
                error: 'Question does not Exist'
              }).send()
        }
        res.status(200).send(question)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.delete('/questions/:id', async (req, res) => {
    try{
        question = await QUESTION.findOneAndDelete({_id : req.params.id})
        if(!question){
            return res.status(404).json({
                status: 'error',
                error: 'QUESTION does not Exist'
              }).send()
        }
        res.status(200).send(question)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(port, () => {
    console.log(warning('Server is running on port ' + port))
})