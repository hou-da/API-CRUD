const mongoose = require('mongoose')
const Schema = mongoose.Schema


//job Schema
const JobSchema = new Schema({
    Title:{
        type: String,  
        
    },

    Description:{
        type: String, 
        
    },

    location:{
        type: String,
        
    },

    Salary:{
        type: String, 
        
    },

    CompanyName:{
        type: String,
        

    }
})
    

const Job = mongoose.model('jobs', JobSchema)

module.exports = Job