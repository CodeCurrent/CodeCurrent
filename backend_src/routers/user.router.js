const express = require("express")
const bodyParser = require('body-parser')
const USER = require("../models/user.model")

const router = new express.Router()

router.use(bodyParser.json())

router.get('/users', async (req, res) => {
    try {
        users = await USER.find({})
        res.status(200).send(users)
    } catch(error) {
        res.status(500).send(error) 
    }
})

router.get('/users/:check_email', async (req, res) => {
    try {
        const user = await USER.findOne({ email : req.params.check_email })
        if(!user){
            return res.status(404).json({
                status: 'error',
                error: 'User does not Exist'
              }).send()
        }
        res.status(200).send(user)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.post('/users', async (req, res) => {
    const user = new USER(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    } catch(error) {
        res.status(400).send(error)
    }
})

router.patch('/users/:update_email', async(req, res) => {

    const updates_happening_req = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'education', 'date_of_birth', 'phone']
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
        const user = await USER.findOneAndUpdate(
            {email : req.params.update_email},
            req.body,
            {new : true, runValidators : true}
        )
        if(!user){
            return res.status(404).json({
                status: 'error',
                error: 'User does not Exist'
              }).send()
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/:delete_email', async (req, res) => {
    try{
        user = await USER.findOneAndDelete({email : req.params.delete_email})
        if(!user){
            return res.status(404).json({
                "status" : "error",
                "error" : "USER does not Exist"
              }).send()
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router