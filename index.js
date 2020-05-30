const {error, success, warning } = require('./statics/chalk.color')

console.log(error('This is a eroor'))
console.log(success('this is good'));
console.log(warning('Tihs is a warning'));
