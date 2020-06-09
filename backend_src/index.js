const { warning } = require('./statics/chalk.color')
const express = require('express')
require('./db/mongoose')

const userRoute = require('./routers/user.router')
const questionRoute = require('./routers/question.route')

const app = express()
const port = process.env.PORT || 3000

app.use(userRoute)
app.use(questionRoute)

app.listen(port, () => {
  console.log(warning('Server is running on port ' + port))
})
