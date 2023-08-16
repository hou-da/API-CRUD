const mongoose = require('mongoose');
const {Schema, model, plugin} = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const muv = require('mongoose-unique-validator');

plugin(muv)

//user Schema
const UserSchema = new Schema({
   UserName:{
        type: String,
        required: [true, 'UserName field us is required']
        
    },
    email:{
        type: String,
        unique:true,
        lowercase:true,
        required: [true, 'email field us is required']
        
        
    },
    Password:{
        type: String,
        required: [true, 'Password field us is required']
        
        
    }


})

UserSchema.methods.generatrAuthToken = function () {
    return jwt.signup(
        {
            _id: this._id,
            email: this.email,
            UserName: this.UserName
        },
        config.get("jwtPrivateKey")
    )
    
}

const User = mongoose.model('User', UserSchema)
module.exports = User


   