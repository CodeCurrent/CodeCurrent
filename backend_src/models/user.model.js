const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        name: {
            type : String ,
            required : true,
            trim : true
        },
        email: {
            type : String ,
            required : true,
            trim : true,
            lowercase : true,
            unique : true,
            validate(email){
                if(!validator.isEmail(email)){
                    throw new Error('Email is Invalid')
                }
            }
        },
        password: {
            type : String ,
            required : true,
            minlength: 8,
            maxlength: 20,
            trim : true
        },
        codechef: {
            type : String ,
            required : true,
            trim : true,
            validate(codechef_user_url){
                if(!validator.isURL(codechef_user_url)){
                    throw new Error('Not a valid URL')
                }
            }
        },
        education: {
            type : String,
            trim: true
        },
        date_of_birth: {
            type : Date
        },
        phone: {
            type : String,
        },
        first_login: {
            type: Date,
            default: Date.now 
        }
    }
)

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({user: user.email},'Pratul1997')
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await USER.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()

})

const USER = mongoose.model('Users', userSchema)

module.exports = USER