const jwt = require('jsonwebtoken')
const USER = require('../models/user.model')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'Pratul1997')
    const user = await USER.findOne({ email: decoded.email, 'tokens.token': token })
    if (!user) {
      throw new Error()
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ error: 'Please Authenticate' })
  }
}

module.exports = auth
