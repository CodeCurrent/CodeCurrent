const express = require('express')
const bodyParser = require('body-parser')
const USER = require('../models/user.model')
const auth = require('../middlewares/auth')

const router = new express.Router()

router.use(bodyParser.json())

router.get('/users/me', auth, async (req, res) => {
  res.status(200).send(req.user)
})

router.get('/users/:check_email', auth, async (req, res) => {
  try {
    const user = await USER.findOne({ email: req.params.check_email })
    if (!user) {
      return res.status(404).json({
        status: 'error',
        error: 'User does not Exist'
      }).send()
    }
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/users/signup', async (req, res) => {
  const user = new USER(req.body)
  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await USER.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({
      user,
      token
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch('/users/:update_email', auth, async (req, res) => {
  const updatesHappeningReq = Object.keys(req.body)
  const allowedUpdates = ['name', 'password', 'education', 'date_of_birth', 'phone']
  const isValidOperation = updatesHappeningReq.every((updateHappeningReq) => {
    return allowedUpdates.includes(updateHappeningReq)
  })

  if (!isValidOperation) {
    return res.status(400).json({
      status: 'error',
      error: 'This item cannot be updated'
    }).send()
  }
  try {
    const user = await USER.findOne({ email: req.params.update_email })
    updatesHappeningReq.forEach((updateHappeningReq) => {
      return (user[updateHappeningReq] = req.body[updateHappeningReq])
    })

    await user.save()

    if (!user) {
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

router.delete('/users/:delete_email', auth, async (req, res) => {
  try {
    const user = await USER.findOneAndDelete({ email: req.params.delete_email })
    if (!user) {
      return res.status(404).json({
        status: 'error',
        error: 'USER does not Exist'
      }).send()
    }
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
