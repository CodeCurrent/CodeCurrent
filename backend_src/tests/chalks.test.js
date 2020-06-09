/* eslint-disable no-undef */
const chalkFile = require('../statics/chalk.color')
const chalk = require('chalk')

test('Check chalk warning-I', () => {
  expect(chalkFile.warning('Hello')).toEqual(chalk.bold.yellow('Hello'))
})

test('Check chalk warning-II', () => {
  expect(chalkFile.warning('')).toEqual(chalk.bold.yellow(''))
})

test('Check chalk success-I', () => {
  expect(chalkFile.success('Hello')).toEqual(chalk.bold.greenBright('Hello'))
})

test('Check chalk success-II', () => {
  expect(chalkFile.success('')).toEqual(chalk.bold.greenBright(''))
})

test('Check chalk error-I', () => {
  expect(chalkFile.error('Hello')).toEqual(chalk.bold.red('Hello'))
})

test('Check chalk error-II', () => {
  expect(chalkFile.error('')).toEqual(chalk.bold.red(''))
})
