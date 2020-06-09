const chalk = require('chalk')

const error = (text) => {
  return chalk.bold.red(text)
}

const success = (text) => {
  return chalk.bold.greenBright(text)
}
const warning = (text) => {
  return chalk.bold.yellow(text)
}

module.exports = {
  error,
  success,
  warning
}
