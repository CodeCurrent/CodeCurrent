const request = require('request')

const url = 'https://www.codechef.com/users/pratul1997'

request({url:url}, (error, response)=>{
    console.log(response)
})